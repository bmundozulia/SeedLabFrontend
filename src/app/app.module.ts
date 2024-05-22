import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MenuComponent } from './inicio/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './inicio/body/body.component';
import { AngularMaterialModule } from '../angular-material.module';
import { RegisterComponent } from './auth/register/register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './header/header.component';
import { EncuestaEmpresaComponent } from './emprendedor/formulario-diagnostico/encuesta-empresa.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { AddEmpresaComponent } from './emprendedor/empresa/add-empresa/add-empresa.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './auth/login/login.component';
import { MatSidenav } from '@angular/material/sidenav';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder,FormsModule, FormGroup} from '@angular/forms';
import { ListEmpresasComponent } from './emprendedor/empresa/list-empresas/list-empresas.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PersonalizacionesComponent } from './super-admin/personalizaciones/personalizaciones.component';
import { AsesoriasComponent } from './asesor/asesorias/asesorias.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ListAliadosComponent } from './super-admin/aliados/list-aliados/list-aliados.component';
import { FanPageComponent } from './aliados/fan-page/fan-page.component';
import { CrearAsesoriaModalComponent } from './emprendedor/asesorias/crear-asesoria-modal/crear-asesoria-modal.component';
import { ListAsesoriaComponent } from './emprendedor/asesorias/list-asesoria/list-asesoria.component';
import { VerAsesoriasComponent } from './orientador/asesorias/list-asesorias/ver-asesorias.component';
import { ModalComponent } from './super-admin/modal/modal.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AddAliadosComponent } from './super-admin/aliados/add-aliados/add-aliados.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    EncuestaEmpresaComponent,
    AddEmpresaComponent,
    LoginComponent,
    BodyComponent,
    ListEmpresasComponent,
    AsesoriasComponent,
    ListAliadosComponent,
    FanPageComponent,
    CrearAsesoriaModalComponent,
    ListAsesoriaComponent,
    VerAsesoriasComponent,
    PersonalizacionesComponent,
    ModalComponent,
    AddAliadosComponent,
    SuperAdminComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatIconModule,
    MatSidenav,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    ColorPickerModule,
    FilterPipeModule,
    MatDialogModule,
    
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
