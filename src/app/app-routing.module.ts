import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddEmpresaComponent } from './empresario/add-empresa/add-empresa.component';
import { NavegacionComponent } from './navegacion/navegacion.component'
import { VerificationComponent } from './verification/verification.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'empresario', component: AddEmpresaComponent },
  { path: 'navegacion', component: NavegacionComponent },
  { path: 'verification', component: VerificationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
