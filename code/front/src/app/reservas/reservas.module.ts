import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioReservasComponent } from './calendario-reservas/calendario-reservas.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CrearReservaDialogComponent } from './crear-reserva-dialog/crear-reserva-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    CalendarioReservasComponent,
    CrearReservaDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports:[
  CalendarioReservasComponent
  ]
})
export class ReservasModule { }
