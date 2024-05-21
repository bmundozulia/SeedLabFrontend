import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AliadoService } from '../../servicios/aliado.service';
import { Aliado } from '../../Modelos/aliado.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../servicios/user.service';
import { HeaderComponent } from '../../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-aliados',
  providers: [AliadoService, HeaderComponent, UserService],
  templateUrl: './list-aliados.component.html',
  styleUrl: './list-aliados.component.css',
})
export class ListAliadosComponent implements OnInit {
  userFilter: any = { nombre: '', estado_usuario: 'Activo' };
  faeye = faEye;
  falupa = faMagnifyingGlass;
  public page!: number;
  listaAliado: Aliado[] = [];
  token: string | null = null;

  private ESTADO_MAP: { [key: number]: string } = {
    1: 'Activo',
    0: 'Inactivo'
  };

  constructor(private aliadoService: AliadoService,
    private userService: UserService,
    private router: Router,
    private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.validartoken();
    this.cargarAliados();
    //this.cargarcorreo();
  }

  validartoken(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
      if (!this.token) {
        this.router.navigate(['/inicio/body']);
        // console.log('no lista empresa no esta tomando el token');
      }
    }

    // console.log(localStorage.getItem('documento'));
  }

  cargarAliados(): void {
    if (this.token) {
      this.aliadoService.getinfoAliado(this.token).subscribe(
        (data: Aliado[]) => {
          this.listaAliado = data.map((item: any) => new Aliado(
            item.id,
            item.nombre,
            item.descripcion,
            item.logo,
            item.ruta_multi,
            item.id_autenticacion,
            item.id_tipo_dato,
            item.email,
            this.ESTADO_MAP[item.estado_usuario] ?? 'Desconocido'
          ));
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.error('Token is not available');
    }
  }
}

// cargarcorreo(): void{
//   if (this.token) {
//     this.userService.(this.token).subscribe(
//       (data) => {
//         this.listaEmpresas = data;
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   }
// }


