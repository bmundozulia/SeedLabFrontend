import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../Modelos/user.model';
import { AuthService } from '../../servicios/auth.service';

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

  toggleSlide() {
    this.isLeft = !this.isLeft;
  }

  constructor(private router: Router,
    private authservices: AuthService
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
  }


  logout() {
    if (this.token) {
      this.authservices.logout(this.token).subscribe(
        (data) => {
          console.log(data);
          localStorage.clear();
          this.isAuthenticated = false;
          this.router.navigate(['/home/body']);
          location.reload();
        },
        (err) => {
          console.log(err);
          localStorage.clear();
          this.isAuthenticated = false;
          this.router.navigate(['/home/body']);
        }
      );
    } else {
      localStorage.clear();
      this.isAuthenticated = false;
      this.router.navigate(['/home/body']);
    }
  }

  
}

