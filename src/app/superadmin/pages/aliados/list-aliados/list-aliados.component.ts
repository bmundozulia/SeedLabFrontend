import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { faEye, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AliadoService } from '../../../../servicios/aliado.service';
import { Aliado } from '../../../../Modelos/aliado.model';
import { User } from '../../../../Modelos/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-aliados',
  templateUrl: './list-aliados.component.html',
  styleUrls: ['./list-aliados.component.css'],
  providers: [AliadoService],
})
export class ListAliadosComponent implements OnInit {
  userFilter: any = { nombre: '', estado: 'Activo' };
  faeye = faEye;
  falupa = faMagnifyingGlass;
  fax = faXmark;
  public page: number = 1; // Inicializa la página en 1
  public itemsPerPage: number = 5; // Cambia según tus necesidades
  public totalAliados: number = 0; // Número total de aliados, inicializado en 0
  listaAliado: Aliado[] = [];
  token: string | null = null;
  user: User | null = null;
  currentRolId: number;
  isLoading: boolean = true;
  nombre: string | null = null;

  constructor(
    private aliadoService: AliadoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.validateToken();
    this.cargarAliados(); // Cargar inicialmente con estado 'Activo'
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');
      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.currentRolId = this.user.id_rol;
        if (this.currentRolId != 1 && this.currentRolId != 2) {
          this.router.navigate(['/inicio/body']);
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }

  cargarAliados(): void {
    if (this.token) {
      const estado = this.userFilter.estado === 'Activo' ? 1 : 0;
      this.aliadoService.getinfoAliado(this.token, estado).subscribe(
        (data: Aliado[]) => {
          this.listaAliado = data.map((item: any) => {
            const aliado = new Aliado(
              item.id,
              item.nombre,
              item.descripcion,
              item.logo,
              item.banner,
              item.ruta_multi,
              item.id_tipo_dato,
              item.email,
              item.password,
              item.estado
            );
            aliado['estadoString'] = this.mapEstado(item.estado);
            return aliado;
          });
          this.totalAliados = data.length;
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
    this.page = 1; // Reinicia la página al cambiar el estado
    this.cargarAliados();
  }
  
  limpiarFiltro(): void {
    this.userFilter = { nombre: '', estado: 'Activo' };
    this.page = 1; 
    this.cargarAliados();
  }

  changePage(pageNumber: number | string): void {
    if (pageNumber === 'previous') {
      if (this.page > 1) {
        this.page--;
      }
    } else if (pageNumber === 'next') {
      if (this.page < this.getTotalPages()) {
        this.page++;
      }
    } else {
      this.page = pageNumber as number;
    }
    this.cargarAliados(); // Carga los aliados de la página seleccionada
  }

  getTotalPages(): number {
    return Math.ceil(this.totalAliados / this.itemsPerPage);
  }

  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  canGoPrevious(): boolean {
    return this.page > 1;
  }

  canGoNext(): boolean {
    return this.page < this.getTotalPages();
  }

  mapEstado(estado: number): string {
    return estado === 1 ? 'Activo' : 'Inactivo';
  }
}
