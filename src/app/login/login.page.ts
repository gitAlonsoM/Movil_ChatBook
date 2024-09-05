/*  myApp\src\app\login\login.page.ts*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage {

  constructor(private router: Router) { }

  login() {
    // redirigir al chat

   /*  this.router.navigate(['/chat']) */;

  }

  guestLogin() {
    // redirigir sin autentificar, como invitado
    this.router.navigate(['/chat']);
  }


  //Funcion que redirige a una funcionalidad de contraseña olvidada
  forgottenPassword(){
    /*  */
  }

  createAcc(){
    this.router.navigate(['/register']);
  }

}
