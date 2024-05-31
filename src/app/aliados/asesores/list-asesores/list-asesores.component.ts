import { Component, OnInit } from '@angular/core';
import { User } from '../../../Modelos/user.model';
import { AsesorService } from '../../../servicios/asesor.service';
import { Router } from '@angular/router';
import { Asesor } from '../../../Modelos/asesor.model';
import { AliadoService } from '../../../servicios/aliado.service';

@Component({
  selector: 'app-list-asesores',
  templateUrl: './list-asesores.component.html',
  styleUrl: './list-asesores.component.css',
  providers: [AsesorService]
})
export class ListAsesoresComponent implements OnInit {
  token: string | null = null;
  user: User | null = null;
  currentRolId: string | null = null;
  estado: boolean;
  id: number | null = null;
  listaAsesores: Asesor[] = [];
  private ESTADO_MAP: { [key: number]: string } = {
    1: 'Activo',
    0: 'Inactivo'
  };
  userFilter: any = { nombre: '', estado_usuario: 'Activo' };

  constructor(
    private asesorService: AsesorService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.validateToken();
    //this.cargarRutas();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      console.log(this.token);
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        // console.log(identity);
        this.user = identity;
        this.currentRolId = this.user.id_rol?.toString();
        this.estado = this.user.estado;
        console.log(this.estado);
      }
    }
  }

  //   cargarAsesores() {
  //     if (this.token) {
  //       this.asesorService.getinfoAsesor(this.token, this.id).subscribe(
  //         (data: Asesor[]) => {
  //           this.listaAsesores = data.filter(item => this.ESTADO_MAP[item.estado] === this.userFilter.estado).map((item: any) =>
  //             new Asesor(
  //               item.nombre,
  //               item.fecha_creacion,
  //               this.ESTADO_MAP[item.estado] ?? 'Desconocido')
  //           );
  //           console.log(this.listaRutas);
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //     } else {
  //       console.error('Token is not available');
  //     }
  //   }
  // }



  // onEstadoChange(event: any): void {
  //   const estado = event.target.value;
  //   this.cargarAsesores(parseInt(estado, 10));
  // }

  // limpiarFiltro(): void {
  //   this.userFilter = { nombre: '', estado_usuario: 'Activo' };
  //   // Opcional: recargar los aliados con el estado por defecto
  //   this.cargarAsesores(1);
  // }

}
