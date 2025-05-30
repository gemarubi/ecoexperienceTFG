import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReservasServiceService } from '../reservas-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearReservaDialogComponent } from '../crear-reserva-dialog/crear-reserva-dialog.component';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario-reservas',
  standalone: false,
  templateUrl: './calendario-reservas.component.html',
  styleUrl: './calendario-reservas.component.scss'
})
export class CalendarioReservasComponent implements OnInit {
  @Input() tipoRuta: string = '';
  @Input() rutaId: number | null = null;

  fechaSeleccionadaInterna: Date | null = null;
  get fechaSeleccionada(): Date | null {
    return this.fechaSeleccionadaInterna;
  }
  set fechaSeleccionada(value: Date | null) {
    this.fechaSeleccionadaInterna = value;
    this.actualizarFranjasPorFecha();
  }

  intervalosOcupados: { fecha: string; desde: string; hasta: string }[] = [];
  fechasNoDisponibles: string[] = [];
  franjasHorarias: { hora: string; disponible: boolean }[] = [];
  franjaSeleccionada: string | null = null;
  constructor(
    private reservasService: ReservasServiceService,
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('Tipo de ruta recibido en componente:', this.tipoRuta);
    this.cargarIntervalosOcupados();
     this.dateAdapter.setLocale('es');
  }

  cargarIntervalosOcupados(): void {
    this.reservasService.getIntervalosOcupados(this.tipoRuta).subscribe({
      next: (data) => {
        this.intervalosOcupados = data;
        console.log(data)

        const agrupados: Record<string, number> = {};
        data.forEach(i => {
          agrupados[i.fecha] = (agrupados[i.fecha] || 0) + 1;
        });

        const UMBRAL_BLOQUEO = 10;
        this.fechasNoDisponibles = Object.entries(agrupados)
          .filter(([_, count]) => count >= UMBRAL_BLOQUEO)
          .map(([fecha]) => fecha);

        this.actualizarFranjasPorFecha();
      },
      error: (err) => {
        console.error('Error al cargar intervalos ocupados', err);
      }
    });
  }

  actualizarFranjasPorFecha(): void {
     if (!this.fechaSeleccionada || !this.intervalosOcupados) return;



  const fechaStr = this.obtenerFechaLocalISO(this.fechaSeleccionada);
  const ocupadas = this.intervalosOcupados.filter(i => i.fecha === fechaStr);

  console.log('🔍 Intervalos ocupados para', fechaStr, ocupadas);

  const franjas: { hora: string; disponible: boolean }[] = [];
  const inicio = 8;
  const fin = 21;
  const paso = 30;

  for (let h = inicio; h < fin; h++) {
    for (let m of [0, 30]) {
      const hora = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      const inicioF = this.parseHora(fechaStr, hora);
      const finF = new Date(inicioF.getTime() + paso * 60000);

      let disponible = true;

      ocupadas.forEach(b => {
        const desde = this.parseHora(b.fecha, b.desde);
        const hasta = this.parseHora(b.fecha, b.hasta);

        if (inicioF < hasta && finF > desde) {
          console.log(`🔴 BLOQUE OCUPADO: ${hora}`);
          disponible = false;
        }
      });

      franjas.push({ hora, disponible });
    }
  }

  this.franjasHorarias = franjas;
  }

 obtenerFechaLocalISO = (fecha: Date): string => {
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


parseHora = (fecha: string, hora: string): Date => {
    const [h, m] = hora.split(':').map(Number);
    const [year, month, day] = fecha.split('-').map(Number);
    return new Date(year, month - 1, day, h, m);
  };
  resaltarFechasNoDisponibles = (d: Date): string => {
    const fechaStr = d.toLocaleDateString('en-CA');
    return this.fechasNoDisponibles.includes(fechaStr) ? 'dia-no-disponible' : '';
  };

  esFechaSeleccionadaNoDisponible(): boolean {
    if (!this.fechaSeleccionada) return false;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const seleccion = new Date(this.fechaSeleccionada);
    seleccion.setHours(0, 0, 0, 0);

    const fechaStr = seleccion.toISOString().split('T')[0];
    const esPasada = seleccion < hoy;

    return esPasada || this.fechasNoDisponibles.includes(fechaStr);
  }

  abrirDialogoReserva(): void {
     const token = sessionStorage.getItem('token');

  if (!token) {
    this.router.navigate(['/login']);
    return;
  }
    if (!this.fechaSeleccionada || !this.rutaId || !this.franjaSeleccionada) return;

    this.dialog.open(CrearReservaDialogComponent, {
      width: '400px',
      data: {
        fecha: this.fechaSeleccionada,
        hora: this.franjaSeleccionada,
        rutaId: this.rutaId,
        rutaTipo: this.tipoRuta
      }
    });
  }

  seleccionarFranja(franja: { hora: string; disponible: boolean }): void {
  if (!franja.disponible) return;
  this.franjaSeleccionada = franja.hora;
}

sumarMinutos(hora: string, minutos: number): string {
  const [h, m] = hora.split(':').map(Number);
  const date = new Date(0, 0, 0, h, m + minutos);
  return date.toTimeString().slice(0, 5);
}

}
