import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEye, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import { ModalCrearOrientadorComponent } from './modal-crear-orientador/modal-crear-orientador.component';

import { OrientadorService } from '../../servicios/orientador.service';
import { SwitchService } from '../../servicios/switch.service';

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
  currentRolId: string | null = null; // Initialize currentRolId
  faPen = faPenToSquare;
  faPlus = faPlus;
  modalCrearOrientador: boolean = false;
  isEditing: boolean = false;
  estado: boolean | null = null;
  id: number | null = null;
  selectedOrientadorId: number | null = null;

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
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        this.currentRolId = this.user.id_rol?.toString();
        this.estado = this.user.estado;
        this.id = this.user.id;
        console.log(this.id);
      }
    }
  }

  cargarOrientador(estado: number): void {
    if (this.token) {
      this.orientadorService.mostrarOrientador(this.token, estado).subscribe(
        (data: any) => {
          console.log("data",data); // Debug log
          this.listaOrientador = data;
        console.log(this.listaOrientador);
      },
      (err) => {
        console.log(err);
      }
    );
  } else {
    console.error('Token is not available');
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

  openModal(orientadorId:number | null): void {
    let dialogRef:MatDialogRef<ModalCrearOrientadorComponent>;

    dialogRef = this.dialog.open(ModalCrearOrientadorComponent, {
      data: { orientadorId: orientadorId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }
  openModalCrearOrientador(): void {
    this.isEditing = false;
    this.modalCrearOrientador = true;
  }

  openModalSINId(): void {
    this.openModal(null); // Llama a openModalCONId con null
  }

  openModalEditarOrientador(orientadorId: number): void {
    this.selectedOrientadorId = orientadorId;
    this.openModal(this.selectedOrientadorId);
    console.log(`para el modal: ${this.selectedOrientadorId}`);

    // this.isEditing = true;
    // this.modalCrearOrientador = true;
  }
  buscarOrientadores(): Orientador[] {
    return this.listaOrientador.filter(orientador =>
      orientador.nombre.toLowerCase().includes(this.userFilter.nombre.toLowerCase()) ||
      orientador.apellido.toLowerCase().includes(this.userFilter.nombre.toLowerCase()) ||
      orientador.celular.includes(this.userFilter.nombre) ||
      orientador.email.toLowerCase().includes(this.userFilter.nombre.toLowerCase())
    );
  }
}

