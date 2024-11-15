import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    /* Animación de entrada */
    trigger('pulseAnimation', [
      state('inactive', style({ transform: 'scale(1)', opacity: 1 })),
      state('active', style({ transform: 'scale(1.9)', opacity: 0.5 })),
      transition('inactive <=> active', [animate('0.3s')]),
    ]),
    /* Animación de botón presionado */
    trigger('buttonPressAnimation', [
      state('normal', style({ transform: 'scale(1)', backgroundColor: '#3880ff' })),
      state('pressed', style({ transform: 'scale(0.95)', backgroundColor: '#4c8dff' })),
      transition('normal <=> pressed', animate('100ms ease-in-out')),
    ]),
    /* Animación de cambio de fondo para la pantalla de login */
    trigger('backgroundTransition', [
      transition(':enter', [
        style({ backgroundColor: 'white' }),
        animate('1s', style({ backgroundColor: '#f2f2f2' })),
      ]),
    ]),
  ],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false; // Nuevo campo para "Recordar cuenta"
  loading: boolean = false; // Control del loading
  animationState: string = 'inactive'; // Estado de la animación
  buttonState: string = 'normal'; // Estado de animación de botón
  showMessage: boolean = false; // Para mostrar la barra de mensaje de desconexión
  message: string | null = null; // Para el mensaje de desconexión
  isConnecting: boolean = false; // Para controlar el estado de conexión
  isGuest: boolean = false; // Para verificar si el usuario es invitado

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    // Verificar si hay mensaje de desconexión en localStorage
    this.message = localStorage.getItem('logoutMessage'); // Obtener el mensaje
    if (this.message) {
      this.showMessage = true;
      localStorage.removeItem('logoutMessage');
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    }
    // Remover mensaje de invitado
    localStorage.removeItem('guestMessage');
    this.isConnecting = false;

    // Verificar si el usuario ya está logueado y "recordar cuenta"
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      // Si hay usuario guardado en localStorage, iniciar sesión automáticamente
      this.router.navigate(['/chat']);
    }
  }

  async login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Validación de campos vacíos
    if (!this.email.trim() || !this.password.trim()) {
      this.presentToast('Error: Debes estar autenticado. Por favor, crea una cuenta.', 'danger', '⚠️');
      return;
    }

    this.isConnecting = true;
    this.loading = true; // Activa el spinner en el botón
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    try {
      const user = await this.authService.login(this.email, this.password);
      if (user) {
        this.presentToast('Entrando como usuario autenticado...', 'success', '✅');
        this.animationState = 'active';

        // Si "Recordar cuenta" está marcado, guardar el usuario en localStorage
        if (this.rememberMe) {
          localStorage.setItem('user', JSON.stringify(user)); // Guardar los datos del usuario
        }

        setTimeout(() => {
          this.router.navigate(['/chat']);
          loading.dismiss();
          this.animationState = 'inactive';
          this.loading = false; // Desactiva el spinner
        }, 2000);
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isConnecting = false;
      loading.dismiss();
      this.loading = false;
    }
  }

  async guestLogin() {
    this.isConnecting = true;
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 1000
    });

    await loading.present();

    this.presentToast('...', 'primary', '👤');

    setTimeout(() => {
      this.router.navigate(['/chat']);
      loading.dismiss();
      this.isConnecting = false;
    }, 1000);
  }

  private async presentToast(message: string, color: string = 'dark', icon: string = '') {
    const toast = await this.toastController.create({
      message: `${icon} ${message}`,
      duration: 2000,
      position: 'top',
      color: color,
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
    this.presentToast(errorMessage, 'danger', '⚠️');
    this.loading = false;
    this.isConnecting = false;
  }

  createAcc() {
    this.router.navigate(['/register']);
  }

  forgottenPassword() {
    this.router.navigate(['/recover-key']);
  }

  // Cambia el estado del botón cuando se presiona
  buttonPress(state: string) {
    this.buttonState = state;
  }
}