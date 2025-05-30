import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservasServiceService } from '../reservas-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
     private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { fecha: Date, rutaId: number, hora:string , rutaTipo:string}
  ) {
    this.reservaForm = this.fb.group({
     fecha: [this.formatearFechaEsp(data.fecha), Validators.required],
      hora: [data.hora, Validators.required],
      asistentes: [1, [Validators.required, Validators.min(1), Validators.max(25)]],
      observaciones: [''],
      clienteId: [1, Validators.required],
      guiaId: [null],
      rutasIds: [[data.rutaId], Validators.required]
    });
  }
 ngOnInit(): void {

    this.setMaximoAsistentes();
  }
  formatearFechaEsp(fecha: Date): string {
  const day = fecha.getDate().toString().padStart(2, '0');
  const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const year = fecha.getFullYear();
  return `${day}/${month}/${year}`;
}

 setMaximoAsistentes(): void {
    const tipo = this.data.rutaTipo;

    const maximo = tipo === 'Tuk Tuk' ? 4 : 25;
    this.reservaForm.get('asistentes')?.setValidators([
      Validators.required,
      Validators.max(maximo),
      Validators.min(1)
    ]);

    this.reservaForm.get('asistentes')?.updateValueAndValidity();
  }

   cancelar() {
    this.dialogRef.close(null);
  }
  enviarReserva(): void {
  if (this.reservaForm.invalid) return;


  const fechaConvertida = this.convertirFecha(this.reservaForm.value.fecha);

  const reserva = {
    ...this.reservaForm.value,
    fecha: fechaConvertida,
  };

  this.reservasService.createReserva(reserva).subscribe({
    next: (res) => {
      this.snackBar.open('Reserva creada correctamente', 'Cerrar', { duration: 3000 });
      this.dialogRef.close({
        reserva: res,
        message: "Reserva creada correctamente"
      });
    },
    error: (err) => {
      console.error('Error al crear reserva:', err);
      this.snackBar.open('Hubo un error al crear la reserva', 'Cerrar', { duration: 3000 });
    }
  });
}

convertirFecha(fecha: string): string {
  const partes = fecha.split('/');
  return `${partes[2]}-${partes[1]}-${partes[0]}`;
}
}
