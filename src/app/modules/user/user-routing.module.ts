import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component'
import { CambiarPassComponent } from './cambiar-pass/cambiar-pass.component'
import { ElegirRolComponent } from './elegir-rol/elegir-rol.component'
import { CambiarPreferenciasComponent } from './cambiar-preferencias/cambiar-preferencias.component'
import { DarLikeComponent } from './dar-like/dar-like.component'
import { VerAmigosComponent } from './ver-amigos/ver-amigos.component'

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
