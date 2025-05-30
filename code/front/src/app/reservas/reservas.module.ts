import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioReservasComponent } from './calendario-reservas/calendario-reservas.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CrearReservaDialogComponent } from './crear-reserva-dialog/crear-reserva-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReservasListComponent } from './reservas-list/reservas-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsignarGuiaDialogComponent } from './asignar-guia-dialog/asignar-guia-dialog.component';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    CalendarioReservasComponent,
    CrearReservaDialogComponent,
    ReservasListComponent,
    AsignarGuiaDialogComponent
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
    MatDialogModule,
     MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    FormsModule
  ],
  exports:[
  CalendarioReservasComponent,
  ReservasListComponent
  ]
})
export class ReservasModule { }
