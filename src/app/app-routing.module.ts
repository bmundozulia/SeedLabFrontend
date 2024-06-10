import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddAliadosComponent } from './super-admin/aliados/add-aliados/add-aliados.component';
import { AddEmpresaComponent } from './emprendedor/empresa/add-empresa/add-empresa.component';
import { AsesoriaAliadoComponent } from './aliados/asesoria-aliado/asesoria-aliado.component';
import { AsesoriasComponent } from './asesor/asesorias/asesorias.component';

import { BodyComponent } from './inicio/body/body.component';

import { EditEmpresaComponent } from './emprendedor/empresa/edit-empresa/edit-empresa.component';
import { EncuestaEmpresaComponent } from './emprendedor/formulario-diagnostico/encuesta-empresa.component';

import { FanPageComponent } from './aliados/fan-page/fan-page.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';

import { ListAliadosComponent } from './super-admin/aliados/list-aliados/list-aliados.component';
import { ListAsesoriaComponent } from './emprendedor/asesorias/list-asesoria/list-asesoria.component';
import { ListEmpresasComponent } from './emprendedor/empresa/list-empresas/list-empresas.component';
import { ListRutasComponent } from './super-admin/ruta/list-rutas/list-rutas.component';
import { LoginComponent } from './auth/login/login.component';

import { ModalComponent } from './super-admin/modal/modal.component';

import { PerfilEmprendedorComponent } from './emprendedor/perfil-emprendedor/perfil-emprendedor.component';
import { PersonalizacionesComponent } from './super-admin/personalizaciones/personalizaciones.component';

import { RegisterComponent } from './auth/register/register.component';
import { ReportesComponent } from './orientador/reportes/reportes.component'

import { SuperAdminComponent } from './super-admin/super-admin.component';

import { VerAsesoriasComponent } from './orientador/asesorias/list-asesorias/ver-asesorias.component';
import { EditEmpresaComponent } from './emprendedor/empresa/edit-empresa/edit-empresa.component';
import { RutasComponent } from './rutas/rutas.component';
import { OrientadorCrearComponent } from './orientador/orientador-crear/orientador-crear.component';


import { CursorutasComponent } from './cursorutas/cursorutas.component';
import { CrearSuperadminComponent } from './super-admin/crear-superadmin/crear-superadmin.component'
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { ListAsesoresComponent } from './aliados/asesores/list-asesores/list-asesores.component';
import { PerfilAsesorComponent } from './asesor/perfil-asesor/perfil-asesor.component';
import { PerfilAdminComponent } from './super-admin/perfil-admin/perfil-admin.component';
import { PerfilOrientadorComponent } from './orientador/perfil-orientador/perfil-orientador.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para LoginComponent
  { path: 'register', component: RegisterComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'forgotPassword', component: ForgotpasswordComponent}, //restablecer contraseña

  //Emprendedor
  { path: 'perfil', component: PerfilEmprendedorComponent },
  { path: 'list-asesoria', component: ListAsesoriaComponent }, //de emprendedor
  //Empresa
  { path: 'add-empresa', component: AddEmpresaComponent },
  { path: 'edit-empresa', component: EditEmpresaComponent},
  { path: 'encuesta', component: EncuestaEmpresaComponent },
  { path: 'list-empresa', component: ListEmpresasComponent },
  { path: 'edit-empresa', component: EditEmpresaComponent },
  { path: 'list-aliados', component: ListAliadosComponent },
  { path: 'list-rutas', component: ListRutasComponent },
  { path: 'modal-superadmin', component: ModalComponent },
  { path: 'personalizaciones', component: PersonalizacionesComponent },
  { path: 'list-rutas', component: ListRutasComponent },
  { path: 'add-ruta', component: SuperAdminComponent },
  { path: 'encuesta', component: EncuestaEmpresaComponent },
  { path: 'fan-page', component: FanPageComponent },
  { path: 'perfil-emprendedor', component: PerfilEmprendedorComponent },
  // orientador crear
  { path: 'list-orientador', component: OrientadorCrearComponent },

  // crear de superadmin
  { path: 'crear-superadmin', component: CrearSuperadminComponent },
  { path: 'perfil-admin', component: PerfilAdminComponent },


  // orientador  //reportes
  { path: 'add-aliados', component: AddAliadosComponent }, //de orientador
  { path: 'reportesOrientador', component: ReportesComponent },
  { path: 'rutas', component: RutasComponent },//de rutas
  { path: 'cursorutas', component: CursorutasComponent },//de curso rutas
  { path: 'list-asesoria', component: ListAsesoriaComponent }, //de emprendedor
  { path: 'asesorias', component: AsesoriasComponent },  //de asesor
  { path: 'ver-asesoria', component: VerAsesoriasComponent }, //de osesoria
  { path: 'add-aliados', component: AddAliadosComponent }, //de orientador
  { path: 'asesorias/aliado', component: AsesoriaAliadoComponent }, //de Aliado
  { path: 'perfil-orientador', component: PerfilOrientadorComponent}, //Perfil Orientador


  //ingreso de aliados 
  { path: 'list-asesores', component: ListAsesoresComponent },

  //ingreso de asesores
  { path: 'perfil-asesores', component: PerfilAsesorComponent },



  { path: '', component: BodyComponent }, // Ruta raíz que muestra BodyComponent
  { path: '**', redirectTo: '' } // Manejo de rutas no encontradas, redirige a la ruta raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
