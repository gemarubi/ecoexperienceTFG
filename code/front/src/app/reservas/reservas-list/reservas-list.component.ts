import { Component } from '@angular/core';
import { ReservasServiceService } from '../reservas-service.service';
import { ReservasList } from '../interface/interface';

@Component({
  selector: 'app-reservas-list',
  standalone: false,
  templateUrl: './reservas-list.component.html',
  styleUrl: './reservas-list.component.scss'
})
export class ReservasListComponent {
displayedColumns: string[] = ['fecha', 'hora', 'cliente','asistentes', 'rutas', 'tukTuks', 'observaciones', 'accion'];
reservas: ReservasList[]=[]

constructor(private reservasService: ReservasServiceService) {}

ngOnInit(): void {
  this.reservasService.getReservas().subscribe({
    next: (res) => this.reservas = res,
    error: (err) => console.error('Error al cargar reservas', err)
  });
}

asignarGuia(reserva: any): void {

  console.log('Asignar guía a reserva:', reserva);
}
}
