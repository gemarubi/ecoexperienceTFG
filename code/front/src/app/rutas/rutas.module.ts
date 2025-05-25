import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaDetalleComponent } from './ruta-detalle/ruta-detalle.component';
import { RutasRoutingModule } from './rutas-routing.module';
import { ReservasModule } from '../reservas/reservas.module';




@NgModule({
  declarations: [
    RutaDetalleComponent,

  ],
  imports: [
    CommonModule,
    RutasRoutingModule,
    ReservasModule
  ],
  
})
export class RutasModule { }
