import { Component } from '@angular/core';
import { User } from '../../../Modelos/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaService } from '../../../servicios/rutas.service';
import { Ruta } from '../../../Modelos/ruta.modelo';
import { FormBuilder } from '@angular/forms';
import { ActividadService } from '../../../servicios/actividad.service';
import { Actividad } from '../../../Modelos/actividad.model';
import { NivelService } from '../../../servicios/nivel.service';
import { LeccionService } from '../../../servicios/leccion.service';
import { ContenidoLeccionService } from '../../../servicios/contenido-leccion.service';
import { SuperadminService } from '../../../servicios/superadmin.service';
import { Aliado } from '../../../Modelos/aliado.model';
import { AsesorService } from '../../../servicios/asesor.service';
import { Asesor } from '../../../Modelos/asesor.model';

@Component({
  selector: 'app-editar-act-ruta',
  templateUrl: './editar-act-ruta.component.html',
  styleUrl: './editar-act-ruta.component.css'
})
export class EditarActRutaComponent {
  token: string | null = null;
  user: User | null = null;
  id: number | null = null;
  currentRolId: number;
  rutaId: number | null = null;
  actividadId: any;
  nivelId: any;
  leccionId: any;
  contenidoId: any;


  ////
  listRutaActNivLec: Ruta[] = [];
  listaTipoDato: Actividad[] = [];
  listaAliados: Aliado[] = [];
  listaAsesores: Asesor[] = [];


  ////////
  actividadSeleccionada: any | null;
  rutaSeleccionada: any | null;
  nivelSeleccionada: any | null;
  leccionSeleccionada: any | null;
  contenidoLeccionSeleccionada: any | null;
  ////
  actividadForm = this.fb.group({
    id: [null],
    nombre: [''],
    descripcion: [''],
    ruta_multi: [''],
    id_tipo_dato: [''],
    id_asesor: [''],
    id_aliado: ['']
  })



  nivelForm = this.fb.group({
    id: [null],
    nombre: [''],
    descripcion: ['']
  });

  leccionForm = this.fb.group({
    id: [null],
    nombre: ['']
  });

  contenidoLeccionForm = this.fb.group({
    id: [null],
    titulo: [''],
    descripcion: [''],
    fuente: [''],
    id_tipo_dato: ['']
  });



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rutaService: RutaService,
    private fb: FormBuilder,

