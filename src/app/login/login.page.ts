import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  /* Animacion de entrada al chat, en caso de entrar como usuario registrado o como invitado. */
  animations: [
    trigger('pulseAnimation', [
      state('inactive', style({ transform: 'scale(1)', opacity: 1 })),
      state('active', style({ transform: 'scale(1.9)', opacity: 0.5 })),
      transition('inactive <=> active', [animate('0.3s')]),
    ]),
  ],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false; // Control del loading
  animationState: string = 'inactive'; // Estado de la animación
  showMessage: boolean = false; // Para mostrar la barra de mensaje de desconexión
  message: string | null = null; // Para el mensaje de desconexión
  isConnecting: boolean = false; // Para controlar el estado de conexión
  isGuest: boolean = false; // Para verificar si el usuario es invitado

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private loadingController: LoadingController // Inyección del LoadingController
  ) {}

  ngOnInit() {
    this.message = localStorage.getItem('logoutMessage'); // Obtener el mensaje
    if (this.message) {
      this.showMessage = true; // Mostrar la barra
      localStorage.removeItem('logoutMessage'); // Borrar el mensaje después de usarlo
      setTimeout(() => {
        this.showMessage = false; // Ocultar la barra después de 3 segundos
      }, 3000);
    }

    // Asegúrate de limpiar el mensaje de invitado si existe
    localStorage.removeItem('guestMessage'); // Limpia el mensaje de invitado
    this.isConnecting = false; //oculta el logo de conexión si esta en false
  }

  async login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    if (!this.email.trim() || !this.password.trim()) {
      this.presentToast('Error: Debes estar autenticado por favor crea una cuenta registrate.');
      return;
    }

    this.isConnecting = true; // Muestra el logo de conexión
    const loading = await this.loadingController.create({
      message: 'Cargando...', // Mensaje que se muestra
      duration: 2000 // Duración del loading en milisegundos
    });

    await loading.present(); // Presenta el loading

    try {
      const user = await this.authService.login(this.email, this.password);
      if (user) {
        this.presentToast('Entrando como usuario autenticado...'); // Mensaje de autenticación
        this.animationState = 'active'; // Activa la animación
        setTimeout(() => {
          this.router.navigate(['/chat']); // Redirige a la página del chat
          loading.dismiss(); //loading desaparece
          this.animationState = 'inactive'; // Restablece la animación
        }, 2000); // Espera 2 segundos
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isConnecting = false; // Oculta el logo de conexión
      loading.dismiss(); //loading desaparece en caso de error
    }
  }

  async guestLogin() {
    this.isConnecting = true; // Muestra el logo de conexión
    const loading = await this.loadingController.create({
      message: 'Cargando...', // Mensaje que se muestra
      duration: 1000 // Duración del loading en milisegundos
    });

    await loading.present(); // Presenta el loading

    // Mensaje de entrada como invitado
    this.presentToast('Entrando como invitado...');

    setTimeout(() => {
      this.router.navigate(['/chat']); // Redirige a la página del chat
      loading.dismiss(); // loading desaparece
      this.isConnecting = false; // Oculta el logo de conexión
    }, 1000); // Simula un retraso de 1 segundo
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
    this.loading = false; // oculta el loading en caso de error
    this.isConnecting = false; // oculta el logo de conexión en caso de error
  }

  createAcc() {
    this.router.navigate(['/register']);
  }

  forgottenPassword() {
    this.router.navigate(['/recover-key']); // Redirige a la página de recuperación de contraseña
  }
}