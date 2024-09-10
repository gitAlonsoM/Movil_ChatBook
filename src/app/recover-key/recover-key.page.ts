import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({/*Decorador @Component: Define la clase declarada en el código, como un componente Angular, configurando su comportamiento y apariencia. */
  selector: 'app-recover-key',
  templateUrl: './recover-key.page.html',
  styleUrls: ['./recover-key.page.scss'],
})



export class RecoverKeyPage {

  //propiedades de la clase 

  email: string = '';

  constructor(private router: Router) {}

  sendRecoveryEmail() {
    if (!this.isValidEmail(this.email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    
    // Aquí iría la lógica para enviar el enlace de recuperacion al email
    alert('La contraseña de recuperación se ha enviado a su correo electrónico, por favor revise su bandeja de entrada.');
  }

  // Validar formato de correo electrónico con expresion regular
  isValidEmail(email: string): boolean { //toma un parámetro email de tipo string y devuelve un valor de tipo boolean. 
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase()); //Metodo .test devolvera True al cumplir o viceversa
  }

 
  //Funcion para redireccionar al login
  goToLogin() {
    this.router.navigate(['/login']);
  }

}
