import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListAsesoresComponent } from './pages/list-asesores/list-asesores.component';
import { AsesoriaAliadoComponent } from './pages/list-asesorias/asesoria-aliado.component';
import { FanPageComponent } from './pages/fan-page/fan-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'list-asesores', component:ListAsesoresComponent},
      {path: 'list-asesorias', component: AsesoriaAliadoComponent},
      {path: 'fan-page', component: FanPageComponent},
    ]
  }
];  

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes)
  ]
})
export class AliadosRoutingModule { }
