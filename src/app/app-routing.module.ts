import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddAliadosComponent } from './super-admin/aliados/add-aliados/add-aliados.component';
import { AddEmpresaComponent } from './emprendedor/empresa/add-empresa/add-empresa.component';
import { AsesoriaAliadoComponent } from './aliados/asesoria-aliado/list-asesorias/asesoria-aliado.component';
import { AsesoriasComponent } from './asesor/asesorias/asesorias.component';

import { BodyComponent } from './inicio/body/body.component';

import { CursorutasComponent } from './cursorutas/cursorutas.component';
import { CrearSuperadminComponent } from './super-admin/crear-superadmin/crear-superadmin.component'

import { EditEmpresaComponent } from './emprendedor/empresa/edit-empresa/edit-empresa.component';
import { EncuestaEmpresaComponent } from './emprendedor/formulario-diagnostico/encuesta-empresa.component';

import { FanPageComponent } from './aliados/fan-page/fan-page.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';

import { ListAliadosComponent } from './super-admin/aliados/list-aliados/list-aliados.component';
import { ListAsesoriaComponent } from './emprendedor/asesorias/list-asesoria/list-asesoria.component';
import { ListAsesoresComponent } from './aliados/asesores/list-asesores/list-asesores.component';
import { ListEmpresasComponent } from './emprendedor/empresa/list-empresas/list-empresas.component';
import { ListRutasComponent } from './super-admin/ruta/list-rutas/list-rutas.component';
import { LoginComponent } from './auth/login/login.component';

import { ModalComponent } from './super-admin/modal/modal.component';

import { OrientadorCrearComponent } from './orientador/orientador-crear/orientador-crear.component';

import { PerfilAdminComponent } from './super-admin/perfil-admin/perfil-admin.component';
import { PerfilAsesorComponent } from './asesor/perfil-asesor/perfil-asesor.component';
import { PerfilEmprendedorComponent } from './emprendedor/perfil-emprendedor/perfil-emprendedor.component';
import { PerfilOrientadorComponent } from './orientador/perfil-orientador/perfil-orientador.component';
import { PersonalizacionesComponent } from './super-admin/personalizaciones/personalizaciones.component';

import { RegisterComponent } from './auth/register/register.component';
import { ReportesComponent } from './orientador/reportes/reportes.component'
import { RutasComponent } from './rutas/rutas.component';

import { SuperAdminComponent } from './super-admin/super-admin.component';

import { VerAsesoriasComponent } from './orientador/asesorias/list-asesorias/ver-asesorias.component';
import { VerificationComponent } from './auth/verification/verification.component';


const routes: Routes = [
  //Auth
  { path: 'login', component: LoginComponent }, // Ruta para LoginComponent
  { path: 'register', component: RegisterComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'forgotPassword', component: ForgotpasswordComponent}, //restablecer contraseña

  //Emprendedor
  { path: 'perfil', component: PerfilEmprendedorComponent },
  { path: 'list-asesoria', component: ListAsesoriaComponent }, //de emprendedor
  { path: 'perfil-emprendedor', component: PerfilEmprendedorComponent },
  { path: 'add-empresa', component: AddEmpresaComponent },
  { path: 'list-asesoria', component: ListAsesoriaComponent }, //de emprendedor

  //Empresa
  { path: 'edit-empresa', component: EditEmpresaComponent},
  { path: 'encuesta', component: EncuestaEmpresaComponent },
  { path: 'list-empresa', component: ListEmpresasComponent },
  { path: 'list-rutas', component: ListRutasComponent },
  { path: 'fan-page', component: FanPageComponent },
  
  // SuperAdmin
  { path: 'add-ruta', component: SuperAdminComponent },
  { path: 'list-aliados', component: ListAliadosComponent },
  { path: 'list-orientador', component: OrientadorCrearComponent },
  { path: 'crear-superadmin', component: CrearSuperadminComponent },
  { path: 'modal-superadmin', component: ModalComponent },
  { path: 'perfil-admin', component: PerfilAdminComponent },
  { path: 'personalizaciones', component: PersonalizacionesComponent },


  // Orientador  
  { path: 'add-aliados', component: AddAliadosComponent }, //de orientador
  { path: 'reportesOrientador', component: ReportesComponent },
  { path: 'rutas', component: RutasComponent },//de rutas
  { path: 'cursoRutas', component: CursorutasComponent },//de curso rutas
  { path: 'ver-asesoria', component: VerAsesoriasComponent }, //de osesoria
  { path: 'perfil-orientador', component: PerfilOrientadorComponent}, //Perfil Orientador
  
  
  //Aliados 
  { path: 'list-asesores', component: ListAsesoresComponent },
  { path: 'asesorias/aliado', component: AsesoriaAliadoComponent }, //de Aliado
  
  //Asesores
  { path: 'perfil-asesores', component: PerfilAsesorComponent },
  { path: 'asesorias', component: AsesoriasComponent },  //de asesor



  { path: '', component: BodyComponent }, // Ruta raíz que muestra BodyComponent
  { path: '**', redirectTo: '' } // Manejo de rutas no encontradas, redirige a la ruta raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
