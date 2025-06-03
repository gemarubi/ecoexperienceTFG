import { Component, ElementRef, ViewChild } from '@angular/core';
import { HomeService } from '../home.service';
import { Filtro, Ruta } from '../interfaces/ruta';
import { RutasService } from '../../rutas/rutas.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

    rutas: Ruta[] = [];

  constructor(private rutasService: RutasService, private router:Router) {}
@ViewChild('introVideo') introVideo!: ElementRef<HTMLVideoElement>;
  ngOnInit(): void {
    this.rutasService.getAllRutas().subscribe({
      next: (data) => this.rutas = data,
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
