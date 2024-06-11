import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SwitchService } from '../../servicios/switch.service';
import { faEye, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Orientador } from '../../Modelos/orientador.model';
import { User } from '../../Modelos/user.model';
import { OrientadorService } from '../../servicios/orientador.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orientador-crear',
  templateUrl: './orientador-crear.component.html',
  styleUrls: ['./orientador-crear.component.css']
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
  currentRolId: number = 0; // Initialize currentRolId
  faPen = faPenToSquare;
  faPlus = faPlus;
  modalCrearOrientador: boolean = false;
  isEditing: boolean = false;

  private ESTADO_MAP: { [key: number]: string } = {
    1: 'Activo',
    0: 'Inactivo'
  };

  constructor(private modalCRO: SwitchService, private orientadorService: OrientadorService, private router: Router, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.validateToken();
    this.cargarOrientador(1); 
    this.modalCRO.$modalCrearOrientador.subscribe((valor) => { this.modalCrearOrientador = valor });
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        this.currentRolId = this.user.id_rol;
        console.log(this.currentRolId);
      }
    }
  }

  cargarOrientador(estado: number): void {
    if (this.token) {
      this.orientadorService.mostrarOrientador(this.token, estado).subscribe(
        (data: any) => {
          console.log(data); // Debug log
          this.listaOrientador = data.map((item: any) =>
            new Orientador(
              item.id,
              item.nombre,
              item.apellido,
              item.celular,
              item.id_autenticacion,
              item.email,
              this.ESTADO_MAP[estado] ?? 'Desconocido'
            )
          );
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

  openModalCrearOrientador(): void {
    this.isEditing = false;
    this.modalCrearOrientador = true;
  }

  openModalEditarOrientador(): void {
    this.isEditing = true;
    this.modalCrearOrientador = true;
  }
}
