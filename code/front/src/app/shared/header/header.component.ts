import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router:Router
  ){}
  getUserRole(): string[] {
    const token = sessionStorage.getItem('token');
    if (!token) return [];

    try {
      const decoded: any = jwtDecode(token);
      return decoded.role.map((r: any) => r.descripcion || r);
    } catch {
      return [];
    }
  }
  getUserFullName(): string {
    const token = sessionStorage.getItem('token');
    if (!token) return '';

    try {
      const decoded: any = jwtDecode(token);
      return `${decoded.user.nombre} ${decoded.user.apellidos}`;
    } catch {
      return '';
    }
  }
  isAdmin(): boolean {
    return this.getUserRole().includes('Admin');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
