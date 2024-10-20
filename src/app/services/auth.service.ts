/* src\app\services\auth.service.ts  */

import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, sendPasswordResetEmail, signOut } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs'; // Importar BehaviorSubject
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject para el estado de inicio de sesión
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Inicializa en false
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable para que otros componentes puedan suscribirse

  constructor(private auth: Auth, private router: Router, private toastController: ToastController) {
    // Verifica el estado de autenticación al iniciar el servicio
    this.auth.onAuthStateChanged(user => {
      this.isLoggedInSubject.next(!!user); // Actualiza el estado de inicio de sesión basado en si hay un usuario autenticado o no
    });
  }

  // Método para registrar un nuevo usuario
  async register(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Registro exitoso:', userCredential);
      this.isLoggedInSubject.next(true); // Actualiza el estado a 'true' al registrarse
      return userCredential.user; // Retorna solo el objeto de usuario
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error; // Propaga el error para manejo en el componente
    }
  }

  // Método para iniciar sesión
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Inicio de sesión exitoso:', userCredential);
      this.isLoggedInSubject.next(true); // Actualiza el estado a 'true' al iniciar sesión
      return userCredential.user; // Retorna solo el objeto de usuario
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error; // Propaga el error para manejo en el componente
    }
  }

  // Método para restablecer la contraseña
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Correo de recuperación enviado a:', email);
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      throw error; // Propaga el error para manejo en el componente
    }
  }

  // Método para obtener el usuario actual como un Observable
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
    // Solo desconectar si el usuario está autenticado
    if (this.isLoggedInSubject.getValue()) {
      try {
        await signOut(this.auth);
        console.log('Usuario desconectado');
        this.isLoggedInSubject.next(false); // Actualiza el estado a 'false' al desconectarse
        
        // Mostrar toast de desconexión exitosa
        this.showToast('Te has desconectado de forma exitosa. Vuelve pronto.');
        
        this.router.navigate(['/login']); // Redirigir al login solo si estaba autenticado
      } catch (error) {
        console.error('Error al desconectarse:', error);
        throw error; // Propaga el error para manejo en el componente
      }
    } else {
      // Si no hay un usuario autenticado (invitado), no se realiza el cierre de sesión
      console.log('Usuario invitado no necesita desconectar.');
      // Mostrar toast de que solo los usuarios autenticados pueden desconectarse
      this.showToast('Solo los usuarios autenticados pueden desconectarse.');
    }
  }

  // Método para obtener el correo del usuario actual
  getCurrentUserEmail(): string {
    const user = this.auth.currentUser; // Se obtiene el usuario actual
    return user && user.email ? user.email : 'Invitado'; // Retorna el email o 'Invitado'
  }

  // Método privado para mostrar mensajes de toast
  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success' // Cambia a 'warning' si quieres un color diferente
    });
    toast.present();
  }
}