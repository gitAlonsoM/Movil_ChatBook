import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';
import { AuthService } from '../services/auth.service'; // Asegúrate de ajustar la ruta
import { ToastController } from '@ionic/angular'; // Importa ToastController

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage {
  // propiedades de la clase ChatPage
  userMessage: string = '';
  showMessage: boolean = false; // Para mostrar la barra de mensaje de desconexión
  message: string = ''; // Mensaje a mostrar en la barra

  constructor(private router: Router, private chatService: ChatService, private authService: AuthService, private toastController: ToastController) { }

  // Los mensajes del bot y del usuario se van acumulando en el array "messages" en forma de objetos.
  messages = [
    { text: 'Hola, ¿En qué puedo ayudarte?', fromUser: false }
  ];

  // Métodos de la clase ChatPage
  libreta() {
    this.router.navigate(['/libreta']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  // enviar el mensaje
  sendMessage() {
    if (this.userMessage.trim().length > 0) {
      this.messages.push({ text: this.userMessage, fromUser: true });

      // Enviar el mensaje al LLM (chatbot)
      this.chatService.sendMessageToLLM(this.userMessage).subscribe(
        (response) => {
          const botReply = response.choices[0].message.content;
          this.messages.push({ text: botReply, fromUser: false });  // Añadir la respuesta del bot
        },
        (error) => {
          console.error('Error enviando mensaje al LLM', error);
          this.messages.push({ text: 'Error al comunicarse con el LLM.', fromUser: false });
        }
      );

      this.userMessage = ''; // Limpiar el input después de enviar
    }
  }

  adjuntarArchivo() {
    alert('Adjuntar archivo');
    // Implementación futura para adjuntar archivos
  }

  sendAudio() {
    alert('Enviar audio');
    // Implementación futura para enviar audio
  }

  // Método para desconectarse
  logout() {
    this.authService.logout().then(() => {
      // Limpiar cualquier estado de conexión
      this.showMessage = false; // Asegúrate de ocultar el mensaje de desconexión
      this.message = ''; // Limpiar el mensaje

      // Limpiar cualquier mensaje de invitado en localStorage
      localStorage.removeItem('guestMessage'); // Asegúrate de limpiar el mensaje de invitado
      localStorage.removeItem('logoutMessage'); // Asegúrate de limpiar el mensaje de desconexión

      // Redirigir al usuario a la página de login
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Error al desconectarse', error);
    });
  }
}