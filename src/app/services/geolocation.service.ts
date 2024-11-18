/* src\app\services\geolocation.service.ts */

import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  async getCurrentPosition() {
    // Verificar si el permiso ya ha sido concedido
    const permission = await Geolocation.checkPermissions();
    if (permission.location !== 'granted') {
      // Solicitar permiso al usuario
      const request = await Geolocation.requestPermissions();
      if (request.location !== 'granted') {
        throw new Error('Permiso de ubicación denegado');
      }
    }

    // Obtener la posición actual
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  }
}
