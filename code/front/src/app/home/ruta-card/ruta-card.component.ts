import { Component, Input } from '@angular/core';
import { Ruta } from '../interfaces/ruta';


@Component({
  selector: 'app-ruta-card',
  templateUrl: './ruta-card.component.html',
  styleUrls: ['./ruta-card.component.scss'],
  standalone:false
})
export class RutaCardComponent {
  @Input() ruta!: Ruta;
}
