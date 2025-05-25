import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservasServiceService } from '../reservas-service.service';

@Component({
  selector: 'app-crear-reserva-dialog',
  standalone: false,
  templateUrl: './crear-reserva-dialog.component.html',
  styleUrl: './crear-reserva-dialog.component.scss'
})
export class CrearReservaDialogComponent {
 reservaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservasService:ReservasServiceService,
    private dialogRef: MatDialogRef<CrearReservaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fecha: Date, rutaId: number }
  ) {
    this.reservaForm = this.fb.group({
      fecha: [data.fecha.toISOString().split('T')[0], Validators.required],
      hora: ['08:00', Validators.required],
      asistentes: [1, [Validators.required, Validators.min(1)]],
      observaciones: [''],
      clienteId: [1, Validators.required],
      guiaId: [null],
      rutasIds: [[data.rutaId], Validators.required]
    });
  }

  enviarReserva(): void {
   if (this.reservaForm.invalid) return;

  this.reservasService.createReserva(this.reservaForm.value).subscribe({
    next: (res) => {
      this.dialogRef.close({
        reserva: res,
        message: "Reserva creada correctamente"
      });
    },
    error: (err) => {
      console.error('Error al crear reserva:', err);

    }
  });
}
}
