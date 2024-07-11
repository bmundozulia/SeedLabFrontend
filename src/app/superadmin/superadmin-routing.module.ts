import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuperadminComponent } from './pages/list-superadmin/list-superadmin.component';
import { PerfilSuperadminComponent } from './pages/perfil-superadmin/perfil-superadmin.component';
import { PersonalizacionesComponent } from './pages/personalizaciones/personalizaciones.component';
import { ListRutasComponent } from './pages/ruta/list-ruta/list-rutas.component';
import { ListOrientadorComponent } from './pages/orientador/list-orientador/list-orientador.component';
import { AddActividadComponent } from './pages/ruta/add-actividad/add-actividad.component';
import { ListAliadosComponent } from './pages/aliados/list-aliados/list-aliados.component';
import { AddAliadosComponent } from './pages/aliados/add-aliados/add-aliados.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list-superadmin', component: ListSuperadminComponent, data: { title: 'Super Admin', showInMenu: true } },
      { path: 'perfil-admin', component: PerfilSuperadminComponent, data: { title: 'Perfil', showInMenu: true } },
      { path: 'personalizaciones', component: PersonalizacionesComponent, data: { title: 'Personalizacion Sistema', showInMenu: true } },
      { path: 'list-ruta', component: ListRutasComponent, data: { title: 'Rutas', showInMenu: true } },
      { path: 'list-orientador', component: ListOrientadorComponent, data: { title: 'Orientador', showInMenu: true } },
      { path: 'add-actividad', component: AddActividadComponent, data: { title: 'Actividad', showInMenu: false } },
      { path: 'list-aliados', component: ListAliadosComponent, data: { title: 'Aliados', showInMenu: true } },
      { path: 'add-aliados', component: AddAliadosComponent, data: { showInMenu: false } },
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class SuperadminRoutingModule {
  static getRoutes(): Routes {
    return routes;
  }
}
