import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    FooterComponent,
    CabeceraComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    FooterComponent,
    CabeceraComponent,
    NavbarComponent
  ]
})
export class CoreModule { }
