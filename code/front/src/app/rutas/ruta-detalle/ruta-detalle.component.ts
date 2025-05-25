import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../home/interfaces/ruta';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { RutasService } from '../rutas.service';

@Component({
  selector: 'app-ruta-detalle',
  standalone: false,
  templateUrl: './ruta-detalle.component.html',
  styleUrl: './ruta-detalle.component.scss'
})
export class RutaDetalleComponent implements OnInit {
  ruta!: Ruta;
  fechasNoDisponibles = ['2025-05-28', '2025-05-30']; 

  constructor(
    private route: ActivatedRoute,
    private rutasService: RutasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.rutasService.getRutaById(+id).subscribe({
      next: (data:Ruta[]) => {
        this.ruta = data[0];
        console.log(this.ruta);
      },
      error: (err) => console.error('Error al cargar la ruta:', err)
    });
  }
}
}
