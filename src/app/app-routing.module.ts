import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaPeliculasComponent } from './lista-peliculas/lista-peliculas.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppErrorComponent } from './app-error/app-error.component';



const routes: Routes = [
  {path:'', redirectTo:'/inicio', pathMatch:'full'},
  {path:'listaPeliculas', component:ListaPeliculasComponent},
  {path:'iniciarSesion', component:AppLoginComponent},
  {path:'registrarse', component:AppLoginComponent},
  {path:'inicio', component:AppHomeComponent},
  {path:'**', component:AppErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
