import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

import { User } from '../../Modelos/user.model';
import { AuthService } from '../../servicios/auth.service';
import { SuperadminRoutingModule } from '../../superadmin/superadmin-routing.module';
import { MenuService } from '../../servicios/menu.service';
import { SuperadminService } from '../../servicios/superadmin.service';

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
  colorPrincipal: string = '';
  colorSecundaria: string = '';

  

  toggleSlide() {
    this.isLeft = !this.isLeft;
  }

  constructor(private router: Router,
    private authservices: AuthService,
    private menuService: MenuService,
    private personalizacionService: SuperadminService
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
    console.log(this.menuItems);
    this.personalizacionService.getPersonalizacion().subscribe(
      data=>{
       this.colorPrincipal = data.color_principal;
       this.colorSecundaria = data.color_secundario;
        console.log(this.colorPrincipal, this.colorSecundaria);
      },
      err => console.log(err)
      );
    

  }


  logout() {
    if (this.token) {
      this.authservices.logout(this.token).subscribe(
        (data) => {
          console.log(data);
          this.handleLogout();
        },
        (err) => {
          console.log(err);
          this.handleLogout();
        }
      );
    } else {
      this.handleLogout();
    }
  }

  private handleLogout() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.router.navigate(['/home']);
  }

  
}

