import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutaService } from '../../../../servicios/rutas.service';
import { SwitchService } from '../../../../servicios/switch.service';
import { Ruta } from '../../../../Modelos/ruta.modelo';
import { User } from '../../../../Modelos/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Pica from 'pica';
import { AlertService } from '../../../../servicios/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { faMagnifyingGlass, faPenToSquare, faPlus, faXmark, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Actividad } from '../../../../Modelos/actividad.model';
import { AliadoService } from '../../../../servicios/aliado.service';
import { SuperadminService } from '../../../../servicios/superadmin.service';
import { Superadmin } from '../../../../Modelos/superadmin.model';
import { ActividadService } from '../../../../servicios/actividad.service';



@Component({
  selector: 'app-modal-add-ruta',
  templateUrl: './modal-add-ruta.component.html',
  styleUrl: './modal-add-ruta.component.css',
  providers: [RutaService, DatePipe]

})
export class ModalAddRutaComponent implements OnInit {
  userFilter: any = { estado: 'Activo' };
  isEditing: boolean = false
  falupa = faCircleQuestion;
  ruta: any;
  rutaId: any;
  listRuta: Ruta[] = [];
  listAsesorConAliado: Superadmin[] = [];
  //createRutaForm: FormGroup;
  token = '';
  user: User | null = null;
  currentRolId: number;
  now = new Date();
  // formattedDate: Date = '';
  submitted: boolean = false;
  private modalSubscription: Subscription;
  isVisible = true;
  imagen_ruta: string = '';
  isActive: boolean = true;
  imagenUrl: SafeUrl | null = null;
  boton = true;
  rutaSeleccionada: any | null;
  tipoDeDato: Actividad[] = [];
  showActividadForm: boolean = false;

  rutaForm = this.fb.group({
    nombre: [''],
    fecha_creacion: [this.now],
    estado: [true],
    imagen_ruta: [null]
  });

 

  constructor(public dialogRef: MatDialogRef<ModalAddRutaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private modalSS: SwitchService,
    private rutaService: RutaService,
    private fb: FormBuilder,
    // private datePipe: DatePipe,
    private router: Router,
    private alertService: AlertService,
    // private sanitizer: DomSanitizer,
    // private aliadoService: AliadoService,
    // private superAdminService: SuperadminService,
    // private actividadService: ActividadService,
  ) {

    this.rutaId = data.rutaId;
    console.log('id', this.rutaId)
  }

  /* Inicializa con esas funciones al cargar la pagina */
  ngOnInit(): void {
    this.validateToken();
    if (this.rutaId != null) {
      this.isEditing = true;
    }
    //this.isEditing = true;
    //this.mostrarRutas();
    this.verEditar();
    // if (this.rutaId != null) {
    //   this.isEditing = true
    //   this.verEditar();
    // }
  }

  /* Valida el token del login */
  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }
    if (!this.token) {
      this.router.navigate(['home']);
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 300; // Nueva anchura
          canvas.height = 300; // Nueva altura
          const pica = Pica();
          pica.resize(img, canvas)
            .then((result) => pica.toBlob(result, 'image/jpeg', 0.90))
            .then((blob) => {
              const reader2 = new FileReader();
              reader2.onload = (e2: any) => {
                this.imagen_ruta = e2.target.result;
                this.rutaForm.patchValue({ imagen_ruta: this.imagen_ruta });
              };
              reader2.readAsDataURL(blob);
            });
        };
      };
      reader.readAsDataURL(file);
    }
  }
  
  verEditar(): void {
    if (this.rutaId != null) {
      this.rutaService.rutaXid(this.token, this.rutaId).subscribe(
        data => {
          console.log('Datos recibidos:', data);
          this.rutaForm.patchValue({
            nombre: data.nombre,
            fecha_creacion: data.fecha_creacion,
            estado: data.estado,
            imagen_ruta: data.imagen_ruta,
          });

          this.isActive = data.estado === 'Activo';
          setTimeout(() => {
            this.rutaForm.get('estado')?.setValue(this.isActive);
          })
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  addRuta(): void {
    this.submitted = true;
    if (this.rutaForm.invalid) {
      return;
    }
    const ruta: Ruta = {
      nombre: this.rutaForm.get('nombre')?.value,
      fecha_creacion: this.rutaForm.get('fecha_creacion')?.value,
      estado: this.rutaForm.get('estado')?.value,
      imagen_ruta: this.rutaForm.get('imagen_ruta')?.value,
    };
    if (this.rutaId != null) {
      this.alertService.alertaActivarDesactivar("¿Estas seguro de guardar los cambios?", 'question').then((result) => {
        if (result.isConfirmed) {
          this.rutaService.updateRutas(this.token, ruta, this.rutaId).subscribe(
            data => {
              location.reload();
              console.log('erererer',data);
              //this.alertService.successAlert('Exito', data.message);
            },
            error => {
              this.alertService.errorAlert('Error', error.error.message);
              console.error('Error', error.error.message);
            }
          );
        }
      });
    } else {
      this.rutaService.createRutas(this.token, ruta).subscribe(
        data => {
          location.reload();
          this.alertService.successAlert('Exito', data.message);
        },
        error => {
          this.alertService.errorAlert('Error', error.error.message);
          console.error('Error', error.error.message);
        }
      )
    }
  }

  // addActividad(): void {
  //   // if (!this.rutaSeleccionada) {
  //   //   console.log("debes seleccionar una ruta para poder crear la actividad")
  //   //   return;
  //   // }
  //   this.submitted = true;
  //   const actividad: Actividad = {
  //     nombre: this.actividadForm.value.nombre,
  //     descripcion: this.actividadForm.value.descripcion,
  //     ruta_multi: this.actividadForm.value.ruta_multi,
  //     id_tipo_dato: parseInt(this.actividadForm.value.id_tipo_dato),
  //     id_asesor: parseInt(this.actividadForm.value.id_asesor),
  //     id_ruta: this.rutaSeleccionada.id,
  //     id_aliado: this.user.id
  //   }
  //   this.aliadoService.crearActividad(this.token, actividad).subscribe(
  //     data => {
  //       location.reload();
  //       console.log(data);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }


  // asesorConAliado():void{
  //   if (this.token) {
  //     this.superAdminService.asesorConAliado(this.token).subscribe(
  //       data => {
  //         this.listAsesorConAliado = data;
  //         //console.log("info del asesor: ", data);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     )
  //   }
  // }

  // tipoDato(): void {
  //   if (this.token) {
  //     this.actividadService.getTipoDato(this.token).subscribe(
  //       data => {
  //         this.tipoDeDato = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     )
  //   }
  // }



  toggleActive() {
    this.isActive = !this.isActive;
    this.rutaForm.patchValue({ estado: this.isActive ? true : false });

  }

  /* Muestra el toggle del estado dependiendo del adminId que no sea nulo*/
  mostrarToggle(): void {
    if (this.rutaId != null) {
      this.boton = false;
    }
    this.boton = true;
  }

  closeModal() {
    this.dialogRef.close();
  }

  addActividad():void{

    // En la vista inicial, obtén el token del almacenamiento local
    const token = localStorage.getItem('token');
    //this.router.navigate(['/actnivlec'], { queryParams: { id_ruta: this.rutaId, token: token } });

    this.router.navigate(['/actnivlec'],{ queryParams: { id_ruta: this.rutaId } });
    this.dialogRef.close();
    //location.reload();
  }

  // agregarActividad(): void {
  //   this.showActividadForm = true;
  // }

}