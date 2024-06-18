import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass, faPenToSquare, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SwitchService } from '../../servicios/switch.service';
import { User } from '../../Modelos/user.model';
import { SuperAdminComponent } from '../super-admin.component';
import { SuperadminService } from '../../servicios/superadmin.service';
import { Superadmin } from '../../Modelos/superadmin.model';
import { error } from 'console';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalcrearSuperadminComponent } from '../modalcrear-superadmin/modalcrear-superadmin.component';

@Component({
  selector: 'app-crear-superadmin',
  templateUrl: './crear-superadmin.component.html',
  styleUrl: './crear-superadmin.component.css',
  providers: [SuperadminService]
})
export class CrearSuperadminComponent implements OnInit {
  faPen = faPenToSquare;
  fax = faXmark;
  falupa = faMagnifyingGlass;
  public page!: number;
  faPlus = faPlus;
  token: string | null = null;
  user: User | null = null;
  currentRolId: string | null = null;
  estado: boolean | null = null;
  id: number | null = null;
  listaAdmins: Superadmin[] = [];
  modalCrearSuperadmin: boolean;
  isEditing: boolean;

  userFilter: any = { nombre: '', estado: 'Activo' };

  constructor(private superAdminService: SuperadminService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.validateToken();
    this.cargarSuperAdmin();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      //console.log(this.token);
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        this.currentRolId = this.user.id_rol?.toString();
        this.estado = this.user.estado;
        this.id = this.user.id;
        console.log("estadooo", this.id);
      }
    }
  }

  openModal(adminId: number | null): void {
    let dialogRef: MatDialogRef<ModalcrearSuperadminComponent>;
    dialogRef = this.dialog.open(ModalcrearSuperadminComponent, {
      data: { adminId: adminId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
      this.cargarSuperAdmin();
    });
    console.log("para el modal", adminId);

  }


  openModalSINId(): void {
    this.openModal(null); // Llama con null
  }

  cargarSuperAdmin() {
    if (this.token) {
      this.superAdminService.getAdmins(this.token, this.userFilter.estado).subscribe(
        (data) => {
          this.listaAdmins = data;
          console.log("data", this.listaAdmins);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  limpiarFiltro(): void {
    this.userFilter = { nombre: '', estado: 'Activo' };
    this.cargarSuperAdmin();
  }

  onEstadoChange(): void {
    this.cargarSuperAdmin();
  }

}
