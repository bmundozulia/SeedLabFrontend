import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { SuperadminService } from '../../servicios/superadmin.service';
import { Superadmin } from '../../Modelos/superadmin.model';
import { User } from '../../Modelos/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';
import e from 'express';

@Component({
  selector: 'app-modalcrear-superadmin',
  templateUrl: './modalcrear-superadmin.component.html',
  styleUrl: './modalcrear-superadmin.component.css'
})
export class ModalcrearSuperadminComponent implements OnInit {
  @Input() isEditing: boolean = false
  submitted: boolean = false;
  token = "";
  user: User | null = null;
  id: number | null = null;
  currentRolId: string | null = null;
  adminId: any;
  hide = true;


  superadminForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    estado: true,

  })


  constructor(public dialogRef: MatDialogRef<ModalcrearSuperadminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private superadminService: SuperadminService) {
    this.adminId = data.adminId;
    console.log(' en el modal:', this.adminId);
  }

  ngOnInit(): void {
    this.validateToken();
    this.verEditar();
    if (this.adminId != null) {
      this.isEditing = true;
      this.superadminForm.get('password')?.setValidators([Validators.minLength(8)]);
    } else {
      this.superadminForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
    }

    this.superadminForm.get('password')?.updateValueAndValidity();
  }

  get f() { return this.superadminForm.controls; } //aquii

  cancelarcrerSuperadmin() {
    this.dialogRef.close();
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
    if (this.adminId != null) {
      this.superadminService.getInfoAdminxlista(this.token, this.adminId).subscribe(
        data => {
          this.superadminForm.patchValue({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.auth.email,
            password: ''
          });
          console.log("modalaaal", this.data)
        },
        error => {
          console.error(error);
        }
      )
    }
  }

  addSuperadmin(): void {
    this.submitted = true;
    const superadmin: Superadmin = {
      nombre: this.superadminForm.value.nombre,
      apellido: this.superadminForm.value.apellido,
      email: this.superadminForm.value.email,
      password: this.superadminForm.value.password,
      estado: this.superadminForm.value.estado,
    };
    if (this.adminId != null) {
      this.superadminService.updateAdmin(superadmin, this.token, this.adminId).subscribe(
        data => {
          //console.log("SIUUUU", data);
          location.reload();
        },
        error => {
          console.error(error);
        });
    } else {
      this.superadminService.createSuperadmin(this.token, superadmin).subscribe(
        data => {
          console.log("sin funciona el superadmin");
          location.reload()
        },
        error => {
          console.error('Error al crear el superadmin:', error);
        });
    }

  }
}
