/* src/app/chat/chat.service.ts  */
// src/app/chat/chat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root',
})



export class ChatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '';

  private systemPrompt = `Actúa como una secretaria eficiente que se encarga de guardar deberes y pendientes.`;

  private apiParams = {
    model: 'gpt-4o-mini',
    temperature: 1,
    max_tokens: 150,
    frequency_penalty: 0.3,
    presence_penalty: 0,
    top_p: 1,
  };

  constructor(private http: HttpClient, private platform: Platform) {}

  sendMessageToLLM(messages: { role: string; content: string }[]): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    const messagesWithSystemPrompt = [
      { role: 'system', content: this.systemPrompt },
      ...messages,
    ];

    const body = {
      ...this.apiParams,
      messages: messagesWithSystemPrompt,
    };

    if (this.platform.is('hybrid')) {
      // Ejecutándose en dispositivo o emulador
      const options = {
        url: this.apiUrl || '',
        headers: headers,
        data: body || {},
        params: {}, // Agregar un objeto params vacío
      };

      return from(Http.post(options)).pipe(
        catchError((error) => {
          console.error('Error al enviar mensaje al LLM:', error);
          alert(`Error al enviar mensaje: ${JSON.stringify(error, null, 2)}`);
          console.log('URL:', options.url);
          console.log('Headers:', options.headers);
          console.log('Data:', options.data);
          return throwError(() => error);
        })
      );
    } else {
      // Ejecutándose en el navegador
      const httpHeaders = new HttpHeaders(headers);
      return this.http.post(this.apiUrl, body, { headers: httpHeaders }).pipe(
        catchError((error) => {
          console.error('Error al enviar mensaje al LLM:', error);
          alert(`Error al enviar mensaje: ${JSON.stringify(error, null, 2)}`);
          return throwError(() => error);
        })
      );
    }
  }
}








/*

*Injectable:
Decorador de Angular que permite que una clase sea inyectable como un servicio en otros componentes o servicios de la aplicación
En lugar de @Component, los servicios usan el decorador @Injectable que indica que esta clase puede ser inyectada como una dependencia en otros componentes o servicios.

*HttpClient:
Forma parte del módulo HTTP de Angular (@angular/common/http). Se utiliza para hacer solicitudes HTTP (GET, POST, PUT, DELETE, etc.) a servidores web.

*HttpHeaders: 
Clase de Angular que permite definir encabezados HTTP personalizados. En este caso, se utiliza para incluir la clave API (Authorization) y el tipo de contenido (Content-Type).

*Observable (objeto de RxJS):
Permite manejar el resultado de una llamada HTTP, como la respuesta de la API de OpenAI. Es una manera eficiente de manejar flujos de datos asíncronos en Angular.

*endpoint:
es una URL específica dentro de una API a la que se envían solicitudes para interactuar con un servicio o recurso. 


*apiParams
La estructura que usa es un "objeto" de JS.
Un objeto es una colección de pares clave-valor. En este caso, apiParams es un objeto con varias propiedades o claves; como model, temperature, max_tokens, etc., cada una con su propio valor.




*Solicitud HTTP POST es un tipo de petición o request
que se hace desde algun SW a un servidor para enviar datos y recibir una respuesta.

*HTTP (HyperText Transfer Protocol) 
es el protocolo que define cómo los datos son transmitidos 
entre un cliente (como un navegador web o aplicación) y un servidor 
(el lugar donde están almacenados los datos o la lógica que quieres usar).

*POST 
es uno de los métodos más utilizados para enviar datos al servidor, 
sobre todo cuando quieres que el servidor procese estos datos. En una solicitud POST, 
los datos son enviados dentro del cuerpo de la solicitud.


*Token:
En el contexto de los modelos de lenguaje como GPT es una unidad básica de texto. Los tokens pueden ser palabras, partes de palabras o incluso signos de puntuación.
Signos de puntuación también cuentan como tokens, como el punto final (.) o comas.
Algunas palabras largas o compuestas pueden contar como varios tokens.

Ejemplos de tokens:
  apple → 1 token.
  don't → 2 tokens (do + n't).

  I love pizza. → 4 tokens.
          I     → 1 token.
          love  → 1 token.
          pizza → 1 token.
      . (punto) → 1 token.





*/


