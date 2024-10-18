/* myApp\src\app\chat\chat.service.ts
Servicio dedicado a gestionar la API de OpenAI */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // servicio disponible en toda la aplicación. Asegura que solo haya una única instancia del servicio (singleton) en toda la aplicación.
})



export class ChatService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions'; //endpoint de la API de OpenAi
  /* Comentar API antes de subir a github */
  private apiKey =
    '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';
  /* -s */


  // Prompt del sistema que define el comportamiento y personalidad del LLM
  private systemPrompt = `Actúa como una secretaria eficiente que se encarga de guardar deberes y pendientes. 
  Debes recordar y gestionar las tareas según se necesiten. Siempre debes estar dispuesta a ofrecer recordatorios 
  sobre lo que se debe hacer y cuándo. Utiliza un tono profesional y amigable, asegurándote de ser clara y concisa en 
  tus respuestas. No repitas la misma frase dos veces y mantén tus respuestas dentro de un límite de 60 tokens. Cada 
  vez que alguien solicite una tarea o recordatorio, asegúrate de confirmar que lo has anotado correctamente. `;

  // Parámetros de la API de OpenAI,
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

    // Penaliza las repeticiones de palabras.
    // Rango: -2.0 a 2.0. Valor normal: 0
    // Mínimo: -2.0 (aumenta repeticiones), Máximo: 2.0 (reduce fuertemente las repeticiones)
    // Importancia: Baja-Media. Útil para evitar respuestas repetitivas.
    frequency_penalty: 0.3,

    // Penaliza el uso de nuevos temas o conceptos.
    // Rango: -2.0 a 2.0. Valor normal: 0
    // Mínimo: -2.0 (incentiva nuevos temas), Máximo: 2.0 (se mantiene más en el tema actual)
    // Importancia: Baja-Media. Útil para mantener la conversación enfocada.
    presence_penalty: 0,

    // Controla la diversidad de las respuestas mediante núcleo de muestreo.
    // Rango: 0.0 a 1.0. Valor normal: 1.0
    // Mínimo: 0.0 (considera todos los tokens), Máximo: 1.0 (considera solo los tokens más probables)
    // Importancia: Media. Afecta la diversidad de las respuestas, especialmente útil con temperature baja.
    top_p: 1,

  };

  constructor(private http: HttpClient) {}

  // Metodo para enviar un mensaje del usuario al LLM, solicitud HTTP POST a la API de OpenAI
  sendMessageToLLM(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`, //Se usa la apiKey
    });
    
    const body = {
      ...this.apiParams, //Se incluyen los parametros, se usa el operador spread para incluir todos los parámetros definidos 
      messages: [
        { role: 'system', content: this.systemPrompt },
        { role: 'user', content: message },
      ],
    };

    // Realiza una solicitud HTTP POST a la URL de la API de OpenAI. Retorna un observable .post(), lo que significa que la operacion es asincrona 
    return this.http.post(this.apiUrl, body, { headers });
  }



    // Método para actualizar el prompt del sistema si es necesario
    /* updateSystemPrompt(newPrompt: string) {
    this.systemPrompt = newPrompt;
    } */


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
