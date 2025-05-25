import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RutaCardComponent } from './ruta-card/ruta-card.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FilterComponent } from './filter/filter.component';
import { GoogleReviewCardComponent } from './google-review-card/google-review-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RutaCardComponent,
    HomePageComponent,
    FilterComponent,
    GoogleReviewCardComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
  ]
})
export class HomeModule { }
