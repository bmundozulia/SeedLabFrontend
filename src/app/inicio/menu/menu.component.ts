import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

import { User } from '../../Modelos/user.model';
import { AuthService } from '../../servicios/auth.service';
import { SuperadminRoutingModule } from '../../superadmin/superadmin-routing.module';
import { MenuService } from '../../servicios/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isLeft = true;
  logueado = false;
  flag = false;
  token: string | null = null;
  role: string | null = null;
  currentRolId: string | null = "";
  user: User | null = null;
  currentRolName: string | null = "";
  isAuthenticated: boolean = true;
  menuItems: any[] = [];

  toggleSlide() {
    this.isLeft = !this.isLeft;
  }

  constructor(private router: Router,
    private authservices: AuthService,
    private menuService: MenuService
  ) {
    
   }

  validateToken(): void {
    this.token = localStorage.getItem("token");

    if (this.token) {
      const identityJSON = localStorage.getItem('identity');
      if (identityJSON) {
        this.user = JSON.parse(identityJSON);
        this.currentRolName = localStorage.getItem('currentRolName');
        this.currentRolId = this.user.id_rol?.toString();
        console.log(this.currentRolName);
      }
    }
  }

  ngOnInit() {
    this.validateToken();
    this.isAuthenticated = this.authservices.isAuthenticated();
    this.logueado = this.token !== null;

    if (this.logueado && this.user) {
      this.currentRolId = this.user.id_rol?.toString();
      //console.log(this.currentRolId);
    } else {
      console.log("No está logueado o no se pudo cargar el usuario.");
    }
    this.menuItems = this.menuService.getRoutesByRole(this.currentRolName); 
  }



  logout() {
    if (this.token) {
      this.authservices.logout(this.token).subscribe(
        (data) => {
          console.log(data);
          localStorage.clear();
          this.isAuthenticated = false;
          this.router.navigate(['home']);
          location.reload();
        },
        (err) => {
          console.log(err);
          localStorage.clear();
          this.isAuthenticated = false;
          this.router.navigate(['home']);
          location.reload();
        }
      );
    } else {
      localStorage.clear();
      this.isAuthenticated = false;
      this.router.navigate(['home']);
    }
  }

  
}

