import { Component, OnInit  } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule  } from '@angular/common';
import { User } from '../Modelos/user.model';
import { Login } from '../Modelos/login.modelo';
import { LoginService } from '../servicios/login.service';
import {Router} from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

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
    console.log(this.loginForm.get('email')?.value);
    console.log(this.loginForm.get('password')?.value);
    this.loginService.login(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value
    ).subscribe(
      (rs:any) => {
        this.reply = rs;
        console.log(this.reply);
        this.router.navigate(['/empresario']);
      },);
  }

  }



