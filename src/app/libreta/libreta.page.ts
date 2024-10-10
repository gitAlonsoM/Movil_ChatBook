/*src\app\libreta\libreta.page.ts  */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { AlertController } from '@ionic/angular';

// Definir la interfaz para el tipo de datos de las tareas creadas
interface Task {
  id: string;
  title: string;
  content: string;
}


//Decorador de Angular para marcar una clase como componente, con sus propio html, y estilos css
@Component({
  selector: 'app-libreta',
  templateUrl: './libreta.page.html',
  styleUrls: ['./libreta.page.scss'],
})


//Clase del componente "LibretaPage" que se encarga de gestionar la libreta de tareas atraves de "metodos".
export class LibretaPage implements OnInit {
  tasks: Task[] = []; // Array de objetos

  constructor( //constructor de la clase que inyecta dependencias o servicios.
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() { //metodo "ngOnInit" que se ejecuta en cuanto es iniciado el componente.
    this.loadTasks(); // Cargar tareas al inicializar la libreta
  }

  // Cargar todas las tareas usando a "getAllTasks" del archivo "task.service.ts"
  async loadTasks() {
    this.tasks = await this.taskService.getAllTasks();
  }


  // Crear o editar una tarea, finalmente usa a "saveTask()"" del archivo "task.service.ts" para guardar el nuevo cambio.
  async newTask(taskId: string | null = null) { //Se verifica si la tarea es nueva o existente atraves del id, para crear o editar.   
    const alert = await this.alertCtrl.create({//Crea un formulario emergente con la funcion "alertCtrl", permite al usario agregar titulo y tareas.
      header: taskId ? 'Editar tarea' : 'Nueva tarea', //El operador ternario evalua y de eso depende el titulo del formulario

      //Se defininen los input del formulario (title, content) y sus botones(Cancelar, guardar/actualizar)
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
        },
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: taskId ? 'Actualizar' : 'Guardar', //dependiendo si es tarea nueva o edicion sera el titulo del boton
          handler: async (data) => { 
            const id = taskId ? taskId : new Date().getTime().toString(); //se usa el operador ternario para decidir que valor dar al id, en caso que sea tarea nueva se genera un id nuevo en base a la fecha actual.
            await this.taskService.saveTask(id, { //se llama al metodo "saveTask" de "task.service.ts", se le entrega el id, titulo y contenido como parametros.
              id,
              title: data.title,
              content: data.content,
            });
            this.loadTasks(); // Recargar las tareas
          },
        },
      ],
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
    this.newTask(taskId); //Reutilizar el formulario "newTask" para también editar una tarea existente.
  }

  // Método para navegar al chat
  chat() {
    this.router.navigate(['/chat']);
  }
}











/* 
*El AlertController (alertCtrl) de Ionic:
es una clase que se utiliza para crear y mostrar alertas en las aplicaciones. 
Las alertas son ventanas emergentes que contienen mensajes y opciones de interacción, como botones para aceptar o cancelar.


*Interface :
en TypeScript es una forma de definir la estructura de un objeto (plantilla). Sirve para especificar qué propiedades y tipos debe tener un objeto.
interface Task; cada tarea creada es un objeto con "id, titulo y contenido", la interface es su plantilla para crearlas, pero no el objeto en si.


*ngOnInit() :
método opcional que puedes definir en tu componente si implementas la interfaz OnInit. Es comúnmente utilizado para cargar datos y realizar inicializaciones importantes.
Puedes colocar otros métodos dentro de ngOnInit() para que se ejecuten al inicializar el componente.





*/
