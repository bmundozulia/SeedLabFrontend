import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddEmpresaComponent } from './emprendedor/empresa/add-empresa/add-empresa.component';
import { VerificationComponent } from './auth/verification/verification.component';
import { BodyComponent } from './inicio/body/body.component';
import { ListEmpresasComponent } from './emprendedor/empresa/list-empresas/list-empresas.component';
import { PersonalizacionesComponent } from './super-admin/personalizaciones/personalizaciones.component';
import { EncuestaEmpresaComponent } from './emprendedor/formulario-diagnostico/encuesta-empresa.component';
import { ListAliadosComponent } from './super-admin/aliados/list-aliados/list-aliados.component';
import { FanPageComponent } from './aliados/fan-page/fan-page.component';
import { ListAsesoriaComponent } from './emprendedor/asesorias/list-asesoria/list-asesoria.component';
import { AsesoriasComponent } from './asesor/asesorias/asesorias.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { ModalComponent } from './super-admin/modal/modal.component';
import { AddAliadosComponent } from './super-admin/aliados/add-aliados/add-aliados.component';
import { ListRutasComponent } from './super-admin/ruta/list-rutas/list-rutas.component';
import { ReportesComponent } from './orientador/reportes/reportes.component'
import { AsesoriaAliadoComponent } from './aliados/asesoria-aliado/asesoria-aliado.component';import { PerfilEmprendedorComponent } from './emprendedor/perfil-emprendedor/perfil-emprendedor.component';

import { VerAsesoriasComponent } from './orientador/asesorias/list-asesorias/ver-asesorias.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para LoginComponent
  { path: 'register', component: RegisterComponent },
  { path: 'verification', component: VerificationComponent },

  { path: 'add-empresa', component: AddEmpresaComponent },
  { path: 'list-empresa', component: ListEmpresasComponent },
  { path: 'list-aliados', component: ListAliadosComponent },
  { path: 'modal-superadmin', component: ModalComponent },
  { path: 'personalizaciones', component: PersonalizacionesComponent },
  { path: 'list-rutas', component: ListRutasComponent },
  { path: 'add-ruta', component: SuperAdminComponent },
  { path: 'encuesta', component: EncuestaEmpresaComponent },
  { path: 'fan-page', component: FanPageComponent },
  { path: 'perfil', component: PerfilEmprendedorComponent },
  // orientador  //reportes
  { path: 'reportesOrientador', component: ReportesComponent },


  { path: 'list-asesoria', component: ListAsesoriaComponent }, //de emprendedor
  { path: 'asesorias', component: AsesoriasComponent },  //de asesor
  { path: 'ver-asesoria', component: VerAsesoriasComponent}, //de orientador
  { path: 'add-aliados', component: AddAliadosComponent }, //de orientador
  { path: 'asesorias/hola', component: AsesoriaAliadoComponent }, //de Aliado

  { path: '', component: BodyComponent }, // Ruta raíz que muestra BodyComponent
  { path: '**', redirectTo: '' } // Manejo de rutas no encontradas, redirige a la ruta raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
