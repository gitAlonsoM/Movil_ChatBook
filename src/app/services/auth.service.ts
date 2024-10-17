import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, sendPasswordResetEmail, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router, private toastController: ToastController) {}

  async register(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Registro exitoso:', userCredential);
      return userCredential.user; // Retorna solo el objeto de usuario
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error; // Propaga el error para manejo en el componente
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Inicio de sesión exitoso:', userCredential);
      return userCredential.user; // Retorna solo el objeto de usuario
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error; // Propaga el error para manejo en el componente
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Correo de recuperación enviado a:', email);
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      throw error; // Propaga el error para manejo en el componente
    }
  }

  getUser(): Observable<User | null> {
    return new Observable<User | null>(observer => {
      const unsubscribe = this.auth.onAuthStateChanged(user => {
        observer.next(user);
      });
      return { unsubscribe };
    });
  }

  // Método para desconectarse
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Usuario desconectado');
      this.showToast('Te has desconectado de forma exitosa vuelve pronto!!');
      this.router.navigate(['/login']); // Redirigir al login
    } catch (error) {
      console.error('Error al desconectarse:', error);
      throw error; // Propaga el error para manejo en el componente
    }
  }

  // Método para obtener el correo del usuario actual
  getCurrentUserEmail(): string {
    const user = this.auth.currentUser; // Se obtiene el usuario actual
    return user && user.email ? user.email : 'Invitado'; // Retorna el email o 'Invitado'
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }
}