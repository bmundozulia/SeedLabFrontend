import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilAsesorComponent } from './pages/perfil-asesor/perfil-asesor.component';
import { AsesoriasComponent } from './pages/asesorias/asesorias.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {path: 'perfil-asesores', component: PerfilAsesorComponent},
      {path: 'asesorias', component: AsesoriasComponent}

    ]
  }
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AsesorRoutingModule { }
