import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { AlertController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations'; // Importar animaciones

// Definir la interfaz para el tipo de datos de las tareas
interface Task {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-libreta',
  templateUrl: './libreta.page.html',
  styleUrls: ['./libreta.page.scss'],
  animations: [
    trigger('pulseAnimation', [
      state('inactive', style({ transform: 'scale(1)', opacity: 1 })),
      state('active', style({ transform: 'scale(1.1)', opacity: 0.8 })),
      transition('inactive <=> active', [animate('0.3s')]),
    ]),
  ],
})
export class LibretaPage implements OnInit {
  
  tasks: Task[] = []; // Array de tareas
  animationState: string = 'inactive'; // Inicializar el estado de la animación

  constructor(
    private taskService: TaskService, 
    private alertCtrl: AlertController, 
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTasks(); // Cargar tareas al inicializar
  }

  // Cargar todas las tareas
  async loadTasks() {
    this.tasks = await this.taskService.getAllTasks();
  }

  // Crear o editar una tarea
  async newTask(taskId: string | null = null) {
    const alert = await this.alertCtrl.create({
      header: taskId ? 'Editar tarea' : 'Nueva tarea',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Título',
        },
        {
          name: 'content',
          type: 'textarea',
          placeholder: 'Contenido',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: taskId ? 'Actualizar' : 'Guardar',
          handler: async (data) => {
            const id = taskId ? taskId : new Date().getTime().toString();
            await this.taskService.saveTask(id, { id, title: data.title, content: data.content });
            this.loadTasks(); // Recargar las tareas
          }
        }
      ]
    });
    await alert.present();
  }

  // Eliminar tarea
  async deleteTask(taskId: string) {
    await this.taskService.deleteTask(taskId);
    this.loadTasks(); // Recargar las tareas
  }

  // Editar tarea
  editTask(taskId: string) {
    this.newTask(taskId);
  }

  // Método para navegar al chat
  chat() {
    this.router.navigate(['/chat']);
  }

  // Método para iniciar sesión como invitado
  guestLogin() {
    this.router.navigate(['/chat']); // Redirige al chat al iniciar sesión como invitado
  }
}