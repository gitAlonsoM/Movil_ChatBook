// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de que esta ruta es correcta

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Permitir acceso si el usuario está autenticado o si es un acceso a invitado
    if (this.authService.isAuthenticated() || this.authService.isGuest()) {
      return true;
    }
    
    // Redirigir al login si no está autenticado
    this.router.navigate(['/login']);
    return false;
  }
}