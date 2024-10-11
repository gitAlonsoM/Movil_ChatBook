/* myApp\src\app\services\task.service.ts */
import { Injectable } from '@angular/core'; //{Injectable} para que el servicio pueda ser inyectado en otros componentes.
import { Storage } from '@ionic/storage-angular'; //almacenamiento local de Ionic

// Definir la interfaz para el tipo de datos de las tareas creadas
interface Task {
  id: string;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root', //permite que el servicio esté disponible en toda la aplicación (a nivel raiz)
})


export class TaskService {

  constructor(private storage: Storage) { // se inyecta el servicio de almacenamiento de Ionic (Storage), para poder usarlo dentro de la clase TaskService.
    this.init(); //inicializa el almacenamiento de Ionic.
  }

  async init() {
    await this.storage.create();// Inicializa el almacenamiento
  }


  // Crear o actualizar tarea
  saveTask(id: string, task: Task) {
    return this.storage.set(id, task); //guarda la tarea en el almacenamiento local usando el id como la clave y el objeto task como el valor.
  }


  // Obtener todas las tareas almacenadas en local
  async getAllTasks(): Promise<Task[]> {
    let tasks: Task[] = [];                          //Se crea un array vacío para almacenar las tareas.
    await this.storage.forEach((value, key) => {     //Recorre cada elemento guardado en el almacenamiento, Para cada tarea, empuja un objeto { id: key, ...value } al array tasks.
      tasks.push({ id: key, ...value });
    });
    return tasks;  //devuelve el array de tareas almacenadas.
  }



  // Obtener una tarea por su clave "ID"
  getTask(id: string) {
    return this.storage.get(id);
  }


  // Eliminar tarea  por ID
  deleteTask(id: string) {
    return this.storage.remove(id);
  }


}








/* 

*set(id, task)  :
Es una función que almacena datos en el almacenamiento local de la aplicación, almacena la tarea en un formato clave-valor, similar a cómo funciona un diccionario o un objeto en JavaScript
set() toma dos parámetros (key, value):
  id: La clave que identifica de manera única los datos (en este caso, una tarea).
  task: El valor que se almacena, en este caso, es un objeto de tipo Task que contiene el id, title, y content de la tarea.
El objeto tarea es almacenado como un objeto JSON en el almacenamiento local.



*Storage 
es una biblioteca de almacenamiento local que proporciona Ionic para guardar datos de manera persistente en dispositivos móviles y en la web. 
Compatibilidad multiplataforma: Funciona en la web (con IndexedDB o LocalStorage) y en dispositivos móviles (con SQLite usando Capacitor).
Almacenamiento basado en clave-valor: Los datos se almacenan en pares de clave-valor, lo que lo hace fácil de usar.
Métodos principales usados de Ionic Storage:
  create():
    Inicializa el almacenamiento para que esté listo para usar.
  set(id, value):
    Guarda o actualiza un valor bajo una clave (id) específica.
  get(id):
    Recupera un valor específico
  remove(id):
    Elimina un valor del almacenamiento usando su clave (id)
  forEach(callback):
    Recorre todos los elementos almacenados y aplica una función callback a cada uno.


¿Dónde se guarda el objeto a nivel local?
  En la web, usa IndexedDB o LocalStorage.
  En dispositivos móviles, utiliza SQLite si está disponible (esto ocurre a través de Capacitor).

Para su correctro uso se instalaron las bibliotecas/paquetes:

Ionic Storage:
  npm install @ionic/storage-angular

Capacitor Preferences:
  npm install @capacitor/preferences






*/