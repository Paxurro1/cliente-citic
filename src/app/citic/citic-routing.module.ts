import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulariologingComponent } from './components/formulariologing/formulariologing.component';
import { FormularioregistroComponent } from './components/formularioregistro/formularioregistro.component';

const routes: Routes = [
  {
    path: 'registro',
    component: FormularioregistroComponent
  },
  {
    path: 'login',
    component: FormulariologingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiticRoutingModule { }
