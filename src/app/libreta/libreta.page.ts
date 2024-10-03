import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { AlertController } from '@ionic/angular';


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
})
export class LibretaPage implements OnInit {
  
  // Tipar correctamente el array de tareas
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private alertCtrl: AlertController, private router: Router,) {}

  ngOnInit() {
    this.loadTasks();
  }

  // Cargar todas las tareas
  async loadTasks() {
    this.tasks = await this.taskService.getAllTasks();
  }

  // Crear o editar una tarea
  async newTask(taskId: string | null = null) { // Cambiar para aceptar 'string' o 'null'
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
          handler: (data) => {
            const id = taskId ? taskId : new Date().getTime().toString();
            // Asegurarse de que el 'id' esté incluido en el objeto 'Task'
            this.taskService.saveTask(id, { id: id, title: data.title, content: data.content }).then(() => {
              this.loadTasks(); // Recargar las tareas
            });
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


  //metodo navegar al chat
  chat(){
    this.router.navigate(['/chat']);
  }
  
}
