import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudAdminComponent } from './crud-admin/crud-admin.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [

    CrudAdminComponent,
       ModificarUsuarioComponent,
       RegistroUsuarioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ]
})
export class AdminModule { }
