import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuperadminComponent } from './pages/list-superadmin/list-superadmin.component';
import { PerfilSuperadminComponent } from './pages/perfil-superadmin/perfil-superadmin.component';
import { PersonalizacionesComponent } from './pages/personalizaciones/personalizaciones.component';
import { ListRutasComponent } from './pages/ruta/list-ruta/list-rutas.component';
import { ListOrientadorComponent } from './pages/orientador/list-orientador/list-orientador.component';
import { AddActividadComponent } from './pages/ruta/add-actividad/add-actividad.component';
import { ListAliadosComponent } from './pages/aliados/list-aliados/list-aliados.component';

const routes: Routes = [ 
  {
    path:'',
    children:[
      {path: 'list-superadmin', component: ListSuperadminComponent,data: { title: 'Super Admin'}},
      {path: 'perfil-admin', component: PerfilSuperadminComponent, data: { title: 'Perfil'}},
      {path: 'personalizaciones', component: PersonalizacionesComponent, data: { title: 'Personalizacion Sistema'}},
      {path: 'list-ruta', component: ListRutasComponent, data: {title: 'Rutas'}},
      {path: 'list-orientador', component: ListOrientadorComponent, data:{title: 'Orientador'}},
      {path: 'add-actividad', component: AddActividadComponent, data: {title: 'Actividad'}},
      {path: 'list-aliados', component: ListAliadosComponent, data: {title: 'Aliados'}},
    ]
  }
 ];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes)
  ]
})
export class SuperadminRoutingModule {
  static getRoutes(): Routes {
    return routes;
  }
 }
