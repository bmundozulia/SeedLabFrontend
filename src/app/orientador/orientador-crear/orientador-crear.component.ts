import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEye, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalCrearOrientadorComponent } from './modal-crear-orientador/modal-crear-orientador.component';
import { OrientadorService } from '../../servicios/orientador.service';
import { Orientador } from '../../Modelos/orientador.model';
import { User } from '../../Modelos/user.model';

@Component({
  selector: 'app-orientador-crear',
  templateUrl: './orientador-crear.component.html',
  styleUrls: ['./orientador-crear.component.css'],
  providers: [OrientadorService]

})
export class OrientadorCrearComponent implements OnInit {
  userFilter: any = { nombre: '', estado_usuario: 'Activo' };
  faeye = faEye;
  falupa = faMagnifyingGlass;
  fax = faXmark;
  public page: number = 1; // Initialize page number
  listaOrientador: Orientador[] = [];
  token: string | null = null;
  user: User | null = null;
  currentRolId: number;
  faPen = faPenToSquare;
  faPlus = faPlus;
  modalCrearOrientador: boolean = false;
  isEditing: boolean = false;
  estado: boolean | null = null;
  id: number | null = null;
  selectedOrientadorId: number | null = null;
  boton: boolean;

  private ESTADO_MAP: { [key: string]: string } = {
    "true": 'Activo',
    "false": 'Inactivo'
  };


  constructor(
    private orientadorService: OrientadorService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.validateToken();
    this.cargarOrientador(1);
    this.nose();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');
      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.currentRolId = this.user.id_rol;
        console.log(this.currentRolId);
        if (this.currentRolId != 1 && this.currentRolId != 2) {
          this.router.navigate(['/inicio/body']);
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }

  cargarOrientador(estado: number): void {
    if (this.token) {
      this.orientadorService.mostrarOrientador(this.token, estado).subscribe(
        (data: any) => {
          this.listaOrientador = data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onEstadoChange(event: any): void {

    const estado = event.target.value;
    if (estado === 'Activo') {
      this.cargarOrientador(1);
    } else {
      this.cargarOrientador(0);
    }
  }

  limpiarFiltro(): void {
    this.userFilter = { nombre: '', estado_usuario: 'Activo' };
    this.cargarOrientador(1);
  }

  openModal(orientadorId: number | null): void {
    let dialogRef: MatDialogRef<ModalCrearOrientadorComponent>;

    dialogRef = this.dialog.open(ModalCrearOrientadorComponent, {
      data: { orientadorId: orientadorId }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openModalSINId(): void {
    this.openModal(null); // Llama a openModalCONId con null
  }

  buscarOrientadores(): Orientador[] {
    return this.listaOrientador.filter(orientador =>
      orientador.nombre.toLowerCase().includes(this.userFilter.nombre.toLowerCase()) ||
      orientador.apellido.toLowerCase().includes(this.userFilter.nombre.toLowerCase()) ||
      orientador.celular.includes(this.userFilter.nombre) ||
      orientador.email.toLowerCase().includes(this.userFilter.nombre.toLowerCase())
    );
  }

  nose(): void {
      this.boton = true;
  }
}

