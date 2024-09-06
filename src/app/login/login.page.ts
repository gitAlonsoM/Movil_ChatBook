/*  myApp\src\app\login\login.page.ts*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],



  //"pulse animation" (animación de pulso), transforma el tamaño y opacidad de un elemento, antes de realizar una acción (como la redirección). 
  //animación personalizada basada en estados dentro de Angular   
  animations: [
    trigger('pulseAnimation', [
      //Cuando la animación está inactiva
      state('inactive', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      //Cuando la animación está activa
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
  animationState = 'inactive'; // Estado inicial de la animación

  constructor(private router: Router) { }

  login() {
    // Redirigir al chat
    /* this.router.navigate(['/chat']); */
  }

  guestLogin() {
    // Cambia el estado de la animación a activa
    this.animationState = 'active';
    setTimeout(() => {
      this.router.navigate(['/chat']);
      // Vuelve al estado de animacion inactiva
      this.animationState = 'inactive';
    }, 200); // Duración de la animación en milisegundos
  }

  forgottenPassword() {
    // Implementar funcionalidad
  }

  createAcc() {
    this.router.navigate(['/register']);
  }
}
