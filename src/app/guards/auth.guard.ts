import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(
      map(user => {
        if (user) {
          return true; // Usuario autenticado, permite el acceso
        } else {
          this.router.navigate(['/login']); // Redirige al login si no está autenticado
          return false; // No permite el acceso
        }
      })
    );
  }
}