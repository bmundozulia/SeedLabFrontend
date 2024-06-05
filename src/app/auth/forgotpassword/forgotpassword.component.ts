import { Component } from '@angular/core';
import { LoginService } from '../../servicios/login.service';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../servicios/alert.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
  providers: [LoginService, AlertService]
})
export class ForgotpasswordComponent {

  passwordForm = this.fb.group({
    email:['']
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
  ){}


  password():void{
    const email = this.passwordForm.get('email')?.value;
    this.loginService.forgotPassword(email).subscribe(
      (response:any) => {
        this.alertService.successAlert('Éxito', response.message);
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    )
  }
}
//this.router.navigate(['/login']);