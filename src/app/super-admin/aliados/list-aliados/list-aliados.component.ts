import { Component, OnInit } from '@angular/core';
import { faEye, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AliadoService } from '../../../servicios/aliado.service';
import { Aliado } from '../../../Modelos/aliado.model';
import { User } from '../../../Modelos/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-aliados',
  templateUrl: './list-aliados.component.html',
  styleUrls: ['./list-aliados.component.css'],
  providers: [AliadoService],

})
export class ListAliadosComponent implements OnInit {
  userFilter: any = { nombre: '', estado_usuario: 'Activo' };
  faeye = faEye;
  falupa = faMagnifyingGlass;
  fax = faXmark;
  public page!: number;
  listaAliado: Aliado[] = [];
  token: string | null = null;
  user: User | null = null;
  currentRolId: number;
  isLoading: boolean = true;

  /* Convierte el estado en string para que se retorne en la vista con esos datos */
  private ESTADO_MAP: { [key: number]: string } = {
    1: 'Activo',
    0: 'Inactivo'
  };
  constructor(
    private aliadoService: AliadoService,
    private router: Router,
  ) { }

  /* Inicializa con esas funciones al cargar la pagina */
  ngOnInit(): void {
    this.validateToken();
    this.cargarAliados(1); /* Cargar inicialmente con estado 'Activo' */
  }

  /* Valida el token del login */
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

  /* Funcion para mostrar las listas de los aliados y con el estado activo*/
  cargarAliados(estado: number): void {
    if (this.token) {
      this.aliadoService.getinfoAliado(this.token, estado).subscribe(
        (data: Aliado[]) => {
          this.listaAliado = data.map((item: any) =>
            new Aliado(
              item.id,
              item.nombre,
              item.descripcion,
              item.logo,
              item.ruta_multi,
              item.id_autenticacion,
              item.id_tipo_dato,
              item.email,
              item.banner,
              this.ESTADO_MAP[item.estado_usuario] ?? 'Desconocido'
            )
          );
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        },
        (err) => {
          console.log(err);
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      );
    } else {
      console.error('Token is not available');
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  }

  /* Retorna los aliados dependiendo de su estado, normalmente en activo */
  onEstadoChange(event: any): void {
    var estado = event.target.value;
    if (estado == "Activo") {
      this.cargarAliados(1);
    }
    else {
      this.cargarAliados(0);
    }
  }

  /* Limpia el filtro de busqueda, volviendo a retornar los aliados activos */
  limpiarFiltro(): void {
    this.userFilter = { nombre: '', estado_usuario: 'Activo' };
    this.cargarAliados(1);
  }
}