/* myApp\src\app\services\task.service.ts */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// Definir la interfaz Task para ser usada en el servicio también
interface Task {
  id: string;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Inicializa el almacenamiento
    await this.storage.create();
  }


  // Crear o actualizar tarea
  saveTask(id: string, task: Task) {
    return this.storage.set(id, task);
  }

  // Obtener todas las tareas, utiliza al array de objetos de "libreta.page.html"
  async getAllTasks(): Promise<Task[]> {
    let tasks: Task[] = [];
    await this.storage.forEach((value, key) => {
      tasks.push({ id: key, ...value });
    });
    return tasks;
  }

  // Obtener una tarea por ID
  getTask(id: string) {
    return this.storage.get(id);
  }

  // Eliminar tarea  por ID
  deleteTask(id: string) {
    return this.storage.remove(id);
  }
}
