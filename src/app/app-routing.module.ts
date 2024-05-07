import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddEmpresaComponent } from './empresario/add-empresa/add-empresa.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'empresario', component: AddEmpresaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
