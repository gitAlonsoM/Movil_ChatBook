// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isGuestUser: boolean = false;

  login(token: string) {
    // Lógica para guardar el token en el local storage o en el estado de la aplicación
    localStorage.setItem('userToken', token);
    this.isGuestUser = false; // No es un invitado
  }

  logout() {
    // Lógica para cerrar sesión
    localStorage.removeItem('userToken');
    this.isGuestUser = false; // No es un invitado
  }

  isAuthenticated(): boolean {
    // Comprueba si hay un token en el local storage
    return !!localStorage.getItem('userToken');
  }

  // Método para establecer el estado de invitado
  setGuest(guest: boolean) {
    this.isGuestUser = guest;
  }

  isGuest(): boolean {
    return this.isGuestUser;
  }

  // Método para enviar el correo de recuperación
  sendRecoveryEmail(email: string): boolean {
    // Lógica para enviar el correo de recuperación
    // Aquí puedes integrar tu lógica real, como una llamada a una API
    console.log(`Enviando correo de recuperación a: ${email}`);
    // Simulación de éxito al enviar el correo
    return true; // Cambia esto según el resultado real de la operación
  }
}