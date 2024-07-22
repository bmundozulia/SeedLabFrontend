import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearAsesoriaModalComponent } from './pages/asesorias/crear-asesoria-modal/crear-asesoria-modal.component';
import { ListAsesoriaEmprendedorComponent } from './pages/asesorias/list-asesoria/list-asesoria-emprendedor.component';
import { AddEmpresaComponent } from './pages/empresa/add-empresa/add-empresa.component';
import { EditEmpresaComponent } from './pages/empresa/edit-empresa/edit-empresa.component';
import { ListEmpresasComponent } from './pages/empresa/list-empresas/list-empresas.component';
import { EncuestaEmpresaComponent } from './pages/formulario-diagnostico/encuesta-empresa.component';
import { RutaEmprendedorComponent } from './pages/ruta-emprendedor/ruta-emprendedor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PerfilEmprendedorComponent } from './pages/perfil-emprendedor/perfil-emprendedor.component';
import { EmprendedorRoutingModule } from './emprendedor-routing.module';
import { SharedModule } from '../shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';










@NgModule({
  declarations: [
    CrearAsesoriaModalComponent,
    ListAsesoriaEmprendedorComponent,
    AddEmpresaComponent,
    EditEmpresaComponent,
    ListEmpresasComponent,
    EncuestaEmpresaComponent,
    RutaEmprendedorComponent,
    PerfilEmprendedorComponent,
  ],
  imports: [
    CommonModule,
    EmprendedorRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule,
    NgxPaginationModule,
    RouterModule

  ]
})
export class EmprendedorModule { }
