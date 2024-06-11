import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';

import { SwitchService } from '../../servicios/switch.service';
import { User } from '../../Modelos/user.model';

@Component({
  selector: 'app-crear-superadmin',
  templateUrl: './crear-superadmin.component.html',
  styleUrl: './crear-superadmin.component.css'
})
export class CrearSuperadminComponent implements OnInit {
  faPen = faPenToSquare;
  faPlus = faPlus;
  token: string | null = null;
  user: User | null = null;
  currentRolId: string | null = null;
  estado: boolean | null = null;
  id: number | null = null;

  modalCrearSuperadmin: boolean;
  isEditing: boolean;

  constructor(private modalCRSA: SwitchService) { }

  ngOnInit(): void {
    this.token;
    this.modalCRSA.$modalCrearSuperadmin.subscribe((valor) => { this.modalCrearSuperadmin = valor })
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      console.log(this.token);
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        this.currentRolId = this.user.id_rol?.toString();
        this.estado = this.user.estado;
        this.id = this.user.id;
        console.log(this.token);
      }
    }
  }

  openModalCrearSuperAdmin() {
    this.isEditing = false;
    this.modalCrearSuperadmin = true;
  }

  opneModalEditarSuperAdmin() {
    this.isEditing = true;
    this.modalCrearSuperadmin = true;
  }



}
