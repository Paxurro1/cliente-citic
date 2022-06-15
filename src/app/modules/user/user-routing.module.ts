import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component'
import { CambiarPassComponent } from './cambiar-pass/cambiar-pass.component'
import { ElegirRolComponent } from './elegir-rol/elegir-rol.component'
import { CambiarPreferenciasComponent } from './cambiar-preferencias/cambiar-preferencias.component'
import { DarLikeComponent } from './dar-like/dar-like.component'
import { VerAmigosComponent } from './ver-amigos/ver-amigos.component'
import { VerMensajesComponent } from './ver-mensajes/ver-mensajes.component'
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component'

const routes: Routes = [
  {
    path:'editar-perfil',
    component: EditarPerfilComponent
  },
  {
    path:'cambiar-pass',
    component: CambiarPassComponent
  },
  {
    path:'elegir-rol',
    component: ElegirRolComponent
  },
  {
    path:'cambiar-preferencias',
    component: CambiarPreferenciasComponent
  },
  {
    path:'dar-like',
    component: DarLikeComponent
  },
  {
    path:'ver-amigos',
    component: VerAmigosComponent
  },
  {
    path:'ver-mensajes',
    component: VerMensajesComponent
  },
  {
    path:'enviar-mensaje',
    component: EnviarMensajeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
