import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { LoginService } from '../../servicios/login.service';
import {Router} from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Login } from '../../Modelos/login.modelo';
import { User } from '../../Modelos/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})

export class LoginComponent {
  hide = true;
  reply: Login | null = null;
  token: string | null = null;
  user: User | null = null;


  loginForm = this.fb.group({
    email: '',
    password: '',
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  
  ngOnInit(): void {

  }

  login(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.loginService.login(email, password).subscribe(
      (rs: any) => {
        this.reply = rs;
        if (this.reply) {
          //retorna la vista de emprendedor
          if (this.reply.user.id_rol == 5){
            localStorage.setItem('token', this.reply.access_token);
            localStorage.setItem('documento', this.reply.user.emprendedor.documento);
            this.router.navigate(['list-empresa/', this.reply.user.emprendedor.documento]);
          }
          //retorna la vista de superadmin
          if (this.reply.user.id_rol == 1){
            localStorage.setItem('token', this.reply.access_token);
            this.router.navigate(['list-aliados']);
          }
         // console.log(localStorage);
        }
      },
      err => {
        console.error(err);
      }
    );
  }

}



