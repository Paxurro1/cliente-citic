import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { CambiarPassComponent } from './cambiar-pass/cambiar-pass.component';
import { ElegirRolComponent } from './elegir-rol/elegir-rol.component';
import { CambiarPreferenciasComponent } from './cambiar-preferencias/cambiar-preferencias.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DarLikeComponent } from './dar-like/dar-like.component';
import { VerAmigosComponent } from './ver-amigos/ver-amigos.component';
import { DataTablesModule } from 'angular-datatables';
import { VerMensajesComponent } from './ver-mensajes/ver-mensajes.component';
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component';


@NgModule({
  declarations: [
    EditarPerfilComponent,
    CambiarPassComponent,
    ElegirRolComponent,
    CambiarPreferenciasComponent,
    DarLikeComponent,
    VerAmigosComponent,
    VerMensajesComponent,
    EnviarMensajeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ]
})
export class UserModule { }
