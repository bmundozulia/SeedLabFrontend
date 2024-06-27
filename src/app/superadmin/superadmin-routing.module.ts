import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuperadminComponent } from './pages/list-superadmin/list-superadmin.component';
import { PerfilSuperadminComponent } from './pages/perfil-superadmin/perfil-superadmin.component';
import { PersonalizacionesComponent } from './pages/personalizaciones/personalizaciones.component';
import { ListRutasComponent } from './pages/ruta/list-ruta/list-rutas.component';
import { ListOrientadorComponent } from './pages/orientador/list-orientador/list-orientador.component';

const routes: Routes = [ 
  {
    path:'',
    children:[
      {path: 'list-superadmin', component: ListSuperadminComponent},
      {path: 'perfil-admin', component: PerfilSuperadminComponent},
      {path: 'personalizaciones', component: PersonalizacionesComponent},
      {path: 'list-ruta', component: ListRutasComponent},
      {path: 'list-orientador', component: ListOrientadorComponent},
    ]
  }
 ];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ]
})
export class SuperadminRoutingModule { }
