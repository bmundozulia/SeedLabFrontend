import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuperadminComponent } from './pages/list-superadmin/list-superadmin.component';
import { PerfilSuperadminComponent } from './pages/perfil-superadmin/perfil-superadmin.component';
import { PersonalizacionesComponent } from './pages/personalizaciones/personalizaciones.component';
import { ListRutasComponent } from './pages/ruta/list-ruta/list-rutas.component';
import { ListOrientadorComponent } from './pages/orientador/list-orientador/list-orientador.component';
import { AddActividadComponent } from './pages/ruta/add-actividad/add-actividad.component';
import { ModalAddNivelComponent } from './pages/ruta/modal-add-nivel/modal-add-nivel.component';

const routes: Routes = [ 
  {
    path:'',
    children:[
      {path: 'list-superadmin', component: ListSuperadminComponent},
      {path: 'perfil-admin', component: PerfilSuperadminComponent},
      {path: 'personalizaciones', component: PersonalizacionesComponent},
      {path: 'list-ruta', component: ListRutasComponent},
      {path: 'list-orientador', component: ListOrientadorComponent},
      {path: 'add-actividad', component: AddActividadComponent},
      {path:'add-nivel',component: ModalAddNivelComponent}
    ]
  }

 ];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes)
  ]
})
export class SuperadminRoutingModule { }
