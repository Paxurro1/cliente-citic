import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiticRoutingModule } from './citic-routing.module';
import { FormulariologingComponent } from './components/formulariologing/formulariologing.component';
import { FormularioregistroComponent } from './components/formularioregistro/formularioregistro.component';


@NgModule({
  declarations: [
    FormulariologingComponent,
    FormularioregistroComponent
  ],
  imports: [
    CommonModule,
    CiticRoutingModule,
  ],
  exports: [
    FormulariologingComponent,
    FormularioregistroComponent
  ]
})
export class CiticModule { }
