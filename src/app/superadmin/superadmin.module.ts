import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAliadosComponent } from './pages/aliados/add-aliados/add-aliados.component';
import { ListAliadosComponent } from './pages/aliados/list-aliados/list-aliados.component';
import { AddOrientadorComponent } from './pages/orientador/add-orientador/add-orientador.component';
import { ListOrientadorComponent } from './pages/orientador/list-orientador/list-orientador.component';
import { ListSuperadminComponent } from './pages/list-superadmin/list-superadmin.component';
import { ModalCrearSuperadminComponent } from './pages/modal-crear-superadmin/modal-crear-superadmin.component';
import { PerfilSuperadminComponent } from './pages/perfil-superadmin/perfil-superadmin.component';
import { PersonalizacionesComponent } from './pages/personalizaciones/personalizaciones.component';
import { ListRutasComponent } from './pages/ruta/list-ruta/list-rutas.component';
import { ModalAddRutaComponent } from './pages/ruta/modal-add-ruta/modal-add-ruta.component';
import { AddActividadComponent } from './pages/ruta/add-actividad/add-actividad.component';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { ModalCrearOrientadorComponent } from './pages/orientador/modal-crear-orientador/modal-crear-orientador.component';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatIconModule } from '@angular/material/icon';
import { ModalAddNivelComponent } from './pages/ruta/modal-add-nivel/modal-add-nivel.component';









@NgModule({
  declarations: [
    AddAliadosComponent,
    ListAliadosComponent,
    AddOrientadorComponent,
    ListOrientadorComponent,
    ListSuperadminComponent,
    ModalCrearSuperadminComponent,
    PerfilSuperadminComponent,
    PersonalizacionesComponent,
    ListRutasComponent,
    ModalAddRutaComponent,
    AddActividadComponent,
    ModalCrearOrientadorComponent,
    ModalAddNivelComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    FilterPipeModule,
    FontAwesomeModule,
    SharedModule,
    ColorPickerModule,
    MatIconModule
  ]
})
export class SuperadminModule { }
