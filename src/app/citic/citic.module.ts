import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiticRoutingModule } from './citic-routing.module';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormulariologingComponent } from './components/formulariologing/formulariologing.component';


@NgModule({
  declarations: [
    CabeceraComponent,
    FooterComponent,
    FormulariologingComponent
  ],
  imports: [
    CommonModule,
    CiticRoutingModule,
  ],
  exports: [
    CabeceraComponent,
    FooterComponent,
    FormulariologingComponent
  ]
})
export class CiticModule { }
