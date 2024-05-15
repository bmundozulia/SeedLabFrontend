import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MenuComponent } from './inicio/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './inicio/body/body.component';
import { AngularMaterialModule } from '../angular-material.module';
import { RegisterComponent } from './register/register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './header/header.component';
import { EncuestaEmpresaComponent } from './empresario/encuesta-empresa/encuesta-empresa.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { AddEmpresaComponent } from './empresario/add-empresa/add-empresa.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { MatSidenav } from '@angular/material/sidenav';
<<<<<<< HEAD
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ListEmpresasComponent } from './empresario/list-empresas/list-empresas.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PersonalizacionesComponent } from './personalizaciones/personalizaciones.component';

=======
>>>>>>> b403cec8c2c26c857b11aed8dd1478ae961c6d66



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    EncuestaEmpresaComponent,
    AddEmpresaComponent,
    NavegacionComponent,
    LoginComponent,
    BodyComponent,
<<<<<<< HEAD
    SuperAdminComponent,
    ListEmpresasComponent,
=======
>>>>>>> b403cec8c2c26c857b11aed8dd1478ae961c6d66
    
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
    
    AppRoutingModule,
    AngularMaterialModule,
    
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AppModule { }
