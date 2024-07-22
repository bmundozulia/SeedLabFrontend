import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../Modelos/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperadminService } from '../../../../servicios/superadmin.service';
import { Asesor } from '../../../../Modelos/asesor.model';
import { ActividadService } from '../../../../servicios/actividad.service';
import { Actividad } from '../../../../Modelos/actividad.model';
import { Aliado } from '../../../../Modelos/aliado.model';
import { Superadmin } from '../../../../Modelos/superadmin.model';
import { AliadoService } from '../../../../servicios/aliado.service';

@Component({
  selector: 'app-actnivlec',
  templateUrl: './actnivlec.component.html',
  styleUrl: './actnivlec.component.css'
})
export class ActnivlecComponent implements OnInit {
  ////
  token: string | null = null;
  user: User | null = null;
  id: number | null = null;
  currentRolId: number;
  listaAsesorAliado: Asesor [] = [];
  listarTipoDato: Actividad  [] = [];
  listarAliadoo: Aliado [] = [];
  ///
  listarAsesores: any[] = [];
  userFilter: any = { nombre: '', estado: 'Activo' };
  aliadoSeleccionado: any | null;
  rutaId: number | null = null;


  ////


  actividadForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    ruta_multi: ['', Validators.required],
    id_tipo_dato: ['', Validators.required],
    id_asesor: ['', Validators.required],
    id_ruta: ['', Validators.required],
    id_aliado: ['', Validators.required]
  })

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private superAdminService: SuperadminService,
    private actividadService: ActividadService,
    private aliadoService: AliadoService,
    private route: ActivatedRoute,

  ){}

  ngOnInit(): void{
    this.route.queryParams.subscribe(params =>{
      this.rutaId = +params['id_ruta'];
      this.actividadForm.patchValue({ id_ruta: this.rutaId.toString()});
    });

    this.validateToken();
    //this.AsesorConAliado();
    this.tipoDato();
    //this.addActividadSuperAdmin();
    this.listaAliado();
    this.onAliadoChange();
    
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



  //me trae el tipo de dato que requiere la actividad
  tipoDato():void{
    if (this.token) {
      this.actividadService.getTipoDato(this.token).subscribe(
        data => {
          this.listarTipoDato = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  //me lista los aliados existentes activos
  listaAliado():void{
    if (this.token) {
      this.superAdminService.listarAliado(this.token).subscribe(
        data => {
          this.listarAliadoo = data;
          console.log('Aliado: ',data)
        },
        error => {
          console.log(error);
        }
      )
    }
  }
  selectAliado(aliado: any):void{
    this.aliadoSeleccionado = aliado;
    console.log("el aliado seleccionado fue: ",this.aliadoSeleccionado)
  }

  onAliadoChange(event?: any): void {
    const aliadoId = event.target.value;
    const aliadoSeleccionado = this.listarAliadoo.find(aliado => aliado.id == aliadoId);
    
    if (aliadoSeleccionado) {
      console.log("El aliado seleccionado fue: ", {
        id: aliadoSeleccionado.id,
        nombre: aliadoSeleccionado.nombre
      });
      
      // Aquí puedes hacer lo que necesites con el aliado seleccionado
      this.aliadoSeleccionado = aliadoSeleccionado;
  
      if (this.token) {
        this.aliadoService.getinfoAsesor(this.token, this.aliadoSeleccionado.id, this.userFilter.estado).subscribe(
          data => {
            this.listarAsesores = data;
            console.log('Asesores: ', data);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }



  //agregar una actividad
  addActividadSuperAdmin():void{
    const actividad: Actividad = {
      nombre: this.actividadForm.value.nombre,
      descripcion: this.actividadForm.value.descripcion,
      ruta_multi: this.actividadForm.value.ruta_multi,
      id_tipo_dato: parseInt(this.actividadForm.value.id_tipo_dato),
      id_asesor: parseInt(this.actividadForm.value.id_asesor),
      id_ruta: this.rutaId,
      //id_ruta: parseInt(this.actividadForm.value.id_ruta),
      id_aliado: this.user.id
    }
    this.superAdminService.crearActividadSuperAdmin(this.token).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  cancelarcrearActividad(): void {
    //this.rutaSeleccionada = null;
    //this.activityName = null;
    //this.addActividadSuperAdmin = null;
    //this.onAliadoChange
    this.actividadForm.patchValue({
      nombre: '',
      descripcion: '',
      ruta_multi: '',
      id_tipo_dato: '',
      id_asesor: '',
      id_aliado: '',
    });
  }

}
//traer el asesor con el aliado
  // AsesorConAliado():void{
  //   if (this.token) {
  //     this.superAdminService.asesorConAliado(this.token).subscribe(
  //       data => {
  //         this.listaAsesorAliado = data;
  //         console.log("info del asesor: ", data);
  //       },
  //       error =>{
  //         console.log(error);
  //       }
  //     )
  //   }
  // }