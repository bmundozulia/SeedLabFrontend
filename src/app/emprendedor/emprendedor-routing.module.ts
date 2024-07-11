import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilEmprendedorComponent } from './pages/perfil-emprendedor/perfil-emprendedor.component';
import { ListAsesoriaEmprendedorComponent } from './pages/asesorias/list-asesoria/list-asesoria-emprendedor.component';
import { AddEmpresaComponent } from './pages/empresa/add-empresa/add-empresa.component';
import { ListEmpresasComponent } from './pages/empresa/list-empresas/list-empresas.component';
import { EncuestaEmpresaComponent } from './pages/formulario-diagnostico/encuesta-empresa.component';
import { RutaEmprendedorComponent } from './pages/ruta-emprendedor/ruta-emprendedor.component';
import { EditEmpresaComponent } from './pages/empresa/edit-empresa/edit-empresa.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {path: 'list-asesoria', component: ListAsesoriaEmprendedorComponent, data: {title: 'Asesorias', icon:'fa-solid fa-comments'}},
      {path: 'perfil-emprendedor', component: PerfilEmprendedorComponent, data:{title: 'Perfil', icon:'fa-solid fa-circle-user'}},
      {path: 'list-empresa', component: ListEmpresasComponent, data:{title: 'Empresa', icon:'fa-solid fa-building'}},
      {path: 'encuesta', component: EncuestaEmpresaComponent, data:{title: 'Encuesta', icon:'fa-solid fa-square-poll-vertical'}},
      {path: 'ruta', component: RutaEmprendedorComponent, data:{title: 'Ruta', icon:'fa-solid fa-location-arrow'}}
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class EmprendedorRoutingModule {
  static getRoutes(): Routes{
    return routes;
  }
 }
