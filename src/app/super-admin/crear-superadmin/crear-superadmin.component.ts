import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass, faPenToSquare, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../Modelos/user.model';
import { SuperadminService } from '../../servicios/superadmin.service';
import { Superadmin } from '../../Modelos/superadmin.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalcrearSuperadminComponent } from '../modalcrear-superadmin/modalcrear-superadmin.component';
import { Router } from '@angular/router';
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
    private router: Router,
  ) { }

  /* Inicializa con esas funciones al cargar la pagina */
  ngOnInit(): void {
    this.validateToken();
    this.cargarSuperAdmin();
  }

  /* Valida el token del login */
  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }

  /* Abre modal enviando el id del admin para editarlo */
  openModal(adminId: number | null): void {
    let dialogRef: MatDialogRef<ModalcrearSuperadminComponent>;
    dialogRef = this.dialog.open(ModalcrearSuperadminComponent, {
      data: { adminId: adminId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarSuperAdmin();
    });
  }

  /* Abre el modal con el id nulo */
  openModalSINId(): void {
    this.openModal(null);
  }

  /* Funcion para mostrar las listas de los super admins y con el estado activo*/
  cargarSuperAdmin() {
    if (this.token) {
      this.superAdminService.getAdmins(this.token, this.userFilter.estado).subscribe(
        (data) => {
          this.listaAdmins = data;
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  /* Limpia el filtro de busqueda, volviendo a retornar los aliados activos */
  limpiarFiltro(): void {
    this.userFilter = { nombre: '', estado: 'Activo' };
    this.cargarSuperAdmin();
  }

  /* Retorna los super admins dependiendo del esyado */
  onEstadoChange(): void {
    this.cargarSuperAdmin();
  }

}
