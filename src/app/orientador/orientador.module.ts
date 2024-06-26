import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerAsesoriasComponent } from './pages/asesorias/list-asesorias/ver-asesorias.component';
import { DarAliadoAsesoriaModalComponent } from './pages/asesorias/dar-aliado-asesoria-modal/dar-aliado-asesoria-modal.component';
import { PerfilOrientadorComponent } from './pages/perfil-orientador/perfil-orientador.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { OrientadorRoutingModule } from './orientador-routing.module';



@NgModule({
  declarations: [
    VerAsesoriasComponent,
    DarAliadoAsesoriaModalComponent,
    PerfilOrientadorComponent,
    ReportesComponent
  ],
  imports: [
    CommonModule,
    OrientadorRoutingModule
  ]
})
export class OrientadorModule { }
