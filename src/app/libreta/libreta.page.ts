import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-libreta',
  templateUrl: './libreta.page.html',
  styleUrls: ['./libreta.page.scss'],
})


export class LibretaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /* Funcion click del boton para redirigir a otra pagina */
  chat() {
   // redirigir a una página específica
    this.router.navigate(['/chat']);
  }

  newTask(){
    console.log("nueva tarea");
  }

  editMessage(){
    console.log("editar mensaje");
  }

  deleteMessage(){
    console.log("eliminar mensaje");
  }

  /* array de objetos */
  savedMessages = [
    { title: 'Primer Mensaje', content: 'Contenido del primer mensaje.' },
    { title: 'Segundo Mensaje', content: 'Contenido del segundo mensaje.' },
  ];


}
