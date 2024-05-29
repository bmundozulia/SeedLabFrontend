import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Modelos/user.model';

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

  toggleSlide() {
    this.isLeft = !this.isLeft;
  }

  constructor(private router: Router) { }

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
    this.logueado = this.token !== null;

    if (this.logueado && this.user) {
      this.currentRolId = this.user.id_rol?.toString();
      console.log(this.currentRolId);
    } else {
      console.log("No está logueado o no se pudo cargar el usuario.");
    }
  }



  logout() {
    localStorage.clear();
    this.router.navigate(['/home/body']);
    this.logueado = false;
  }
}

