import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  correo = '';
  pass = '';
errorMessage: string = ''
  constructor(private authService: AuthService,private router: Router) {}

  onSubmit() {
    this.authService.login({ correo: this.correo, pass: this.pass })
    .subscribe({
      next: (response) => {
        if (response.token) {
            sessionStorage.setItem('token', response.token);
          this.router.navigate(['/users/users-list']);
        }
      },
      error: (err) => {
        console.log(err)
        if (err.status === 401) {
          this.errorMessage = 'Error al iniciar sesión. Inténtalo de nuevo.'
        } else {
          this.errorMessage = 'Error al iniciar sesión. Inténtalo de nuevo.';
        }
      }
    });
  }
}
