import { Component } from '@angular/core';
import { ReservasServiceService } from '../reservas-service.service';
import { Reserva, ReservasList } from '../interface/interface';
import { AsignarGuiaDialogComponent } from '../asignar-guia-dialog/asignar-guia-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservas-list',
  standalone: false,
  templateUrl: './reservas-list.component.html',
  styleUrl: './reservas-list.component.scss'
})
export class ReservasListComponent {
displayedColumns: string[] = ['fecha', 'hora', 'cliente','asistentes', 'rutas', 'tukTuks', 'guia','observaciones', 'accion'];
reservas: ReservasList[]=[]

constructor(private reservasService: ReservasServiceService,  private dialog: MatDialog, private snackBar:MatSnackBar) {}

ngOnInit(): void {
  this.cargarReservas()
}

asignarGuia(idReserva: number): void {
  this.reservasService.getGuiasLibres(idReserva).subscribe({
    next: (guias) => {
      const dialogRef = this.dialog.open(AsignarGuiaDialogComponent, {
        width: '400px',
        data: { guias, idReserva }
      });

      dialogRef.afterClosed().subscribe((guiaIdSeleccionado: number | null) => {
       console.log(guiaIdSeleccionado)
        if (idReserva) {
          const guia = guias.find(g => g.id === guiaIdSeleccionado);
          const body = { idReserva, idGuia: guiaIdSeleccionado };

          this.reservasService.asignarGuia(body).subscribe({
            next: () => {
              this.snackBar.open(
                `El guía ${guia?.nombre} ${guia?.apellidos} ha sido asignado a una reserva`,
                'Cerrar',
                { duration: 3000 }
              );

              this.cargarReservas();
            },
            error: err => console.error('Error al asignar guía', err)
          });
        }
      });
    },
    error: err => console.error('Error al cargar guías libres', err)
  });
}

cargarReservas(){
 this.reservasService.getReservas().subscribe({
    next: (res) =>{
      this.reservas = res
      console.log(res)
    } ,
    error: (err) => console.error('Error al cargar reservas', err)
  });
}
}
