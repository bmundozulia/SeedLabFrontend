import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearAsesoriaModalComponent } from './pages/asesorias/crear-asesoria-modal/crear-asesoria-modal.component';
import { ListAsesoriaEmprendedorComponent } from './pages/asesorias/list-asesoria/list-asesoria-emprendedor.component';
import { AddEmpresaComponent } from './pages/empresa/add-empresa/add-empresa.component';
import { EditEmpresaComponent } from './pages/empresa/edit-empresa/edit-empresa.component';
import { ListEmpresasComponent } from './pages/empresa/list-empresas/list-empresas.component';
import { EncuestaEmpresaComponent } from './pages/formulario-diagnostico/encuesta-empresa.component';
import { RutaEmprendedorComponent } from './pages/ruta-emprendedor/ruta-emprendedor.component';



@NgModule({
  declarations: [
    CrearAsesoriaModalComponent,
    ListAsesoriaEmprendedorComponent,
    AddEmpresaComponent,
    EditEmpresaComponent,
    ListEmpresasComponent,
    EncuestaEmpresaComponent,
    RutaEmprendedorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmprendedorModule { }
