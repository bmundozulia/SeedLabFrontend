import { Component, Inject, OnInit } from '@angular/core';

import { SwitchService } from '../servicios/switch.service';
import { AliadoService } from '../servicios/aliado.service';
import { RutaService } from '../servicios/rutas.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actividad } from '../Modelos/actividad.model';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog } from '@angular/material/dialog';
import { Ruta } from '../Modelos/ruta.modelo';



@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent implements OnInit {

  modalSwitch: boolean;
  actividadId: any;
  token: string | null = null;
  aliadoId: any;

  listRuta: Ruta[] = [];

  actividadForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    ruta_multi: ['', Validators.required],
    id_tipo_dato: ['', Validators.required],
    id_asesor: ['', Validators.required],
    id_ruta: ['', Validators.required]
  })

  
  constructor(
    // public dialogRef: MatDialogRef<SuperAdminComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private modalSS: SwitchService,
    public dialog: MatDialog,
    private router: Router,
    private aliadoService: AliadoService,
    private rutaService: RutaService) {

  }

  

  ngOnInit(): void {
    this.validateToken();
    this.verRuta();

    //this.modalSS.$modal.subscribe((valor) => { this.modalSwitch = valor })
    if (this.actividadId) {
      this.actividadForm.get('password')?.setValidators([Validators.minLength(8)]);
    }else{
      this.actividadForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
    }
    this.actividadForm.get('password')?.updateValueAndValidity();
  }

  validateToken():void{
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }


  addActividad():void{
    this.submitted = true;
    const actividad: Actividad = {
      nombre: this.actividadForm.value.nombre,
      descripcion: this.actividadForm.value.descripcion,
      ruta_multi: this.actividadForm.value.ruta_multi,
      // id_tipo_dato: this.actividadForm.value.id_tipo_dato,
      // id_asesor: this.actividadForm.value.id_asesor,
      // id_ruta: this.actividadForm.value.id_ruta
    }
    this.aliadoService.crearActividad(this.token, actividad).subscribe(
      data => {
        location.reload();
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    )
  }

  verRuta():void{
    if (this.token) {
      this.rutaService.getAllRutas(this.token).subscribe(
      data=>{
        this.listRuta = data;
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
    }
    
  }

  // cancelarcrearActividad() {
  //   this.dialogRef.close();
  // }


























  // openModal() {
  //   this.modalSwitch = true;
  // }


  persona = {
    tipoDocumento: '',
    descripcion: '',
    titulo: '',
    cuerpo: '',
    links: ''
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (this.isFormValid()) {
      console.log('Form data:', this.persona);
      // Realizar acción de guardar
    }
  }

  isFormValid() {
    return this.persona.tipoDocumento && this.persona.descripcion && this.persona.titulo && this.persona.cuerpo && this.persona.links;
  }
}
