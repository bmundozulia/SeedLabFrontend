import { Injectable } from '@angular/core';
import { SuperadminRoutingModule } from '../superadmin/superadmin-routing.module';
import { OrientadorRoutingModule } from '../orientador/orientador-routing.module';
import { AliadosRoutingModule } from '../aliados/aliados-routing.module';
import { AsesorRoutingModule } from '../asesor/asesor-routing.module';
import { EmprendedorRoutingModule } from '../emprendedor/emprendedor-routing.module';
import { Route, Routes } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private roleRoutes = {
    SuperAdministrador: SuperadminRoutingModule.getRoutes(),
    Orientador: OrientadorRoutingModule.getRoutes(),
    Aliado: AliadosRoutingModule.getRoutes(),
    Asesor: AsesorRoutingModule.getRoutes(),
    Emprendedor: EmprendedorRoutingModule.getRoutes()
  }

  constructor() { }

  getRoutesByRole(role: string): any[] {
    const routes = this.roleRoutes[role] || [];
    return this.flattenRoutes(routes).filter(route => route.data?.showInMenu).map(route => ({
      name: route.data?.title,
      route: `/${route.path}`,
      icon: route.data?.icon,
    }));
  }

  private flattenRoutes(routes: Routes): Route[] {
    const flatRoutes: Route[] = [];
    routes.forEach(route => {
      if (route.children) {
        flatRoutes.push(...this.flattenRoutes(route.children));
      } else {
        flatRoutes.push(route);
      }
    });
    return flatRoutes;
  }

  
}
