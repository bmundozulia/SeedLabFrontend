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


























  openModal() {
    this.modalSwitch = true;
  }


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

  rutas: string[] = ['Ruta 1', 'Ruta 2'];
  selectedRuta: string | null = null;
  currentStep: number = 1;

  actividad = { nombre: '' };
  nivel = { nombre: '', descripcion: '' };
  lecciones: any[] = [{ nombre: '', archivo: null, url: '', descripcion: '' }];
  crearOtroNivel: boolean = false;
  otroNivel = { nombre: '', descripcion: '' };
  niveles: any[] = [];

  addingOtroNivel: boolean = false;
  otroNivelAgregado: boolean = false;
  otroNivelLecciones: any[] = [{ nombre: '', archivo: null, url: '', descripcion: '' }];

  selectRuta(ruta: string) {
    this.selectedRuta = ruta;
    this.currentStep = 1;
    this.actividad = { nombre: '' };
    this.nivel = { nombre: '', descripcion: '' };
    this.lecciones = [{ nombre: '', archivo: null, url: '', descripcion: '' }];
    this.crearOtroNivel = false;
    this.otroNivel = { nombre: '', descripcion: '' };
    this.niveles = [];
    this.addingOtroNivel = false;
    this.otroNivelAgregado = false;
    this.otroNivelLecciones = [{ nombre: '', archivo: null, url: '', descripcion: '' }];
  }

  nextStep() {
    if (this.validateCurrentStep()) {
      this.currentStep++;
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  validateCurrentStep() {
    switch (this.currentStep) {
      case 1:
        return this.actividad.nombre !== '';
      case 2:
        return this.nivel.nombre !== '' && this.nivel.descripcion !== '';
      case 3:
        return this.lecciones.every(leccion => leccion.nombre !== '' && leccion.archivo !== null && leccion.url !== '' && leccion.descripcion !== '');
      default:
        return false;
    }
  }

  onFileSelected(event: any, index: number) {
    this.lecciones[index].archivo = event.target.files[0];
  }

  addLeccion() {
    this.lecciones.push({ nombre: '', archivo: null, url: '', descripcion: '' });
  }

  finalizar() {
    alert('Formulario completado.');
    this.crearOtroNivel = true;
  }

  startAddingOtroNivel() {
    this.addingOtroNivel = true;
  }

  addOtroNivel() {
    if (this.otroNivel.nombre !== '' && this.otroNivel.descripcion !== '') {
      this.otroNivelAgregado = true;
    } else {
      alert('Por favor, complete todos los campos del nivel.');
    }
  }

  onOtroNivelFileSelected(event: any, index: number) {
    this.otroNivelLecciones[index].archivo = event.target.files[0];
  }

  addOtroNivelLeccion() {
    this.otroNivelLecciones.push({ nombre: '', archivo: null, url: '', descripcion: '' });
  }

  addOtroNivelToList() {
    if (this.otroNivelLecciones.every(leccion => leccion.nombre !== '' && leccion.archivo !== null && leccion.url !== '' && leccion.descripcion !== '')) {
      this.niveles.push({ ...this.otroNivel, lecciones: [...this.otroNivelLecciones] });
      this.otroNivel = { nombre: '', descripcion: '' };
      this.otroNivelLecciones = [{ nombre: '', archivo: null, url: '', descripcion: '' }];
      this.otroNivelAgregado = false;
      this.addingOtroNivel = false;
    } else {
      alert('Por favor, complete todos los campos de las lecciones.');
    }
  }

}
