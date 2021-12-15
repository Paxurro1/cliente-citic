import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiticRoutingModule } from './citic-routing.module';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormulariologingComponent } from './components/formulariologing/formulariologing.component';
import { FormularioregistroComponent } from './components/formularioregistro/formularioregistro.component';


@NgModule({
  declarations: [
    CabeceraComponent,
    FooterComponent,
    FormulariologingComponent,
    FormularioregistroComponent
  ],
  imports: [
    CommonModule,
    CiticRoutingModule,
  ],
  exports: [
    CabeceraComponent,
    FooterComponent,
<<<<<<< HEAD
    FormulariologingComponent
=======
    FormularioregistroComponent
>>>>>>> formulario-registro
  ]
})
export class CiticModule { }
