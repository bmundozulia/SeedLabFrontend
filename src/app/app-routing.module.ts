import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
=======
import { AddEmpresaComponent } from './empresario/add-empresa/add-empresa.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'empresario', component: AddEmpresaComponent }
>>>>>>> 20def69b0857d40d75feaa338e53bde9896b728a
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
