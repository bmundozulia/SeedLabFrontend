import { Component, OnInit, input } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../../Modelos/user.model';
import { HeaderComponent } from '../../../header/header.component';


@Component({
  selector: 'app-add-asesores',
  templateUrl: './add-asesores.component.html',
  styleUrl: './add-asesores.component.css',
  providers: [HeaderComponent]
})
export class AddAsesoresComponent implements OnInit {
  showPassword = faEye;

  hide = true;
  submitted = false;
  errorMessage: string | null = null;
  email: string;
  token = '';
  user: User | null = null;
  currentRolId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.validateToken();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        //this.documento = this.user.emprendedor.documento;
        this.currentRolId = this.user.id_rol?.toString();
        console.log(this.currentRolId);
      }
    }
  }

 



  passwordValidator(control: AbstractControl) {
    const value = control.value;
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    if (hasUpperCase && hasSpecialChar) {
      return null;
    } else {
      return { passwordStrength: 'La contraseña debe contener al menos una letra mayúscula y un carácter especial *' };
    }
  }

  //get f() { return this.registerForm.controls; }


}
