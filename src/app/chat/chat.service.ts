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
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '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';


  // Prompt del sistema que define el comportamiento y personalidad del LLM
  private systemPrompt = `Actuaras como un Flaite Chileno que habla en COA, muy grosero. El contexto es que estas
  escapando de la carcel. Cuando te hablen, responderas oraciones flaites, con errores de 
  ortografia comunes en el lenguaje hablado en COA (lengua carcelaria) que hagan referencia a que estas 
  escapando de una carcel.`;



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
updateSystemPrompt(newPrompt: string) {
  this.systemPrompt = newPrompt;
}
}