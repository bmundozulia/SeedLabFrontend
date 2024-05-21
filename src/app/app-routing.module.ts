import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddEmpresaComponent } from './empresario/add-empresa/add-empresa.component';
import { VerificationComponent } from './auth/verification/verification.component';
import { BodyComponent } from './inicio/body/body.component';
import { SuperAdminComponent } from './super-admin/super-admin.component'
import { ListEmpresasComponent } from './empresario/list-empresas/list-empresas.component';
import { PersonalizacionesComponent } from './personalizaciones/personalizaciones.component';
import { EncuestaEmpresaComponent } from './empresario/encuesta-empresa/encuesta-empresa.component';
import { ListAliadosComponent } from './aliados/list-aliados/list-aliados.component';
import { ListAsesoriaComponent } from './empresario/list-asesoria/list-asesoria.component';
import { AsesoriasComponent } from './asesor/asesorias/asesorias.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'empresario', component: AddEmpresaComponent },
  { path: 'list-empresa/:documento', component: ListEmpresasComponent },
  { path: 'personalizaciones', component: PersonalizacionesComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'superAdmin', component: SuperAdminComponent },
  { path: 'encuesta', component: EncuestaEmpresaComponent },
  { path: 'list-aliados', component: ListAliadosComponent },
  { path: 'login', component: LoginComponent }, // Ruta para LoginComponent
  { path: 'list-asesoria', component: ListAsesoriaComponent }, //de emprendedor
  { path: 'asesorias', component: AsesoriasComponent},  //de asesor
  
  { path: '', component: BodyComponent }, // Ruta raíz que muestra BodyComponent
  { path: '**', redirectTo: '' } // Manejo de rutas no encontradas, redirige a la ruta raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
