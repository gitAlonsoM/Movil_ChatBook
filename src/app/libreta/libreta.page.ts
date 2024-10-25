
// src/app/libreta/libreta.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Importar AuthService
//import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importar funciones de la camara con capacitor


// Definir la interface para el tipo de datos de las tareas creadas
interface Task {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null; // Url de la img es opcional
}


@Component({
  selector: 'app-libreta',
  templateUrl: './libreta.page.html',
  styleUrls: ['./libreta.page.scss'],
})

export class LibretaPage implements OnInit {
  tasks: Task[] = []; // Array de objetos para almacenar las tareas
  isLoggedIn: boolean = false; 
  showMessage: boolean = false;
  message: string = '';

  constructor(
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService, // Se inyecta AuthService
    private toastController: ToastController
  ) {}


  ngOnInit() { // Metodo que se ejecuta al iniciar el componente
    this.loadTasks();
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }


  //*Cargar todas las tareas almacenadas
  async loadTasks() {
    try {
      this.tasks = await this.taskService.getAllTasks(); //se obtienen las tareas desde el almacenamiento
    } catch (error) {
      this.showToast('Error al cargar las tareas.');
    }
  }


  //*funciones de la camara capacitor no disponible en el navegador, se debe usar emulador android, ios ()
  // Método para capturar una imagen o seleccionar desde la galería
  /*   async addImage(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt, // Permite al usuario elegir entre cámara o galería
      });

      return image?.dataUrl || null; // Devuelve la imagen en formato base64 o null si se cancela
    } catch (error) {
      console.error('Error obteniendo la imagen', error);
      this.showToast('Error al obtener la imagen.');
      return null;
    }
  } */


  //*Crear o editar una tarea, permite adjuntar imagen
  async newTask(taskId: string | null = null) {
    try {

        //*Codigo comentado para que no se utilice las funciones de la camara no disponible en el navegador
      let imageUrl: string | null = null; // Variable para almacenar la URL de la imagen
    /*   if (!taskId) {
        imageUrl = await this.addImage(); // Capturar o seleccionar imagen para nueva tarea
        console.log('Imagen seleccionada:', imageUrl); // Imprimir la URL de la imagen seleccionada
      } */
       
      const alert = await this.alertCtrl.create({
        header: taskId ? 'Editar tarea' : 'Nueva tarea',   // Define el titulo del formulario (dependiendo si es una nueva tarea o se esta editando una existente)
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
            text: taskId ? 'Actualizar' : 'Guardar',
            handler: async (data) => {
              console.log('Datos del formulario:', data); // Imprimir los datos del formulario
              if (!data.title || !data.content) {
                this.showToast('El título y el contenido son obligatorios.');
                return;
              }
              const id = taskId ? taskId : new Date().getTime().toString();
              const task: Task = {
                id,
                title: data.title,
                content: data.content,
                imageUrl: imageUrl || null, // Guardar la URL de la imagen
              };
              try {
                console.log('Guardando tarea:', task); // Imprimir la tarea que se va a guardar
                await this.taskService.saveTask(id, task);
                this.loadTasks();
              } catch (error) {
                console.error('Error guardando la tarea', error);
                this.showToast('Error al guardar la tarea.');
              }
            },
          },
        ],
      });
      await alert.present();
    } catch (error) {
      console.error('Error creando o editando tarea', error);
      this.showToast('Error al abrir el formulario de tarea.');
    }
  }

  //*Eliminar tarea
  async deleteTask(taskId: string) {
    try {
      await this.taskService.deleteTask(taskId);
      this.loadTasks();
    } catch (error) {
      console.error('Error eliminando la tarea', error);
      this.showToast('Error al eliminar la tarea.');
    }
  }

  // Editar tarea
  editTask(taskId: string) {
    this.newTask(taskId); // Reutiliza el formulario para editar
  }

  // Método para navegar al chat
  chat() {
    if (this.isLoggedIn) {
      this.router.navigate(['/chat']);
    } else {
      alert('Debe iniciar sesión para acceder al chat.');
    }
  }

  // Método para desconectarse
  async logout() {
    if (this.isLoggedIn) {
      await this.authService.logout();
    }
  }

  // Método para mostrar un mensaje tipo Toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración en milisegundos
      color: 'danger', // Puedes cambiar el color según tu preferencia
    });
    await toast.present();
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

*operador ternario (? :) 
se utiliza para evaluar una expresión y devolver uno de dos valores dependiendo de si la expresión es verdadera o falsa.

*operador || 
(OR lógico) indica si cualquiera de los operandos es verdadero. 

*/   

/*
* El método "onLibretaButtonClick()":
- Comprueba si el usuario está conectado.
- Si no lo está, establece un mensaje que indica que debe iniciar sesión y lo muestra durante 3 segundos.

* Para mostrar mensajes emergentes en lugar de una alerta simple:
- Puedes considerar utilizar "ToastController" para mostrar el mensaje de forma más elegante. 
- En el constructor, ya se ha importado "ToastController", lo cual será útil para esto.






*/ 