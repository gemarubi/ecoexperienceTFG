import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-google-review-card',
  standalone: false,
  templateUrl: './google-review-card.component.html',
  styleUrl: './google-review-card.component.scss'
})
export class GoogleReviewCardComponent implements OnInit {
  rating: number | null = null;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getRating().subscribe({
      next: (data) => {
        console.log('Respuesta del servicio:', data); // 👈 AÑADE ESTE LOG
        this.rating = data?.rating ?? null;
      },
      error: (err) => {
        console.error('Error al cargar rating:', err);
        this.rating = null;
      }
    });
  }
}
