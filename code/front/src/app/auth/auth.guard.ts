import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {jwtDecode}  from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      const isAdmin = decoded.role?.some((r: any) => r.descripcion === 'Admin');
      if (!isAdmin) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } catch {
      this.router.navigate(['/']);
      return false;
    }
  }
}
