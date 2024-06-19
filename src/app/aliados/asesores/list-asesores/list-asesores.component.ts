import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faEye, faMagnifyingGlass, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalAddAsesoresComponent } from '../modal-add-asesores/modal-add-asesores.component';
import { AsesorService } from '../../../servicios/asesor.service';
import { User } from '../../../Modelos/user.model';
import { Asesor } from '../../../Modelos/asesor.model';
import { AliadoService } from '../../../servicios/aliado.service';


@Component({
  selector: 'app-list-asesores',
  templateUrl: './list-asesores.component.html',
  styleUrl: './list-asesores.component.css',
  providers: [AsesorService, AliadoService]
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
  selectedAsesorId: number | null = null;

  userFilter: any = { nombre: '', estado: 'Activo' };

  constructor(
    private asesorService: AsesorService,
    public dialog: MatDialog,
    private router: Router,
    private aliadoService: AliadoService
  ) { }

  /* Inicializa con esas funciones al cargar la pagina */
  ngOnInit(): void {
    this.validateToken();
    this.cargarAsesores();
  }

  /* Valida el token del login */
  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.id = this.user.id;
      }
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }

  /* Funcion para mostrar las listas de los asesores y con el estado activo*/
  cargarAsesores() {
    if (this.token) {
      this.aliadoService.getinfoAsesor(this.token, this.user.id, this.userFilter.estado).subscribe(
        (data) => {
          this.listaAsesores = data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  /* Retorna los asesores dependiendo de su estado, normalmente en activo */
  onEstadoChange(): void {
    this.cargarAsesores();
  }

  /* Limpia el filtro de busqueda, volviendo a retornar los asesores activos */
  limpiarFiltro(): void {
    this.userFilter = { nombre: '', estado: 'Activo' };
    /* Opcional: recargar los aliados con el estado por defecto */
    this.cargarAsesores();
  }

  /* Abre modal enviando el id recogido del asesor para editar asesor*/
  openModal(asesorId: number | null): void {
    let dialogRef: MatDialogRef<ModalAddAsesoresComponent>;

    dialogRef = this.dialog.open(ModalAddAsesoresComponent, {
      data: { asesorId: asesorId }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  /* Abre modal enviando el id null para crear asesor */
  openModalSINId(): void {
    this.openModal(null); // Llama a openModalCONId con null
  }


}
