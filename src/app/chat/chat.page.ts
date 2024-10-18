/* src\app\chat\chat.page.ts */

import { Component } from '@angular/core'; //componente ChatPage
import { Router } from '@angular/router'; //navegación entre diferentes rutas
import { ChatService } from './chat.service';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular'; //permite mostrar mensajes emergentes.


@Component({
  //Decorador que marca esta clase como un componente de Angular
  selector: 'app-chat', //nombre que se usara en el HTML
  templateUrl: './chat.page.html', // ruta del archivo HTML
  styleUrls: ['./chat.page.scss'], //ruta del archivo SCSS
})


export class ChatPage {
  // propiedades de la clase ChatPage
  userMessage: string = '';
  showMessage: boolean = false; // Para mostrar la barra de mensaje de desconexion
  message: string = ''; // Mensaje a mostrar en la barra

  //El constructor inyecta los servicios necesarios
  constructor(
    private router: Router,
    private chatService: ChatService,
    private authService: AuthService,
    private toastController: ToastController
  ) {}


  // Array que acumula los mensajes en forma de objetos, con 2 valores.
  messages = [{ text: 'Hola, ¿En qué puedo ayudarte?', fromUser: false }];

  // enviar el mensaje al bot y obtener su respuesta
  sendMessage() {
    if (this.userMessage.trim().length > 0) {
      //verifica que no este vacio al eliminar los espacios.
      this.messages.push({ text: this.userMessage, fromUser: true });

      // Enviar el mensaje al LLM
      this.chatService.sendMessageToLLM(this.userMessage).subscribe(
        //Se suscribe a la respuesta de la API
        (response) => {
          //Si la API responde correctamente envia la respuesta del bot al array messages
          const botReply = response.choices[0].message.content;
          this.messages.push({ text: botReply, fromUser: false }); // Añadir la respuesta del bot
        },
        (error) => {
          //En caso de error se envia un mensaje al array messages
          console.error('Error enviando mensaje al LLM', error);
          this.messages.push({
            text: 'Error al comunicarse con el LLM.',
            fromUser: false,
          });
        }
      );

      this.userMessage = ''; // Limpiar el input despues de enviar
    }
  }


  adjuntarArchivo() {
    alert('Adjuntar archivo');
    // Implementacion futura para adjuntar archivos
  }

  sendAudio() {
    alert('Enviar audio');
    // Implementación futura para enviar audio
  }

  // Métodos de la clase ChatPage
  libreta() {
    this.router.navigate(['/libreta']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  // Método para desconectarse
  logout() {
    this.authService
      .logout()
      .then(() => {
        // Limpiar cualquier estado de conexión
        this.showMessage = false; // Asegúrate de ocultar el mensaje de desconexión
        this.message = ''; // Limpiar el mensaje

        // Limpiar cualquier mensaje de invitado en localStorage
        localStorage.removeItem('guestMessage'); // Asegúrate de limpiar el mensaje de invitado
        localStorage.removeItem('logoutMessage'); // Asegúrate de limpiar el mensaje de desconexión

        // Redirigir al usuario a la página de login
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al desconectarse', error);
      });
  }
  
}








/* 
./: Directorio actual (mismo nivel).
../: Sube un nivel en el árbol de directorios.
Sin extensión .ts: TypeScript sabe automáticamente que está buscando un archivo .ts sin que se necesite especificar la extensión.



*messages: 
Un array que contiene los mensajes del chat. 
Cada mensaje es un objeto con dos propiedades:
  text: El texto del mensaje.
  fromUser: Un booleano que indica si el mensaje fue enviado por el usuario (true) o por el bot (false).








*/
