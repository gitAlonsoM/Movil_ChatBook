import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recover-key',
  templateUrl: './recover-key.page.html',
  styleUrls: ['./recover-key.page.scss'],
})


export class RecoverKeyPage {
  email: string = '';

  constructor(private router: Router, private alertController: AlertController) {}



  sendRecoveryEmail() {
    if (!this.isValidEmail(this.email)) {
      this.showAlert('Error', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    // Aquí iría la lógica para enviar el enlace de recuperación al correo electrónico

    this.showAlert('Éxito', 'La contraseña de recuperación se ha enviado a su correo electrónico, por favor revise su bandeja de entrada.');
  }

  // Validar formato de correo electrónico con expresiones regulares
  isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  showAlert(header: string, message: string) {
    this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  //Funcion para redireccionar al login
  goToLogin() {
    this.router.navigate(['/login']);
  }

}
