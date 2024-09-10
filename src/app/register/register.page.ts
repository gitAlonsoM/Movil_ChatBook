/* myApp\src\app\register\register.page.ts 
Logica de validacion para registrase en la app*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({ /*Decorador @Component: Define la clase declarada en el código, como un componente Angular, configurando su comportamiento y apariencia. */
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})



export class RegisterPage { /* logica de la clase/componente RegisterPage*/

  /* Propiedades de la clase*/
  email: string = '';    
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  //Metodos de la clase RegisterPage:


    //Validación de formulario de registro
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
        alert('Las contraseñas no coinciden.');
        return;
      }

      alert('Cuenta exitosamente creada.');
    

      // Logica futura para redireccionar ...
      this.router.navigate(['/login']);
    }

    // Validar formato de correo electrónico con Expresiones regulares o regex 
    //verificando que contenga un nombre de usuario seguido de una arroba (@), un dominio y una extensión de dominio de al menos dos caracteres.
    isValidEmail(email: string): boolean { //toma un parámetro email de tipo string y devuelve un valor de tipo boolean. 
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(email).toLowerCase());
    }

    // Validar la contraseña con expresiones regulares o regex 
    //al menos 7 caracteres, e incluya al menos una letra minuscula ([a-z]) y una letra mayuscula ([A-Z]).
    isValidPassword(password: string): boolean { 
      const re = /^(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
      return re.test(password);
    }


    //Funcion para el boton de redirigir al login
    goToLogin() {
      this.router.navigate(['/login']);
    }


}
