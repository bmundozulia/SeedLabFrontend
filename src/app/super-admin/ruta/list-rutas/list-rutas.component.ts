// list-rutas.component.ts
import { Component, OnInit } from '@angular/core';
import { faEye, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { RutaService } from '../../../servicios/rutas.service';
import { Router } from '@angular/router';
import { User } from '../../../Modelos/user.model';
import { Ruta } from '../../../Modelos/ruta.modelo';

@Component({
  selector: 'app-list-rutas',
  templateUrl: './list-rutas.component.html',
  styleUrls: ['./list-rutas.component.css'],
  providers: [RutaService]
})
export class ListRutasComponent implements OnInit {
  userFilter: any = { nombre: '', estado: 'Activo', fecha_creacion: '' };
  public page: number = 1;
  listaRutas: Ruta[] = [];
  fax = faXmark;
  falupa = faMagnifyingGlass;
  faeye = faEye;
  token: string | null = null;
  user: User | null = null;
  currentRolId: string | null = null;

  constructor(
    private rutaService: RutaService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.validateToken();
    this.cargarRutas();
  }

  private ESTADO_MAP: { [key: number]: string } = {
    1: 'Activo',
    0: 'Inactivo'
  };

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
        console.log(this.currentRolId);
      }
    }
  }

  cargarRutas(): void {
    if (this.token) {
      this.rutaService.getAllRutas(this.token).subscribe(
        (data: Ruta[]) => {
          this.listaRutas = data.filter(item => this.ESTADO_MAP[item.estado] === this.userFilter.estado).map((item: any) =>
            new Ruta(
              item.nombre,
              item.fecha_creacion,
              this.ESTADO_MAP[item.estado] ?? 'Desconocido')
          );
          console.log(this.listaRutas);
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
    this.userFilter.estado = estado === '1' ? 'Activo' : 'Inactivo';
    this.cargarRutas();
  }

  limpiarFiltro(): void {
    this.userFilter = { nombre: '', estado: 'Activo', fecha_creacion: '' };
    this.cargarRutas();
  }
}
