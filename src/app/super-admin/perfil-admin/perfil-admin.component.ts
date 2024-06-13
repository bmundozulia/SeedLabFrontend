import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../servicios/alert.service';
import { SuperadminService } from '../../servicios/superadmin.service';

import { Superadmin } from '../../Modelos/superadmin.model';
import { User } from '../../Modelos/user.model';
import { faEnvelope, faMobileAlt, faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent {
  // iconos
  faEnvelope = faEnvelope;
  faMobileAlt = faMobileAlt;
  faUser = faUser;

  token = '';
  blockedInputs = true;
  user: User | null = null;
  currentRolId: string | null = null;
  id: number;
  boton: boolean;
  hide = true

  perfiladminForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(10), this.passwordValidator]],
    estado: true,
  });

  constructor(
    private superadminService: SuperadminService,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.validateToken();
    this.verEditar();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        this.id = this.user.id;
        this.currentRolId = this.user.id_rol?.toString();
        console.log(this.currentRolId);
      }
    }
  }

  verEditar(): void {
    if (this.token) {
      this.superadminService.getInfoAdmin(this.token, this.id).subscribe(
        (data) => {
          this.perfiladminForm.patchValue({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            password: data.password
          });
          console.log(data);

        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  updateAdministrador(): void {
    const perfil: Superadmin = {
      nombre: this.perfiladminForm.get('nombre')?.value,
      apellido: this.perfiladminForm.get('apellido')?.value,
      email: this.perfiladminForm.get('email')?.value,
      password: this.perfiladminForm.get('password')?.value,
      estado: this.perfiladminForm.get('estado')?.value,
    }
    this.superadminService.updateAdmin(perfil, this.token, this.id).subscribe(
      (data) => {
        location.reload();
      },
      (err) => {
        console.log(err);
      }
    )
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

  toggleInputsLock(): void {
    this.blockedInputs = !this.blockedInputs;
    const fieldsToToggle = ['nombre', 'apellido', 'email', 'password'];
    fieldsToToggle.forEach(field => {
      const control = this.perfiladminForm.get(field);
      if (this.blockedInputs) {
        control.disable();
      } else {
        control.enable();
      }
    })
  }

  // Restaura los datos originales
  onCancel(): void {
    this.verEditar();
  }

  mostrarGuardarCambios(): void {
    this.boton = false;
  }
}