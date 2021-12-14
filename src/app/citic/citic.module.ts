import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiticRoutingModule } from './citic-routing.module';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormulariologingComponent } from './components/formulariologing/formulariologing.component';
import { PrincipalComponent } from './components/principal/principal.component';


@NgModule({
  declarations: [
    CabeceraComponent,
    FooterComponent,
    FormulariologingComponent,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    CiticRoutingModule,
  ],
  exports: [
    CabeceraComponent,
    FooterComponent,
    PrincipalComponent
  ]
})
export class CiticModule { }
