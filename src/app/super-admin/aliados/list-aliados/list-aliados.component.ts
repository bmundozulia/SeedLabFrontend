
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import { AliadoService } from '../../../servicios/aliado.service';

import { Aliado } from '../../../Modelos/aliado.model';
import { User } from '../../../Modelos/user.model';

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

  private ESTADO_MAP: { [key: number]: string } = {
    1: 'Activo',
    0: 'Inactivo'
  };

  constructor(
    private aliadoService: AliadoService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.validateToken();
    this.cargarAliados(1); // Cargar inicialmente con estado 'Activo'
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

  onEstadoChange(event: any): void {
    var estado = event.target.value;
    if (estado == "Activo") {
      this.cargarAliados(1);
    } 
    else{
      this.cargarAliados(0);
    }
  }

  limpiarFiltro(): void {
    this.userFilter = { nombre: '', estado_usuario: 'Activo' };
    this.cargarAliados(1);
  }
}