import { Component, OnInit } from '@angular/core';
import { User } from '../../../Modelos/user.model';
import { AsesorService } from '../../../servicios/asesor.service';
import { Router } from '@angular/router';
import { Asesor } from '../../../Modelos/asesor.model';
import { AliadoService } from '../../../servicios/aliado.service';
import { faEye, faMagnifyingGlass, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddAsesoresComponent } from './modal-add-asesores/modal-add-asesores.component';
import { data } from 'jquery';

@Component({
  selector: 'app-list-asesores',
  templateUrl: './list-asesores.component.html',
  styleUrl: './list-asesores.component.css',
  providers: [AsesorService]
})
export class ListAsesoresComponent implements OnInit {
  asesor: Asesor[] = [];
  faPen = faPenToSquare;
  faeye = faEye;
  fax = faXmark;
  falupa = faMagnifyingGlass;
  public page!: number;
  token: string | null = null;
  user: User | null = null;
  currentRolId: string | null = null;
  estado: boolean | null = null;
  id: number | null = null;
  nombre: string | null = null;
  listaAsesores: Asesor[] = [];

  userFilter: any = { nombre: '', estado: 'Activo' };

  constructor(
    private asesorService: AsesorService,
    public dialog: MatDialog,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.validateToken();
    this.cargarAsesores();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      //console.log(this.token);
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        //console.log(identity);
        this.user = identity;
        this.currentRolId = this.user.id_rol?.toString();
        this.estado = this.user.estado;
        this.id = this.user.id;
        console.log(this.id);
      }
    }
  }

  cargarAsesores() {
    if (this.token) {
      this.asesorService.getinfoAsesor(this.token, this.user.id).subscribe(
        (data) => {
          this.listaAsesores = data;
          console.log(this.listaAsesores);
        },
        (err) => {
          console.log(err);
        }
      );
    }


  }

  onEstadoChange(event: any): void {
    const estado = event.target.value;
    this.cargarAsesores();
  }

  limpiarFiltro(): void {
    this.userFilter = { nombre: '', estado: 'Activo' };
    // Opcional: recargar los aliados con el estado por defecto
    this.cargarAsesores();
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalAddAsesoresComponent, {
      width: '600px',
      height: '600px',
      data: {  }
    });
    //console.log(data);

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

  editarAsesor(): void {
    this.openModal();
  }


}
