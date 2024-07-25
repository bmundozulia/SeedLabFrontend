
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AliadoService } from '../../../../servicios/aliado.service';;
import { User } from '../../../../Modelos/user.model';
import { Aliado } from '../../../../Modelos/aliado.model';
import Pica from 'pica';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { faEye, faEyeSlash, faFileUpload, faFileLines } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-add-aliados',
  templateUrl: './add-aliados.component.html',
  styleUrls: ['./add-aliados.component.css'],
  providers: [AliadoService]
})
export class AddAliadosComponent {
  nombre: string = '';
  logo: string = '';
  banner: string = '';
  descripcion: string = '';
  ruta: string = ''; // Ruta para la imagen o el video
  pdfRuta: string = ''; // Ruta para el PDF
  email: string = '';
  password: string = '';
  estado: boolean = true;
  token: string;
  hide = true;
  user: User | null = null;
  passwordVisible: boolean = false;
  rutaSeleccionada: string = '';
  pdfFileName: string = '';
  currentRolId: number;
  id: number | null = null;
  compressedImage: string;
  bannerFile: File | null = null;
  selectedBanner: File | null = null;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faFileUpload = faFileUpload;
  faFileLines = faFileLines;
  imagePreview: string | ArrayBuffer | null = null;
  aliadoid: string;

  bannerForm: FormGroup;
  aliadoForm: FormGroup;

  constructor(private aliadoService: AliadoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private imageCompress: NgxImageCompressService,
    private cdRef: ChangeDetectorRef) {

    this.aliadoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      logo: ['', Validators.required], // Puedes incluir el campo de logo si lo necesitas
      ruta: [''],
      tipodato: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      estado: [1]
    });

    this.bannerForm = this.formBuilder.group({
      urlImagen: [''],
      descripcion: ['', Validators.required],
      estadobanner: ['Activo'],
      color: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.validateToken();
    this.mostrarOcultarContenido();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.id = this.user.id;
        this.currentRolId = this.user.id_rol;
        if (this.currentRolId != 1) {
          this.router.navigate(['/inicio/body']);
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }

  onBannerSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedBanner = file;
      this.bannerForm.patchValue({ urlImagen: file });
    }
  }

  addAliado(): void {
    if (this.aliadoForm.invalid || this.bannerForm.invalid) {
      console.error('Formulario inválido');
      console.log('Errores aliadoForm:', this.getFormValidationErrors(this.aliadoForm));
      console.log('Errores bannerForm:', this.getFormValidationErrors(this.bannerForm));
      return;
    }

    const formData = new FormData();

    const aliado: Aliado = {
      nombre: this.aliadoForm.get('nombre')?.value,
      descripcion: this.aliadoForm.get('descripcion')?.value,
      logo: this.aliadoForm.get('logo')?.value,
      ruta: this.aliadoForm.get('ruta')?.value,
      tipodato: this.aliadoForm.get('tipodato')?.value,
      email: this.aliadoForm.get('email')?.value,
      password: this.aliadoForm.get('password')?.value,
      estado: this.aliadoForm.get('estado')?.value ?? 1,
    };

    Object.keys(this.aliadoForm.value).forEach(key => {
      formData.append(key, this.aliadoForm.get(key)?.value);
    });

    const banner = this.bannerForm.valid ? {
      urlImagen: this.selectedBanner,
      descripcion: this.bannerForm.get('descripcion')?.value,
      estadobanner: this.bannerForm.get('estadobanner')?.value,
      color: this.bannerForm.get('color')?.value,
      id_aliado: aliado.id,
    } : null;

    Object.keys(this.bannerForm.value).forEach(key => {
      if (key === 'urlImagen' && this.selectedBanner) {
        formData.append(`banner[${key}]`, this.selectedBanner, this.selectedBanner.name);
      } else {
        formData.append(`banner[${key}]`, this.bannerForm.get(key)?.value);
      }
    });

    console.log('Payload para la API:', formData);

    this.aliadoService.crearAliado(this.token, formData).subscribe(
      data => {
        console.log('Aliado creado', data);
        this.aliadoid = data.banner.id_aliado;
        console.log('Banner creado', this.aliadoid);
      },
      err => {
        console.error('Error al crear aliado', err);
        if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          alert('Ocurrió un error al crear el aliado');
        }
      }
    );
  }

  getFormValidationErrors(form: FormGroup) {
    const result: any = {};
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors | null = form.get(key)?.errors;
      if (controlErrors) {
        result[key] = controlErrors;
      }
    });
    return result;
  }

  onFileSelecteds(event: any, field: string) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (field === 'urlImagen') {
        this.selectedBanner = file;
        this.bannerForm.patchValue({ urlImagen: file });
      } else {
        this.aliadoForm.patchValue({ [field]: file });
      }
      this.generateImagePreview(file);
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.bannerForm.patchValue({ urlImagen: file });
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
          canvas.width = 600; // Nueva anchura
          canvas.height = 600; // Nueva altura
          const pica = Pica();
          pica.resize(img, canvas)
            .then((result) => pica.toBlob(result, 'image/jpeg', 0.90))
            .then((blob) => {
              const reader2 = new FileReader();
              reader2.onload = (e2: any) => {
                this.logo = e2.target.result; // Base64 string
                this.aliadoForm.patchValue({ logo: this.logo });
              };
              reader2.readAsDataURL(blob);
            });
        };
      };
      reader.readAsDataURL(file);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------





  generateImagePreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  resizeAndCompressImage(file: File, width: number, height: number, maxSize: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const reader = new FileReader();

      reader.onload = (event) => {
        img.src = event.target?.result as string;
      };

      img.onload = () => {
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        const compressImage = (quality: number) => {
          canvas.toBlob((blob) => {
            if (blob) {
              if (blob.size <= maxSize || quality < 0.1) {
                const reader = new FileReader();
                reader.onload = () => {
                  resolve(reader.result as string);
                };
                reader.readAsDataURL(blob);
              } else {
                compressImage(quality - 0.1);
              }
            } else {
              reject(new Error('Error al crear el Blob de la imagen'));
            }
          }, 'image/jpeg', quality);
        };

        compressImage(0.9);
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async onImageSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (file && allowedExtensions.exec(file.name)) {
      const resizedImage = await this.resizeAndCompressImage(file, 280, 280, 20 * 1024);
      this.ruta = resizedImage;
    } else {
      alert('Por favor, seleccione un archivo de imagen (jpg, jpeg, png, gif)');
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  mostrarOcultarContenido() {
    const checkbox = document.getElementById("mostrarContenido") as HTMLInputElement;
    const contenidoDiv = document.getElementById("contenido");
    const guardar = document.getElementById("guardar");
    if (contenidoDiv && guardar) {
      contenidoDiv.style.display = checkbox.checked ? "block" : "none";
      guardar.style.display = checkbox.checked ? "none" : "block";
    }
  }

}