import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaDetalleComponent } from './ruta-detalle/ruta-detalle.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'rutas/detalle/:id', component: RutaDetalleComponent },

];
@NgModule({
  declarations: [],
   imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutasRoutingModule { }
