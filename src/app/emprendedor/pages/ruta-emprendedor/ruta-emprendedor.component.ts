import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../../servicios/rutas.service';
import { Router } from '@angular/router';
import { Ruta } from '../../../Modelos/ruta.modelo';

@Component({
  selector: 'app-ruta-emprendedor',
  templateUrl: './ruta-emprendedor.component.html',
  styleUrl: './ruta-emprendedor.component.css'
})
export class RutaEmprendedorComponent implements OnInit {
  token: string | null = null;
  documento: string | null;
  user: any = null;
  currentRolId: number;
  idRuta: number | null; 
  rutaContenidoList: Ruta []=[];
  rutaList: Ruta []=[];
/////////
  rutaSeleccionada: any | null;
  actividadSeleccionada: any | null; 
  nivelSeleccionado: any | null;
  leccionSeleccionada: any | null;
  actividadExpandida: number | null = null;
  nivelExpandido: number | null = null;
  

  constructor(
    private rutaService: RutaService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.validateToken();
    this.listarRuta();
    //this.contenidoDeRuta();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.currentRolId = this.user.id_rol;
        console.log (this.currentRolId);

        if (this.currentRolId != 5) {
          this.router.navigate(['/inicio/body']);
        } else {
          this.documento = this.user.emprendedor.documento;
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }

  // contenidoDeRuta():void{
  //   if (this.token) {
  //     this.rutaService.contenidoRuta(this.token, this.idRuta).subscribe(
  //       (data) =>{
  //         this.rutaContenidoList = data;
  //         console.log('Contenido de la ruta:', this.rutaContenidoList);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     )
  //   }
  // }

  listarRuta():void{
    // if (this.token) {
      this.rutaService.rutasActivas(this.token).subscribe(
        data =>{
          this.rutaList = data;
          console.log('Rutas:', this.rutaList);
        },
        err => {
          console.log(err);
        }
      )
    // }
  }

  selectRuta(ruta: any): void {
    this.rutaSeleccionada = ruta;
    this.actividadSeleccionada = null;
    this.nivelSeleccionado = null;
    this.leccionSeleccionada = null;
    console.log("la ruta seleccionada fue: ",this.rutaSeleccionada)
  }

  selectActividad(actividad: any): void {
    this.actividadSeleccionada = actividad;
    this.nivelSeleccionado = null;
    this.leccionSeleccionada = null;
    console.log("la actividad seleccionada fue: ", this.actividadSeleccionada);
  }

  selectNivel(nivel: any): void {
    this.nivelSeleccionado = nivel;
    this.leccionSeleccionada = null;
    console.log("el nivel seleccionado fue: ", this.nivelSeleccionado);
  }

  // selectLeccion(leccion: any): void {
  //   this.leccionSeleccionada = leccion;
  //   console.log("la lección seleccionada fue: ", this.leccionSeleccionada);
  // }

  
  toggleActividad(index: number) {
    this.actividadExpandida = this.actividadExpandida === index ? null : index;
    this.nivelExpandido = null;
  }

  toggleNivel(index: number) {
    this.nivelExpandido = this.nivelExpandido === index ? null : index;
  }

  selectLeccion(leccion: any): void {
    this.leccionSeleccionada = leccion;
  }
  

  
}
