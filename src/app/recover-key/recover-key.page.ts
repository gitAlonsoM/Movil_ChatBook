import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recover-key',
  templateUrl: './recover-key.page.html',
  styleUrls: ['./recover-key.page.scss'],
})
export class RecoverKeyPage {
  email: string = '';

  constructor(private router: Router, private authService: AuthService, private toastController: ToastController) {}

  async sendRecoveryEmail() {
    if (!this.isValidEmail(this.email)) {
      this.presentToast('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    try {
      await this.authService.resetPassword(this.email); // Llama al método de servicio para enviar el correo
      this.presentToast('El enlace de recuperación ha sido enviado a su correo electrónico. Por favor, revise su bandeja de entrada.');
    } catch (error) {
      this.presentToast('Error al enviar el correo de recuperación. Asegúrese de que el correo sea correcto.');
    }
  }

  isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success', // Cambia a 'danger' si prefieres que sea un error
    });
    toast.present();
  }
}