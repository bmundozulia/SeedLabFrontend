import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilAsesorComponent } from './pages/perfil-asesor/perfil-asesor.component';
import { AsesoriasComponent } from './pages/asesorias/asesorias.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {path: 'perfil-asesores', component: PerfilAsesorComponent, data:{title: 'Perfil'}},
      {path: 'asesorias', component: AsesoriasComponent, data:{title: 'Asesorias', icon:'fa-solid fa-users-gear'}}

    ]
  }
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AsesorRoutingModule {
  static getRoutes(): Routes{
    return routes;
  }
 }
