import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerAsesoriasComponent } from './pages/asesorias/list-asesorias/ver-asesorias.component';
import { DarAliadoAsesoriaModalComponent } from './pages/asesorias/dar-aliado-asesoria-modal/dar-aliado-asesoria-modal.component';
import { PerfilOrientadorComponent } from './pages/perfil-orientador/perfil-orientador.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { OrientadorRoutingModule } from './orientador-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    VerAsesoriasComponent,
    DarAliadoAsesoriaModalComponent,
    PerfilOrientadorComponent,
    ReportesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    OrientadorRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ]
})
export class OrientadorModule { }
