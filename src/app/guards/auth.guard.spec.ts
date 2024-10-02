import { TestBed } from '@angular/core/testing';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard; // Guardia de autenticación
  let authService: jasmine.SpyObj<AuthService>; // Espía para AuthService
  let router: jasmine.SpyObj<Router>; // Espía para Router

  beforeEach(() => {
    // Crear espías para AuthService y Router
    authService = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'isGuest']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    // Configurar el módulo de pruebas
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    // Inyectar el guardia
    guard = TestBed.inject(AuthGuard);
  });

  it('debería ser creado', () => {
    expect(guard).toBeTruthy(); // Verifica que el guardia se haya creado
  });

  it('debería permitir el acceso si está autenticado', () => {
    authService.isAuthenticated.and.returnValue(true); // Simula que el usuario está autenticado
    expect(guard.canActivate()).toBeTrue(); // Verifica que se permita el acceso
  });

  it('debería permitir el acceso si es un invitado', () => {
    authService.isAuthenticated.and.returnValue(false); // Simula que el usuario no está autenticado
    authService.isGuest.and.returnValue(true); // Simula que el usuario es un invitado
    expect(guard.canActivate()).toBeTrue(); // Verifica que se permita el acceso
  });

  it('debería redirigir al login si no está autenticado ni es invitado', () => {
    authService.isAuthenticated.and.returnValue(false); // Simula que el usuario no está autenticado
    authService.isGuest.and.returnValue(false); // Simula que el usuario no es un invitado
    
    const result = guard.canActivate(); // Ejecuta el método canActivate
    expect(result).toBeFalse(); // Verifica que no se permita el acceso
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Verifica que se redirija al login
  });
});