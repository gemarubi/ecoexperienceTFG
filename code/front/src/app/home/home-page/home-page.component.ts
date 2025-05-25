import { Component } from '@angular/core';
import { HomeService } from '../home.service';
import { Filtro, Ruta } from '../interfaces/ruta';
import { RutasService } from '../../rutas/rutas.service';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

    rutas: Ruta[] = [];

  constructor(private rutasService: RutasService) {}

  ngOnInit(): void {
    this.rutasService.getAllRutas().subscribe({
      next: (data) => this.rutas = data.slice(0, 6),
      error: (err) => console.error('Error al cargar rutas:', err)

    });

  }

  onFiltersApplied(filtros: Filtro): void {
    console.log('Recibido filtros en Home:', filtros);

    this.rutasService.getFiltered( filtros)
      .subscribe(response => {

        this.rutas = response;
      });
  }
}
