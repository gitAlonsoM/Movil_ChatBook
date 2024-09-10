/* app-routing.module.ts */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


/* Definicion de Rutas: */
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //ruta por defecto sera el login
  
  {path: 'register',loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule) },
  { path: 'libreta', loadChildren: () => import('./libreta/libreta.module').then(m => m.LibretaPageModule) },
  {path: 'recover-key', loadChildren: () => import('./recover-key/recover-key.module').then( m => m.RecoverKeyPageModule)
  },
];



/* decoradores */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})


//Define la clase que Angular usara para la configuración del enrutamiento.
export class AppRoutingModule { }



