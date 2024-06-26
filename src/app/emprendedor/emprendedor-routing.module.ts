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
      {path: 'perfil', component: PerfilEmprendedorComponent},
      {path: 'list-asesoria', component: ListAsesoriaEmprendedorComponent},
      {path: 'perfil-emprendedor', component: PerfilEmprendedorComponent},
      {path: 'add-empresa', component: AddEmpresaComponent},
      {path: 'edit-empresa', component: EditEmpresaComponent},
      {path: 'list-empresa', component: ListEmpresasComponent},
      {path: 'encuesta', component: EncuestaEmpresaComponent},
      {path: 'ruta', component: RutaEmprendedorComponent}
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class EmprendedorRoutingModule { }
