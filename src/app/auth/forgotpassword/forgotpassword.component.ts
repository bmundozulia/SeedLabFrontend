import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../servicios/alert.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
  providers: [AuthService, AlertService]
})
export class ForgotpasswordComponent {

  passwordForm = this.fb.group({
    email:['']
  });

  constructor(
    private forgotPasswordService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
  ){}


  password():void{
    const email = this.passwordForm.get('email')?.value;
    this.forgotPasswordService.forgotPassword(email).subscribe(
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