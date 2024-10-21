// src/app/chat/chat.page.ts
// src/app/chat/chat.page.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { TaskService } from '../services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  userMessage: string = '';
  showMessage: boolean = false;
  message: string = '';
  isLoggedIn: boolean = false;
  logoutButtonHidden: boolean = false;
  private authSubscription: Subscription | null = null; // Inicializado a null

  // Inicializar el array de mensajes con el mensaje del asistente
  messages = [
    { role: 'assistant', content: 'Hola, ¿En qué puedo ayudarte?' },
  ];

  constructor(
    private router: Router,
    private chatService: ChatService,
    private authService: AuthService,
    private toastController: ToastController,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          this.showConnectionMessage('Te has conectado.', true);
        } else {
          this.showConnectionMessage('Has iniciado como invitado.', false);
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  // Enviar el mensaje al bot y obtener su respuesta
  sendMessage() {
    if (this.userMessage.trim().length > 0) {
      // Agregar el mensaje del usuario al array de mensajes
      this.messages.push({ role: 'user', content: this.userMessage });

      // Enviar el array completo de mensajes al LLM
      this.chatService.sendMessageToLLM(this.messages).subscribe(
        (response) => {
          // Obtener la respuesta del asistente
          const botReply = response.choices[0].message.content;
          // Agregar la respuesta del asistente al array de mensajes
          this.messages.push({ role: 'assistant', content: botReply });
        },
        (error) => {
          console.error('Error enviando mensaje al LLM', error);
          this.messages.push({
            role: 'assistant',
            content: 'Error al comunicarse con el LLM.',
          });
        }
      );

      this.userMessage = ''; // Limpiar el input después de enviar
    }
  }

  async sendTasksToLLM() {
    try {
      const tasks = await this.taskService.getAllTasks();

      if (tasks.length === 0) {
        this.messages.push({
          role: 'assistant',
          content: 'No hay tareas guardadas.',
        });
        return;
      }

      // Formatear las tareas en un texto que el LLM pueda entender
      let tasksMessage = 'Estas son tus tareas:\n';
      tasks.forEach((task, index) => {
        tasksMessage += `Tarea ${index + 1}:\nTítulo: ${
          task.title
        }\nDescripción: ${task.content}\n\n`;
      });

      // Agregar el mensaje de tareas al array de mensajes
      this.messages.push({ role: 'user', content: tasksMessage });

      // Enviar el array completo de mensajes al LLM
      this.chatService.sendMessageToLLM(this.messages).subscribe(
        (response) => {
          const botReply = response.choices[0].message.content;
          this.messages.push({ role: 'assistant', content: botReply });
        },
        (error) => {
          console.error('Error enviando tareas al LLM', error);
          this.messages.push({
            role: 'assistant',
            content: 'Error al enviar las tareas al LLM.',
          });
        }
      );
    } catch (error) {
      console.error('Error obteniendo las tareas', error);
      this.messages.push({
        role: 'assistant',
        content: 'Error al obtener las tareas.',
      });
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

  // Método para mostrar el mensaje de conexión
  private showConnectionMessage(message: string, isUser: boolean) {
    this.message = message;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false; // Oculta el mensaje después de 3 segundos
    }, 3000);
  }
}


/* 
./: Directorio actual (mismo nivel).
../: Sube un nivel en el árbol de directorios.
Sin extensión .ts: TypeScript sabe automáticamente que está buscando un archivo .ts sin que se necesite especificar la extensión.

* messages: 
Un array que contiene los mensajes del chat. 
Cada mensaje es un objeto con dos propiedades:
  text: El texto del mensaje.
  fromUser: Un booleano que indica si el mensaje fue enviado por el usuario (true) o por el bot (false).
*/
