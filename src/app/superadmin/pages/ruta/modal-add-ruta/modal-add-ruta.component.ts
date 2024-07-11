import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
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


@Component({
  selector: 'app-modal-add-ruta',
  templateUrl: './modal-add-ruta.component.html',
  styleUrl: './modal-add-ruta.component.css',
  providers: [RutaService, DatePipe]

})
export class ModalAddRutaComponent implements OnInit {
  userFilter: any = { estado: 'Activo'};
  isEditing: boolean = false
  falupa = faCircleQuestion;
  ruta: any;
  rutaId: any;
  listRuta : Ruta [] = [];
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

  rutaForm = this.fb.group({
    nombre: [''],
    fecha_creacion: [this.now],
    estado: [true],
    imagen_ruta: [null]
  });

  constructor(public dialogRef: MatDialogRef<ModalAddRutaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalSS: SwitchService,
    private rutaService: RutaService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private alertService: AlertService,
    private sanitizer: DomSanitizer
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
      this.router.navigate(['/inicio/body']);
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

  // onFileSelecteds(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagenUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  verEditar(): void {
    if (this.rutaId != null) {
      this.rutaService.rutaXid(this.token, this.rutaId).subscribe(
        data => {
          console.log('Datos recibidos:', data);
          this.rutaForm.patchValue({
            nombre: data.nombre,
            //fecha_creacion: new Date(data.fecha_creacion),
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

  addRuta():void{
    this.submitted = true;
    if (this.rutaForm.invalid) {
      return;
    }
    const ruta: Ruta = {
      nombre: this.rutaForm.get('nombre')?.value,
      fecha_creacion: this.rutaForm.get('fecha_creacion')?.value,
      estado: this.rutaForm.get('estado')?.value,
      imagen_ruta: this.rutaForm.get('imagen_ruta')?.value,
      //imagen_ruta: this.imagen_ruta.get('imagen_ruta')?.value,
      //this.rutaForm.get('imagen_ruta')?.value
    };
    if (this.rutaId != null) {
      this.alertService.alertaActivarDesactivar("¿Estas seguro de guardar los cambios?", 'question').then((result)=>{
        if (result.isConfirmed) {
          this.rutaService.updateRutas(this.token,ruta, this.rutaId).subscribe(
            data =>{
              location.reload();
              console.log(data);
              //this.alertService.successAlert('Exito', data.message);
            },
            error => {
              this.alertService.errorAlert('Error', error.error.message);
              console.error('Error', error.error.message);
            }
          );
        }
      });
    }else{
      this.rutaService.createRutas(this.token, ruta).subscribe(
        data=>{
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




// createRuta() {
  //   const ruta = new Ruta(
  //     this.createRutaForm.get('nombre')?.value,
  //     new Date(this.createRutaForm.get('fecha_creacion')?.value),
  //     //this.createRutaForm.get('fecha_creacion')?.value,
  //     this.createRutaForm.get('estado')?.value?.toString(),
  //     this.createRutaForm.get('imagen_ruta')?.value
  //   );
  //   if (this.isEditing && this.rutaId) {
  //     this.alertService.alertaActivarDesactivar("¿Estas seguro de guardar los cambios?", 'question').then((result) => {
  //       if (result.isConfirmed) {
  //         this.rutaService.updateRutas(this.token,ruta).subscribe(
  //           (response: any) => {
  //             console.log(response);
  //             location.reload();
  //           },
  //           (error) => {
  //             console.error(error);
  //           }
  //         );
  //       }
  //     });
  //   } else{
  //     this.rutaService.createRutas(this.token, ruta).subscribe(
  //     (response: any) => {
  //      console.log(response);
  //       location.reload()
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   )
  //   }
  // };

  // mostrarRutas():void{
  //   if (this.rutaId != null) {
  //   this.rutaService.rutaXid(this.token, this.rutaId).subscribe(
  //     data=>{
  //       this.createRutaForm.patchValue({
  //         nombre: data.nombre,
  //        // fecha_creacion: new Date(data.fecha_creacion),
  //         fecha_creacion: data.fecha_creacion,
  //         estado: data.estado,
  //         imagen_ruta: data.imagen_ruta
  //       });
  //       console.log('popopop',data)
  //       //this.imagen_ruta= ruta.imagen_ruta;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   )
  //   }
  // }


  // async onFileSelecteds(event: any): Promise<void> {
  //   const file = event.target.files[0];
  //   const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

  //   if (file && allowedExtensions.exec(file.name)) {
  //     const resizedImage = await this.resizeAndCompressImage(file, 280, 280, 20 * 1024);
  //     this.imagen_ruta = resizedImage;
  //   } else {
  //     alert('Por favor, seleccione un archivo de imagen (jpg, jpeg, png, gif).');
  //   }
  // }

  // resizeAndCompressImage(file: File, width: number, height: number, maxSize: number): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d');
  //     const reader = new FileReader();

  //     reader.onload = (event) => {
  //       img.src = event.target?.result as string;
  //     };

  //     img.onload = () => {
  //       canvas.width = width;
  //       canvas.height = height;
  //       ctx?.drawImage(img, 0, 0, width, height);

  //       const compressImage = (quality: number) => {
  //         canvas.toBlob((blob) => {
  //           if (blob) {
  //             if (blob.size <= maxSize || quality < 0.1) {
  //               const reader = new FileReader();
  //               reader.onload = () => {
  //                 resolve(reader.result as string);
  //               };
  //               reader.readAsDataURL(blob);
  //             } else {
  //               compressImage(quality - 0.1);
  //             }
  //           } else {
  //             reject(new Error('Error al crear el Blob de la imagen'));
  //           }
  //         }, 'image/jpeg', quality);
  //       };

  //       compressImage(0.9);
  //     };

  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // }
  // updateRuta(){
  //   this.modalSS.$modal.emit(false);
  //   const ruta = new Ruta(
  //     this.createRutaForm.get('nombre')?.value,
  //     this.createRutaForm.get('fecha_creacion')?.value,
  //     this.createRutaForm.get('estado')?.value,
  //     this.createRutaForm.get('imagen_ruta')?.value
  //   );
  //   this.rutaService.updateRutas(this.token, ruta).subscribe(
  //     (response: any) => {
  //      console.log(response);
  //       location.reload()
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   )
  // }
  // isFormValid() {
  //   return this.persona.nombre.trim() !== '';
  // }
}