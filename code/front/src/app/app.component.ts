import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
    esHome: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.esHome = this.router.url === '/';
    });
  }
}
