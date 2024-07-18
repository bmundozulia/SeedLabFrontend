import { Component } from '@angular/core';
import { User } from '../../../Modelos/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
token: string | null = null;
user: User = null;
id:number;
currentRolId:number = null;


validateToken():void{
  if(!this.token){
    this.token = localStorage.getItem('token');
    let identityJSON = localStorage.getItem('identity');

    if(identityJSON){
      let identity = JSON.parse(identityJSON);
      this.user = identity;
      this.id = this.user.id;
      this.currentRolId = this.user.id_rol;
      console.log(this.currentRolId);
      if(this.currentRolId != 1){
        
      }
    }
  }
}
}
