import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddEmpresaComponent } from './empresario/add-empresa/add-empresa.component';
import { VerificationComponent } from './verification/verification.component';
import { BodyComponent } from './inicio/body/body.component';
import { SuperAdminComponent } from './super-admin/super-admin.component'
import { ListEmpresasComponent } from './empresario/list-empresas/list-empresas.component';
import { PersonalizacionesComponent } from './personalizaciones/personalizaciones.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'empresario', component: AddEmpresaComponent },
  { path: 'list-empresa/:id', component: ListEmpresasComponent },
 
  { path: 'verification', component: VerificationComponent },
  { path: 'superAdmin', component: SuperAdminComponent },
  { path: 'personalizaciones', component: PersonalizacionesComponent },
  { path: 'login', component: LoginComponent }, // Ruta para LoginComponent
  { path: '', component: BodyComponent }, // Ruta raíz que muestra BodyComponent
  { path: '**', redirectTo: '' } // Manejo de rutas no encontradas, redirige a la ruta raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
