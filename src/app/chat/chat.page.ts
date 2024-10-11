import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})


export class ChatPage{
  //propiedades de la clase ChatPage

  userMessage: string = '';

  constructor(private router: Router, private chatService: ChatService) { 
  }


    //Los mensajes del bot y del usuario se van acumulando en el array "messages" en forma de objetos.
    //Cada objeto tiene dos propiedades: El contenido del mensaje, y fromUser (true = usuario / falsa=bot)
    //este proceso de acumulación es gestionado por el método push() en sendMessage
    messages = [
      { text: 'Hola, ¿En que puedo ayudarte?', fromUser: false }
    ];


    //Metodos de la clase ChatPage

    libreta() {
      this.router.navigate(['/libreta']);
    }


    login(){
      this.router.navigate(['/login']);
    }


    //enviar el mensaje, trim elimina espacios en blanco, si esta vacio no se envia. 
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

        this.userMessage = '';// Limpiar el input después de enviar
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


}