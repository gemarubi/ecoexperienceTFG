import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReservasServiceService } from '../reservas-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearReservaDialogComponent } from '../crear-reserva-dialog/crear-reserva-dialog.component';

@Component({
  selector: 'app-calendario-reservas',
  standalone: false,
  templateUrl: './calendario-reservas.component.html',
  styleUrl: './calendario-reservas.component.scss'
})
export class CalendarioReservasComponent implements OnInit{
 fechaSeleccionada: Date | null = null;
fechasNoDisponibles: string[] = [];

@Input() tipoRuta: string = '';
@Input() rutaId: number | null = null;

constructor(private reservasService: ReservasServiceService, private dialog: MatDialog) {}

ngOnInit(): void {
  this.cargarFechasNoDisponibles();
}

cargarFechasNoDisponibles(): void {
  this.reservasService.getDiasOcupados(this.tipoRuta).subscribe({
    next: (fechas) => {
      this.fechasNoDisponibles = fechas;
      console.log(this.fechasNoDisponibles)
    },
    error: (err) => {
      console.error('Error al cargar fechas no disponibles', err);
    }
  });
}

resaltarFechasNoDisponibles = (d: Date): string => {
  const fechaStr = d.toLocaleDateString('en-CA');
  return this.fechasNoDisponibles.includes(fechaStr) ? 'dia-no-disponible' : '';
};

esFechaSeleccionadaNoDisponible(): boolean {
  if (!this.fechaSeleccionada) return false;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const fechaSeleccionada = new Date(this.fechaSeleccionada);
  fechaSeleccionada.setHours(0, 0, 0, 0);

  const esPasada = fechaSeleccionada < hoy;
  const fechaStr = this.fechaSeleccionada.toLocaleDateString('en-CA');

  return esPasada || this.fechasNoDisponibles.includes(fechaStr);

}
abrirDialogoReserva(): void {
  if (!this.fechaSeleccionada || !this.rutaId) return;

  this.dialog.open(CrearReservaDialogComponent, {
    width: '400px',
    data: {
      fecha: this.fechaSeleccionada,
      rutaId: this.rutaId
    }
  });
}
}
