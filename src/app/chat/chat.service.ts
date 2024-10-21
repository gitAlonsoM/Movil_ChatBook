/* src/app/chat/chat.service.ts */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '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'; // Reemplaza esto con una forma segura de manejar tu clave

  // Prompt del sistema que define el comportamiento y personalidad del LLM
  private systemPrompt = `Actúa como una secretaria eficiente que se encarga de guardar deberes y pendientes. 
Debes recordar y gestionar las tareas según se necesiten. Siempre debes estar dispuesta a ofrecer recordatorios 
sobre lo que se debe hacer y cuándo. Utiliza un tono profesional y amigable, asegurándote de ser clara y concisa en 
tus respuestas. No repitas la misma frase dos veces y mantén tus respuestas dentro de un límite de 60 tokens. Cada 
vez que alguien solicite una tarea o recordatorio, asegúrate de confirmar que lo has anotado correctamente. `;

  // Parámetros de la API de OpenAI
  private apiParams = {
    model: 'gpt-4o-mini',  /* gpt-4o-mini, gpt-4o	, gpt-4-turbo, gpt-3.5-turbo	 */
    temperature: 1,
    max_tokens: 150,
    frequency_penalty: 0.3,
    presence_penalty: 0,
    top_p: 1,
  };

  constructor(private http: HttpClient) {}

  // Método para enviar el historial de mensajes al LLM
  sendMessageToLLM(messages: { role: string; content: string }[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    // Prepend el systemPrompt al array de mensajes
    const messagesWithSystemPrompt = [
      { role: 'system', content: this.systemPrompt },
      ...messages,
    ];

    const body = {
      ...this.apiParams,
      messages: messagesWithSystemPrompt,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}













/*


*Injectable:
Decorador de Angular que permite que una clase sea inyectable como un servicio en otros componentes o servicios de la aplicación

*HttpClient:
Forma parte del módulo HTTP de Angular (@angular/common/http). Se utiliza para hacer solicitudes HTTP (GET, POST, PUT, DELETE, etc.) a servidores web.

*HttpHeaders: 
Clase de Angular que permite definir encabezados HTTP personalizados. En este caso, se utiliza para incluir la clave API (Authorization) y el tipo de contenido (Content-Type).

*Observable (objeto de RxJS):
Permite manejar el resultado de una llamada HTTP, como la respuesta de la API de OpenAI. Es una manera eficiente de manejar flujos de datos asíncronos en Angular.

*endpoint:
es una URL específica dentro de una API a la que se envían solicitudes para interactuar con un servicio o recurso. 



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
