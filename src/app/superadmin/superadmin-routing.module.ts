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
      { path: 'list-superadmin', component: ListSuperadminComponent, data: { title: 'Super Admin', icon:'fa-solid fa-user', showInMenu: true } },
      { path: 'perfil-admin', component: PerfilSuperadminComponent, data: { title: 'Perfil', icon:'fa-solid fa-circle-user', showInMenu: true } },
      { path: 'personalizaciones', component: PersonalizacionesComponent, data: { title: 'Personalización Sistema', icon:'fa-solid fa-paintbrush', showInMenu: true } },
      { path: 'list-ruta', component: ListRutasComponent, data: { title: 'Rutas', icon: 'fa-solid fa-location-arrow', showInMenu: true } },
      { path: 'list-orientador', component: ListOrientadorComponent, data: { title: 'Orientador', icon:'fa-solid fa-chalkboard-user', showInMenu: true } },
      { path: 'add-actividad', component: AddActividadComponent, data: { title: 'Actividad', icon:'fa-solid fa-table-list', showInMenu: false } },
      { path: 'list-aliados', component: ListAliadosComponent, data: { title: 'Aliados', icon: 'fa-solid fa-users-line', showInMenu: true } },
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
