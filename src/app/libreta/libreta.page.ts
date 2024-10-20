/* src\app\libreta\libreta.page.ts  */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { AlertController, ToastController } from '@ionic/angular'; // Añadir ToastController para el mensaje
import { AuthService } from '../services/auth.service'; // Importa el servicio de autenticación

// Definir la interfaz para el tipo de datos de las tareas creadas
interface Task {
  id: string;
  title: string;
  content: string;
}

// Decorador de Angular para marcar una clase como componente, con su propio html, y estilos css
@Component({
  selector: 'app-libreta',
  templateUrl: './libreta.page.html',
  styleUrls: ['./libreta.page.scss'],
})

// Clase del componente "LibretaPage" que se encarga de gestionar la libreta de tareas a través de "métodos".
export class LibretaPage implements OnInit {
  tasks: Task[] = []; // Array de objetos, recibe las tareas almacenadas
  isLoggedIn: boolean = false; // Variable para el estado de inicio de sesión
  showMessage: boolean = false; // Controla la visibilidad del mensaje
  message: string = ''; // Almacena el mensaje que se mostrará

  constructor( // Constructor de la clase que inyecta dependencias o servicios.
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService, // Inyectar el servicio de autenticación
    private toastController: ToastController // Inyectar ToastController para mostrar el mensaje
  ) {}

  ngOnInit() { // Método "ngOnInit" que se ejecuta en cuanto es iniciado el componente.
    this.loadTasks(); // Cargar tareas al inicializar la libreta
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn; // Actualiza el estado de inicio de sesión
    });
  }

  // Cargar todas las tareas usando a "getAllTasks" del archivo "task.service.ts"
  async loadTasks() {
    this.tasks = await this.taskService.getAllTasks();
  }

  // Crear o editar una tarea, finalmente usa a "saveTask()" del archivo "task.service.ts" para guardar el nuevo cambio.
  async newTask(taskId: string | null = null) { // Se verifica si la tarea es nueva o existente a través del id, para crear o editar.   
    const alert = await this.alertCtrl.create({ // Crea un formulario emergente con la función "alertCtrl", permite al usuario agregar título y tareas.
      header: taskId ? 'Editar tarea' : 'Nueva tarea', // El operador ternario evalúa y de eso depende el título del formulario

      // Se definen los inputs del formulario (title, content) y sus botones (Cancelar, guardar/actualizar)
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
          text: taskId ? 'Actualizar' : 'Guardar', // Dependiendo si es tarea nueva o edición será el título del botón
          handler: async (data) => { 
            const id = taskId ? taskId : new Date().getTime().toString(); // Se usa el operador ternario para decidir qué valor dar al id, en caso que sea tarea nueva se genera un id nuevo en base a la fecha actual.
            await this.taskService.saveTask(id, { // Se llama al método "saveTask" de "task.service.ts", se le entrega el id, título y contenido como parámetros.
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
    this.newTask(taskId); // Reutilizar el formulario "newTask" para también editar una tarea existente.
  }

  // Método para manejar el clic en el botón de Libreta
  onLibretaButtonClick() {
    if (!this.isLoggedIn) {
      this.message = 'Debe iniciar sesión para hacer uso de esta característica'; // Mensaje que se mostrará
      this.showToast(this.message); // Llama a showToast en lugar de manejar el mensaje directamente
    } else {
      // Lógica para abrir la libreta
      // Aquí puedes añadir la lógica que necesites para abrir la libreta si el usuario está autenticado
    }
  }

  // Método para mostrar un mensaje tipo Toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración en milisegundos
      color: 'success', // Puedes cambiar el color según tu preferencia
    });
    await toast.present();
  }

  // Método para navegar al chat
  chat() {
    if (this.isLoggedIn) { // Verifica si el usuario está logueado
      this.router.navigate(['/chat']);
    } else {
      // Muestra un mensaje indicando que debe iniciar sesión
      alert('Debe iniciar sesión para acceder al chat.');
    }
  }

  // Método para desconectarse
  async logout() {
    if (this.isLoggedIn) { // Solo intentar desconectarse si está logueado
      await this.authService.logout();
    }
  }
}

/* 
* El AlertController (alertCtrl) de Ionic:
es una clase que se utiliza para crear y mostrar alertas en las aplicaciones. 
Las alertas son ventanas emergentes que contienen mensajes y opciones de interacción, como botones para aceptar o cancelar.

* Interface :
en TypeScript es una forma de definir la estructura de un objeto (plantilla). Sirve para especificar qué propiedades y tipos debe tener un objeto.
interface Task; cada tarea creada es un objeto con "id, titulo y contenido", la interface es su plantilla para crearlas, pero no el objeto en si.

* ngOnInit() :
método opcional que puedes definir en tu componente si implementas la interfaz OnInit. Es comúnmente utilizado para cargar datos y realizar inicializaciones importantes.
Puedes colocar otros métodos dentro de ngOnInit() para que se ejecuten al inicializar el componente.
*/   

/*
* El método "onLibretaButtonClick()":
- Comprueba si el usuario está conectado.
- Si no lo está, establece un mensaje que indica que debe iniciar sesión y lo muestra durante 3 segundos.

* Para mostrar mensajes emergentes en lugar de una alerta simple:
- Puedes considerar utilizar "ToastController" para mostrar el mensaje de forma más elegante. 
- En el constructor, ya se ha importado "ToastController", lo cual será útil para esto.
*/ 