import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../Modelos/user.model';
import { Router } from '@angular/router';
import { SuperadminService } from '../../../../servicios/superadmin.service';
import { Asesor } from '../../../../Modelos/asesor.model';
import { ActividadService } from '../../../../servicios/actividad.service';
import { Actividad } from '../../../../Modelos/actividad.model';
import { Aliado } from '../../../../Modelos/aliado.model';

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
  listarAliado: Aliado [] = [];


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

  ){}

  ngOnInit(): void{
    this.validateToken();
    this.AsesorConAliado();
    this.tipoDato();
    this.addActividadSuperAdmin();
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

//traer el asesor con el aliado
  AsesorConAliado():void{
    if (this.token) {
      this.superAdminService.asesorConAliado(this.token).subscribe(
        data => {
          this.listaAsesorAliado = data;
          console.log("info del asesor: ", data);
        },
        error =>{
          console.log(error);
        }
      )
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
          this.listarAliado = data;
          console.log('listaAliado',data)
        },
        error => {
          console.log(error);
        }
      )
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
      //id_ruta: this.rutaSeleccionada.id,
      id_aliado: this.user.id
    }
    this.superAdminService.crearActividadSuperAdmin(this.token, this.id).subscribe(
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
    this.actividadForm.patchValue({
      nombre: '',
      descripcion: '',
      ruta_multi: '',
      id_tipo_dato: '',
      id_asesor: ''
    });
  }

}
