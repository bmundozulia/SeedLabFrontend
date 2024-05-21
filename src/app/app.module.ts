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
import { EncuestaEmpresaComponent } from './empresario/encuesta-empresa/encuesta-empresa.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { AddEmpresaComponent } from './empresario/add-empresa/add-empresa.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './auth/login/login.component';
import { MatSidenav } from '@angular/material/sidenav';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup} from '@angular/forms';
import { ListEmpresasComponent } from './empresario/list-empresas/list-empresas.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PersonalizacionesComponent } from './personalizaciones/personalizaciones.component';
import { FormsModule } from '@angular/forms';
import { AsesoriasComponent } from './asesor/asesorias/asesorias.component';
//import { ColorPickerModule } from 'ngx-color-picker';
import { ListAliadosComponent } from './aliados/list-aliados/list-aliados.component';
import { FanPageComponent } from './aliados/fan-page/fan-page.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    EncuestaEmpresaComponent,
    AddEmpresaComponent,
    LoginComponent,
    BodyComponent,
    SuperAdminComponent,
    ListEmpresasComponent,
    AsesoriasComponent,
    ListAliadosComponent,
    SuperAdminComponent,
    FanPageComponent,


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

   
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AppModule { }
