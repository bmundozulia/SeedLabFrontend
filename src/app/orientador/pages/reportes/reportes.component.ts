import { Component } from '@angular/core';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { User } from '../../../Modelos/user.model';



@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent {
  faPrint = faPrint;

  token = '';
  user: User | null = null;
  id: number | null = null;
  currentRolId: number;

  constructor(private router: Router){
  
  }

  ngOnInit(): void {
    this.validateToken();    
  }

  validateToken(): void {
    if(!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');
      
      if(identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.id = this.user.id;
        this.currentRolId = this.user.id_rol;
        if (this.currentRolId != 2) {
          this.router.navigate(['home']);
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['home']);
    }
  }
}
