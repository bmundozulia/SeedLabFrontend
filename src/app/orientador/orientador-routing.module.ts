import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerAsesoriasComponent } from './pages/asesorias/list-asesorias/ver-asesorias.component';
import { PerfilOrientadorComponent } from './pages/perfil-orientador/perfil-orientador.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path: 'list-asesorias', component: VerAsesoriasComponent, data:{title: 'Asesorias' }},
      {path: 'perfil-orientador', component: PerfilOrientadorComponent, data: { title: 'Perfil'}},
      {path: 'reportes', component: ReportesComponent, data:{title: 'Reportes'}}
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class OrientadorRoutingModule {
  static getRoutes(): Routes{
    return routes;
  }
 }
