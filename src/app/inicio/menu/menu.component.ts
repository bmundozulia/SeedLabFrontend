import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isLeft = true;
  logueado = false;
  flag = false;
  token: string|null=null;

  toggleSlide() {
    this.isLeft = !this.isLeft;
  }

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.token==null){
      this.token=localStorage.getItem('token');
      this.logueado=this.token !== null;
    }
  }

  logout(){

    localStorage.clear();
    this.router.navigate(['/home/body']);
    this.logueado = false;
    window.location.reload();
  }
}