    private actividadService: ActividadService,
    private nivelService: NivelService,
    private leccionService: LeccionService,
    private contenidoLeccionService: ContenidoLeccionService,
    private superAdminService: SuperadminService,
    private asesorService: AsesorService



  ) {


  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.rutaId = +params['id_ruta'];

    });
    this.validateToken();
    this.verEditar();
    this.tipoDato();
    this.aliados();
    this.asesores();

  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');
      //console.log('currentrol',identityJSON);
      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.id = this.user.id;
        this.currentRolId = this.user.id_rol;
        //console.log('ererer',this.id)
        if (this.currentRolId != 1) {
          this.router.navigate(['/home']);
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['/home']);
    }
  }

  verEditar(): void {
    // if (!this.token) {
    this.rutaService.rutasActivas(this.token).subscribe(
      (data) => {
        this.listRutaActNivLec = data
        console.log('Rutas:', this.listRutaActNivLec);
      },
      (error) => {
        console.log(error);
      }
    )
    //}
  }

  selectRuta(ruta: any): void {
    this.rutaSeleccionada = ruta;
    console.log("la ruta seleccionada fue: ", this.rutaSeleccionada)
  }
  actividadSelect(actividad: any): void {
    this.actividadSeleccionada = actividad;
    this.nivelSeleccionada = null;
    this.leccionSeleccionada = null;
    this.contenidoLeccionSeleccionada = null;
    this.actividadForm.patchValue(actividad);
    this.actividadId = this.actividadForm.value.id;
    console.log('la actividad seleccionada es: ', this.actividadSeleccionada);
  }

  nivelSelect(nivel: any): void {
    this.nivelSeleccionada = nivel;
    this.leccionSeleccionada = null;
    this.contenidoLeccionSeleccionada = null;
    this.nivelForm.patchValue(nivel);
    this.nivelId = this.nivelForm.value.id;
    console.log('el nivel seleccionado es: ', this.nivelSeleccionada);
  }

  leccionSelect(leccion: any): void {
    this.leccionSeleccionada = leccion;
    this.contenidoLeccionSeleccionada = null;
    this.leccionForm.patchValue(leccion);
    this.leccionId = this.leccionForm.value.id;
    console.log('la lección seleccionada es: ', this.leccionSeleccionada);
  }

  contenidoLeccionSelect(contenido: any): void {
    this.contenidoLeccionSeleccionada = contenido;
    this.contenidoLeccionForm.patchValue(contenido);
    this.contenidoId = this.contenidoLeccionForm.value.id;
    console.log('el contenido seleccionado es: ', this.contenidoLeccionSeleccionada);
  }


  updateActividad(): void {
    const actividadData = this.actividadForm.value;
    this.actividadService.updateActividad(this.token, this.actividadId, actividadData).subscribe(
      (data) => {
        console.log('actualización exitosa', data);

      },
      (error) => {
        //console.log('dasdasdasd',this.actividadId);
        console.log('Error al actualizar', error);
      }
    )
  }

  updateNivel(): void {
    const nivelData = this.nivelForm.value;
    this.nivelService.updateNivel(this.token, this.nivelId, nivelData).subscribe(
      (data) => {
        console.log('actualización exitosa', data);
        location.reload();
      },
      (error) => {
        //console.log('pooooooo',this.nivelId);
        console.log('Error al actualizar', error);
      }
    )
  }

  updateLeccion(): void {
    const leccionData = this.leccionForm.value;
    this.leccionService.updateLeccion(this.token, this.leccionId, leccionData).subscribe(
      (data) => {
        console.log('actualización exitosa', data);
      },
      (error) => {
        //console.log('pooooooo',this.leccionId);
        console.log('Error al actualizar', error);
      }
    )
  }

  updateContenidoLeccion(): void {
    const contenidoData = this.contenidoLeccionForm.value;
    this.contenidoLeccionService.updateContenidoLeccion(this.token, this.contenidoId, contenidoData).subscribe(
      (data) => {
        console.log('actualización exitosa', data);
      },
      (error) => {
        //console.log('weeeeeeeee',this.contenidoId)
        console.log('Error al actualizar', error);
      }
    )
  }

  tipoDato(): void {
    this.actividadService.getTipoDato(this.token).subscribe(
      (data) => {
        this.listaTipoDato = data;
        console.log('datos tipo dato', this.listaTipoDato);
      },
      error => {
        console.log('Error al obtener datos tipo dato', error);
      }
    )
  }

  aliados(): void {
    this.superAdminService.listarAliado(this.token).subscribe(
      (data) => {
        this.listaAliados = data;
        console.log('datos aliados', this.listaAliados);
      },
      error => {
        console.log('Error al obtener datos aliados', error);
      }
    )
  }

  asesores(): void {
    this.asesorService.listarAsesores(this.token).subscribe(
      (data) => {
        this.listaAsesores = data;
        console.log('datos asesores', this.listaAsesores);
      },
      error => {
        console.log('Error al obtener datos asesores', error);
      }
    )
  }



  getTipoDatoNombre(id: number): string {
    const tipoDato = this.listaTipoDato.find(td => td.id === id);
    return tipoDato ? tipoDato.nombre : 'Desconocido';
  }

  getAliadoNombre(id: number): string {
    const aliado = this.listaAliados.find(a => a.id === id);
    return aliado ? aliado.nombre : 'Desconocido';
  }

  getAsesoresNombre(id: number): string {
    const asesores = this.listaAsesores.find(a => a.id === id);
    return asesores ? asesores.nombre : 'Desconocido';
  }





}
