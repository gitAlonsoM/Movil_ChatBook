import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('pulseAnimation', [
      state('inactive', style({ transform: 'scale(1)', opacity: 1 })),
      state('active', style({ transform: 'scale(1.9)', opacity: 0.5 })),
      transition('inactive <=> active', [animate('0.3s')]),
    ]),
  ],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  animationState: string = 'inactive';

  constructor(private router: Router, private authService: AuthService, private toastController: ToastController) {}

  async login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    
    if (!this.email.trim() || !this.password.trim()) {
      this.presentToast('Error: Debes estar autenticado por favor crea una cuenta registrate.');
      return;
    }

    this.loading = true; // Inicia el loading
    try {
      const user = await this.authService.login(this.email, this.password);
      if (user) {
        this.presentToast('¡Bienvenido! Has iniciado sesión de forma correcta.');
        // Espera un momento para que el usuario vea el mensaje antes de redirigir
        setTimeout(() => {
          this.router.navigate(['/chat']);
        }, 2000); // Espera 2 segundos
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading = false; // Asegúrate de desactivar el loading
    }
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'dark',
    });
    await toast.present();
  }

  private handleError(error: any) {
    const errorCode = (error as any).code;
    let errorMessage = '';

    switch (errorCode) {
      case 'auth/user-not-found':
        errorMessage = 'Error: Este usuario no está registrado. Por favor, crea una cuenta.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Error: La contraseña es incorrecta. Por favor, intenta de nuevo.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Error: El correo electrónico ingresado no es válido.';
        break;
      default:
        errorMessage = 'Error: No se pudo iniciar sesión. Asegúrate de que el correo y la contraseña sean correctos.';
    }

    console.error('Error en el inicio de sesión:', error);
    this.presentToast(errorMessage);
  }

  guestLogin() {
    this.router.navigate(['/chat']);
  }

  createAcc() {
    this.router.navigate(['/register']);
  }

  forgottenPassword() {
    this.router.navigate(['/recover-key']); // Redirige a la página de recuperación de contraseña

  }

}