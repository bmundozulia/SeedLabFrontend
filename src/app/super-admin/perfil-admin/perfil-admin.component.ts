import { Component } from '@angular/core';
import { SuperadminService } from '../../servicios/superadmin.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../servicios/alert.service';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrl: './perfil-admin.component.css'
})
export class PerfilAdminComponent {

  perfiladminForm = this.fb.group({
    nombre:[''],
    apellido:[''],
    email:[''],
    //password:['']
  });

  constructor(
    private superadminService: SuperadminService,
    private router: Router,
    private fb : FormBuilder,
    private alertService: AlertService
  ) {
    

  }
}
