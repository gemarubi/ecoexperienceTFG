import { Component } from '@angular/core';
import { HomeService } from '../home.service';
import { Ruta } from '../interfaces/ruta';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

    rutas: Ruta[] = [];

  constructor(private rutasService: HomeService) {}

  ngOnInit(): void {
    this.rutasService.getAllRutas().subscribe({
      next: (data) => this.rutas = data,
      error: (err) => console.error('Error al cargar rutas:', err)
      
    });

  }
}
