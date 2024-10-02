/* myApp\src\app\register\register.page.ts */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.isValidEmail(this.email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!this.isValidPassword(this.password)) {
      alert('La contraseña debe tener al menos 7 caracteres, incluir al menos una mayúscula y una minúscula.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const token = 'user-auth-token'; // Esto debería venir de tu backend
    this.authService.login(token); // Guardar token
    
    alert('Registro realizado exitosamente.'); // Mensaje de éxito
    this.router.navigate(['/login']); // Redirigir al login
  }

  isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  isValidPassword(password: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
    return re.test(password);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}