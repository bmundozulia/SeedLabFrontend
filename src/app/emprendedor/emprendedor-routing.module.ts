import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilEmprendedorComponent } from './pages/perfil-emprendedor/perfil-emprendedor.component';
import { ListAsesoriaEmprendedorComponent } from './pages/asesorias/list-asesoria/list-asesoria-emprendedor.component';
import { AddEmpresaComponent } from './pages/empresa/add-empresa/add-empresa.component';
import { ListEmpresasComponent } from './pages/empresa/list-empresas/list-empresas.component';
import { EncuestaEmpresaComponent } from './pages/formulario-diagnostico/encuesta-empresa.component';
import { RutaEmprendedorComponent } from './pages/ruta-emprendedor/ruta-emprendedor.component';
import { EditEmpresaComponent } from './pages/empresa/edit-empresa/edit-empresa.component';
import { CursorutasComponent } from '../ruta/cursorutas/cursorutas.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {path: 'list-asesoria', component: ListAsesoriaEmprendedorComponent, data: {title: 'Asesorias', showInMenu: true, icon:''}},
      {path: 'perfil-emprendedor', component: PerfilEmprendedorComponent, data:{title: 'Perfil', showInMenu: true, icon:'fa-solid fa-circle-user'}},
      {path: 'list-empresa', component: ListEmpresasComponent, data:{title: 'Empresa', showInMenu: true}},
      {path: 'encuesta', component: EncuestaEmpresaComponent, data:{title: 'Encuesta', showInMenu: true}},
      {path: 'ruta', component: CursorutasComponent, data:{title: 'Ruta', showInMenu: true}},
      {path: 'add-empresa', component: AddEmpresaComponent, data:{showInMenu: false}},
      {path: 'edit-empresa', component:EditEmpresaComponent, data:{showInMenu: false}}
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
