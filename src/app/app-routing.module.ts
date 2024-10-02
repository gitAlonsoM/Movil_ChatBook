// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';  // Importa el AuthGuard

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirige a la página de login por defecto
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  
  // Ruta protegida de la libreta
  { 
    path: 'libreta', 
    loadChildren: () => import('./libreta/libreta.module').then(m => m.LibretaPageModule), 
    canActivate: [AuthGuard]  // Protegemos la ruta con AuthGuard
  },
  
  // Ruta del chat, permitiendo el acceso a invitados
  { 
    path: 'chat', 
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule), 
    canActivate: [AuthGuard]  // Proteger también esta ruta
  },
  
  // Ruta de recuperación de contraseña
  { 
    path: 'recover-key', 
    loadChildren: () => import('./recover-key/recover-key.module').then(m => m.RecoverKeyPageModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }