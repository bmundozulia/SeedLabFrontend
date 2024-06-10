import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

import { SuperadminService } from '../../servicios/superadmin.service';
import { SwitchService } from '../../servicios/switch.service'

import { Superadmin } from '../../Modelos/superadmin.model';
import { User } from '../../Modelos/user.model';

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



  superadminForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]],
    estado: '1',

  })


  constructor(private modalCRSA: SwitchService, private fb: FormBuilder, private superadminService: SuperadminService) { }

  ngOnInit(): void {
    this.validateToken();

  }


  cancelarcrerSuperadmin() {
    this.modalCRSA.$modalCrearSuperadmin.emit(false);
  }

  crearSuperadmin(formularioCrear: NgForm) {
    this.submitted = true;

    if (formularioCrear.valid) {
      this.modalCRSA.$modalCrearSuperadmin.emit(false);
    }
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


  addSuperadmin(): void {
    this.submitted = true;
    const superadmin: Superadmin = {
      nombre: this.superadminForm.value.nombre,
      apellido: this.superadminForm.value.apellido,
      email: this.superadminForm.value.email,
      password: this.superadminForm.value.password,
      estado: this.superadminForm.value.estado,
    }
    this.superadminService.createSuperadmin(this.token, superadmin).subscribe(
      data => {
        console.log("sin funciona el superadmin");
        location.reload()
      },
      error => {
        console.error('Error al crear el superadmin:', error);
      }
    )
  }
}
