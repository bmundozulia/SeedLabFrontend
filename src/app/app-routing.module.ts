import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddAliadosComponent } from './super-admin/aliados/add-aliados/add-aliados.component';
import { BodyComponent } from './inicio/body/body.component';
import { CursorutasComponent } from './ruta/cursorutas/cursorutas.component';
import { CrearSuperadminComponent } from './super-admin/crear-superadmin/crear-superadmin.component'
import { ListAliadosComponent } from './super-admin/aliados/list-aliados/list-aliados.component';
import { ModalComponent } from './super-admin/modal/modal.component';
//import { OrientadorCrearComponent } from './orientador/orientador-crear/orientador-crear.component';
import { PerfilAdminComponent } from './super-admin/perfil-admin/perfil-admin.component';
import { PersonalizacionesComponent } from './super-admin/personalizaciones/personalizaciones.component';
import { RutasComponent } from './ruta/rutas/rutas.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';



const routes: Routes = [
  //Auth
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  //Aliados
  {
    path: 'aliados',
    loadChildren: () => import('./aliados/aliados.module').then(m => m.AliadosModule)
  },

  //Asesor
  {
    path: 'asesor',
    loadChildren: () => import('./asesor/asesor.module').then(m => m.AsesorModule)
  },

  //Emprendedor y empresa
  {
    path: 'emprendedor',
    loadChildren: () => import('./emprendedor/emprendedor.module').then(m => m.EmprendedorModule)
  },

  {
    path: 'orientador',
    loadChildren: () => import('./orientador/orientador.module').then(m => m.OrientadorModule)
  },

  // SuperAdmin
  { path: 'add-ruta', component: SuperAdminComponent },
  { path: 'list-aliados', component: ListAliadosComponent },
  //{ path: 'list-orientador', component: OrientadorCrearComponent },
  { path: 'crear-superadmin', component: CrearSuperadminComponent },
  { path: 'modal-superadmin', component: ModalComponent },
  { path: 'perfil-admin', component: PerfilAdminComponent },
  { path: 'personalizaciones', component: PersonalizacionesComponent },





 



  { path: 'home', component: BodyComponent }, // Ruta raíz que muestra BodyComponent
  { path: '**', redirectTo: 'error404', pathMatch: 'full' } // Manejo de rutas no encontradas, redirige a la ruta raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
