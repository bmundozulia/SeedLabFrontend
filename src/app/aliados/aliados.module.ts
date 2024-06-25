import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAsesoresComponent } from './pages/list-asesores/list-asesores.component';
import { AsesoriaAliadoComponent } from './pages/list-asesorias/asesoria-aliado.component';
import { ModalAddAsesoresComponent } from './pages/modal-add-asesores/modal-add-asesores.component';
import { AsignarAsesorModalComponent } from './pages/asignar-asesor-modal/asignar-asesor-modal.component';
import { FanPageComponent } from './pages/fan-page/fan-page.component';
import { SharedModule } from '../shared.module';
import { AliadosRoutingModule } from './aliados-routing.module';


import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ListAsesoresComponent,
    AsesoriaAliadoComponent,
    ModalAddAsesoresComponent,
    AsignarAsesorModalComponent,
    FanPageComponent,
    
  ],
  imports: [
    CommonModule,
    AliadosRoutingModule,
    ReactiveFormsModule,
    FilterPipeModule,
    NgxPaginationModule,
    FormsModule,
    MatIconModule,
    SharedModule,
    FontAwesomeModule,
  ]
})
export class AliadosModule { }
