import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerAsesoriasComponent } from './pages/asesorias/list-asesorias/ver-asesorias.component';
import { PerfilOrientadorComponent } from './pages/perfil-orientador/perfil-orientador.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path: 'list-asesorias', component: VerAsesoriasComponent},
      {path: 'perfil-orientador', component: PerfilOrientadorComponent},
      {path: 'reportes', component: ReportesComponent}
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class OrientadorRoutingModule { }
