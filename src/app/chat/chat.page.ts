import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logoApple } from 'ionicons/icons';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  messages = [
    { text: 'Hola, ¿En que puedo ayudarte?', fromUser: false }
  ];

  userMessage: string = '';

  constructor(private router: Router, private chatService: ChatService) { 
    addIcons({ logoApple });
  }

  ngOnInit() { }

  libreta() {
    this.router.navigate(['/libreta']);
  }


  login(){
    this.router.navigate(['/login']);
  }
  

  sendMessage() {
    if (this.userMessage.trim().length > 0) {
      this.messages.push({ text: this.userMessage, fromUser: true });

      this.chatService.sendMessageToLLM(this.userMessage).subscribe(
        (response) => {
          const botReply = response.choices[0].message.content;
          this.messages.push({ text: botReply, fromUser: false });
        },
        (error) => {
          console.error('Error enviando mensaje al LLM', error);
          this.messages.push({ text: 'Error al comunicarse con el LLM.', fromUser: false });
        }
      );

      this.userMessage = '';
    }
  }

  attachFile() {
    console.log('Adjuntar archivo');
    // Implementación futura para adjuntar archivos
  }

  sendAudio() {
    console.log('Enviar audio');
    // Implementación futura para enviar audio
  }
}