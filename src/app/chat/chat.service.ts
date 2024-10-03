/* myApp\src\app\chat\chat.service.ts
Servicio dedicado a gestionar la API de OpenAI */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


/* Comentar API antes de subirla a github */
export class ChatService {

  /* private apiUrl = 'https://api.openai.com/v1/chat/completions'; */ //endpoint de la API de OpenAI (que parte del servidor de OpenAI tu aplicación está enviando la solicitud.)
  /* private apiKey = ''; */
  /* -s */

  // Prompt del sistema que define el comportamiento y personalidad del LLM
  private systemPrompt = `Actua como Don Ramon del Chavo del 8, copia su personalidad y actua como el en todo momento.
  Le estas hablando al chavo del 8, estas enojado con él, lo estas retando, todo lo dice te hace enojar aun más. 
  Contestas con frases como por ejemplo "¡No te doy otra porque no tengo!, ¡Ya cállate, Chavo!, ¡Tenía que ser el Chavo del 8!.
  Nunca repites 2 veces la misma frase.Contestas con maximo 60 tokens." `;



  // Parámetros de la API de OpenAI
  private apiParams = {
    
    //Modelos: gpt-4o, gpt-4o-mini, gpt-3.5-turbo, gpt-4, gpt-4-turbo	
    model: 'gpt-4o-mini',

  /*
    temperature: Controla la aleatoriedad de las respuestas. 
    Rango: 0.0 a 2.0. Valor normal: 0.7
    Mínimo: 0.0 (muy determinista), Máximo: 2.0 (muy aleatorio, más creatividad)
    Importancia: Alta. Afecta directamente la creatividad y variabilidad de las respuestas. */
    temperature: 1,

    // Limita el número de tokens (palabras y signos de puntuación) en la respuesta.
    // Rango: 1 a 4096 para gpt-3.5-turbo, 1 a 8192 para gpt-4. Valor normal: 1000
    // Mínimo: 1, Máximo: depende del modelo
    // Importancia: Media. Controla la longitud de las respuestas y puede afectar los costos de la API.
    max_tokens: 70,

    // Controla la diversidad de las respuestas mediante núcleo de muestreo.
    // Rango: 0.0 a 1.0. Valor normal: 1.0
    // Mínimo: 0.0 (considera todos los tokens), Máximo: 1.0 (considera solo los tokens más probables)
    // Importancia: Media. Afecta la diversidad de las respuestas, especialmente útil con temperature baja.
    top_p: 1,

    // Penaliza las repeticiones de palabras.
    // Rango: -2.0 a 2.0. Valor normal: 0
    // Mínimo: -2.0 (aumenta repeticiones), Máximo: 2.0 (reduce fuertemente las repeticiones)
    // Importancia: Baja-Media. Útil para evitar respuestas repetitivas.
    frequency_penalty: 0.3,

    // Penaliza el uso de nuevos temas o conceptos.
    // Rango: -2.0 a 2.0. Valor normal: 0
    // Mínimo: -2.0 (incentiva nuevos temas), Máximo: 2.0 (se mantiene más en el tema actual)
    // Importancia: Baja-Media. Útil para mantener la conversación enfocada.
    presence_penalty: 0.3 
  };


  constructor(private http: HttpClient) { }

  // Método para enviar un mensaje al LLM de OpenAI
  // solicitud HTTP POST a la API de OpenAI 
  sendMessageToLLM(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      ...this.apiParams,
      messages: [
        { role: 'system', content: this.systemPrompt },
        { role: 'user', content: message }
      ]
    };
    
    return this.http.post(this.apiUrl, body, { headers });
  }


// Método para actualizar el prompt del sistema si es necesario
/* updateSystemPrompt(newPrompt: string) {
  this.systemPrompt = newPrompt;
} */


}




















/* 

Una solicitud HTTP POST es un tipo de petición o request que se hace desde algun SW
a un servidor para enviar datos y recibir una respuesta.

HTTP (HyperText Transfer Protocol) es el protocolo que define cómo los datos son transmitidos 
entre un cliente (como un navegador web o aplicación) y un servidor 
(el lugar donde están almacenados los datos o la lógica que quieres usar).

POST es uno de los métodos más utilizados para enviar datos al servidor, 
sobre todo cuando quieres que el servidor procese estos datos. En una solicitud POST, 
los datos son enviados dentro del cuerpo de la solicitud.
*/

