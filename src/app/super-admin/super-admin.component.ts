import { Component, Inject, OnInit } from '@angular/core';

import { SwitchService } from '../servicios/switch.service';
import { AliadoService } from '../servicios/aliado.service';
import { RutaService } from '../servicios/rutas.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actividad } from '../Modelos/actividad.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Ruta } from '../Modelos/ruta.modelo';
import { AddLevelComponent } from './ruta/add-level/add-level.component';
import { AlertService } from '../servicios/alert.service';


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
  submitted: boolean = false;
  rutaSeleccionada: any | null ;
  activityName: any;
  listRuta: Ruta[] = []

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
    private rutaService: RutaService,
    private alertService: AlertService
  ) {

  }


  ngOnInit(): void {
    this.validateToken();
    this.verRuta();

    //this.modalSS.$modal.subscribe((valor) => { this.modalSwitch = valor })
    if (this.actividadId) {
      this.actividadForm.get('password')?.setValidators([Validators.minLength(8)]);
    } else {
      this.actividadForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
    }
    this.actividadForm.get('password')?.updateValueAndValidity();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }

  selectRuta(ruta: any): void{
    this.rutaSeleccionada = ruta;
      console.log("la ruta seleccionada fue: ",this.rutaSeleccionada)
  }
  addActividad(): void {
    if (!this.rutaSeleccionada) {
      console.log("debes seleccionar una ruta para poder crear la actividad")
      return;
    }
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
      error => {
        console.log(error);
      }
    )
  }

  verRuta(): void {
    if (this.token) {
      this.rutaService.getAllRutas(this.token).subscribe(
        data => {
          this.listRuta = data;
          //console.log(data);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

 

  addActivityModal() {

    if (this.activityName.trim() === '') {
      // Mostrar algún mensaje de error o manejar la situación según tu requerimiento
      //console.log('Nombre de actividad no puede estar vacío.');
      this.alertService.errorAlert('Error', 'No le has asignado nombre a la actividad')
      return; // Salir del método si el nombre de actividad está vacío
    }
    const dialogRef = this.dialog.open(AddLevelComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerro y se devolvio', result);
    });

  }
 // activityName: string = ''; // Nombre de la actividad
  levels: any[] = []; // Lista de niveles
  showAddLevelButton: boolean = false; // Control para mostrar el botón "Añadir Nivel"

  // Método para agregar un nuevo nivel
  addLevel() {
    this.levels.push({}); // Puedes definir la estructura del nivel según tus necesidades
  }

  // Método para avanzar al siguiente paso
  goToNext() {
    // Aquí puedes implementar la lógica para avanzar al siguiente paso
    console.log('Nombre de la actividad:', this.activityName);
    console.log('Niveles:', this.levels);

    // Mostrar el botón "Añadir Nivel" después de dar clic en "Siguiente"
    this.showAddLevelButton = true;
  }

  


  cancelarcrearActividad():void {
   this.rutaSeleccionada = null;
   this.activityName = null;

  }
}
