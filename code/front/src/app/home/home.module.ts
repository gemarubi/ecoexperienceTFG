import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaCardComponent } from './ruta-card/ruta-card.component';
import { HomePageComponent } from './home-page/home-page.component';



@NgModule({
  declarations: [
    RutaCardComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
