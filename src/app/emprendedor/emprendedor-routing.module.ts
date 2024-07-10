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
      {path: 'list-asesoria', component: ListAsesoriaEmprendedorComponent, data: {title: 'Asesorias'}},
      {path: 'perfil-emprendedor', component: PerfilEmprendedorComponent, data:{title: 'Perfil'}},
      {path: 'list-empresa', component: ListEmpresasComponent, data:{title: 'Empresa'}},
      {path: 'encuesta', component: EncuestaEmpresaComponent, data:{title: 'Encuesta'}},
      {path: 'ruta', component: RutaEmprendedorComponent, data:{title: 'Ruta'}}
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
