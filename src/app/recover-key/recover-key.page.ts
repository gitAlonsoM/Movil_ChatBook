import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recover-key',
  templateUrl: './recover-key.page.html',
  styleUrls: ['./recover-key.page.scss'],
})
export class RecoverKeyPage {
  email: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  sendRecoveryEmail() {
    // Verifica si el formato del correo es válido
    if (!this.isValidEmail(this.email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    // Llama al método del servicio para enviar el correo de recuperación
    const success = this.authService.sendRecoveryEmail(this.email);
    
    if (success) {
      alert('La contraseña de recuperación se ha enviado a su correo electrónico. Por favor, revise su bandeja de entrada.');
      this.goToLogin(); // Redirige al login después de enviar el correo
    } else {
      alert('Hubo un problema al enviar el correo. Inténtalo de nuevo más tarde.');
    }
  }

  // Método para validar el formato del correo electrónico
  isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  // Método para redireccionar al login
  goToLogin() {
    this.router.navigate(['/login']); // Redirige a la ruta de login
  }
}