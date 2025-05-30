import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../users/interfaces/user';
import { ReservasServiceService } from '../reservas-service.service';

@Component({
  selector: 'app-asignar-guia-dialog',
  standalone: false,
  templateUrl: './asignar-guia-dialog.component.html',
  styleUrl: './asignar-guia-dialog.component.scss'
})
export class AsignarGuiaDialogComponent {
 guiaSeleccionadoId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AsignarGuiaDialogComponent>,public reservaService:ReservasServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { guias: User[], idReserva:number }
  ) {}

  asignar(idReserva:number) {
    if (this.guiaSeleccionadoId) {
     
      this.dialogRef.close(this.guiaSeleccionadoId);
    }
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
