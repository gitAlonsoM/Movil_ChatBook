/* myApp\src\app\login\login.page.ts */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('pulseAnimation', [
      state('inactive', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('active', style({
        transform: 'scale(1.9)',
        opacity: 0.5
      })),
      transition('inactive <=> active', [
        animate('0.3s')
      ]),
    ])
  ]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  animationState = 'inactive'; // Estado inicial de la animación

  constructor(private authService: AuthService, private router: Router) {}

  // Método para iniciar sesión
  login() {
    // Aquí puedes implementar la lógica para autenticar al usuario con email y contraseña
    const token = 'miTokenSimulado'; // Simulando la autenticación
    this.authService.login(token); // Guarda el token en el AuthService
    this.router.navigate(['/chat']); // Redirige al chat después de iniciar sesión
  }

  // Método para iniciar sesión como invitado
  guestLogin() {
    this.animationState = 'active'; // Cambia el estado de la animación a activa
    setTimeout(() => {
      this.authService.setGuest(true); // Marcar al usuario como invitado
      this.router.navigate(['/chat']); // Redirigir al chat
      this.animationState = 'inactive'; // Vuelve al estado de animación inactiva
    }, 200); // Duración de la animación en milisegundos
  }

  forgottenPassword() {
    this.router.navigate(['/recover-key']);
  }

  createAcc() {
    this.router.navigate(['/register']);
  }

  // Función para ir a la página de recuperación de contraseña
  goToRecoverKey() {
    this.router.navigate(['/recover-key']);
  }
}