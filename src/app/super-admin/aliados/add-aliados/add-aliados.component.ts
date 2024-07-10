
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Pica from 'pica';
import { AliadoService } from '../../../servicios/aliado.service';
import { User } from '../../../Modelos/user.model';
import { Aliado } from '../../../Modelos/aliado.model';
import Pica from 'pica';
import { NgxImageCompressService } from 'ngx-image-compress';
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

  aliadoForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    logo: ['', Validators.required],
    banner: [''],
    ruta: ['', Validators.required],
    tipodato: [Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    estado: true,
  })

  constructor(private aliadoService: AliadoService,
    private router: Router,
    private fb: FormBuilder,
    private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
    this.validateToken();
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
    if (!this.email || !this.email.includes('@')) {
      alert('Por favor, ingrese un correo válido con @.');
      return;
    }
    if (!this.descripcion.trim()) {
      alert('Por favor, ingrese una descripción.');
      return;
    }
    if (!this.password || this.password.length < 8) {
      alert('Por favor, ingrese una contraseña válida de mínimo 8 caracteres.');
      return;
    }

    const aliado = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      logo: this.logo,
      ruta: this.tipodato === 'pdf' ? this.generateUniqueFileName(this.pdfFileName) : this.ruta, // Guardar solo el nombre del PDF
      tipodato: this.tipodato,
      email: this.email.trim(),
      password: this.password,
      estado: this.estado
    };

    this.aliadoService.crearAliado(aliado, this.token).subscribe({
      next: (response) => {
        alert('Creación exitosa');
        this.router.navigate(['list-aliados']);
      },
      error: (error) => {
        console.error('Error en la creación del aliado:', error);
        alert(`Error: ${error.message}`);
      }
    });
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
                this.logo = e2.target.result;
               //this.aliadoForm.patchValue({ logo: this.logo });
              };
              reader2.readAsDataURL(blob);
            });
        };
      };
      reader.readAsDataURL(file);
    }
  }

  async onImageSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  //   if (file && allowedExtensions.exec(file.name)) {
  //     const resizedImage = await this.resizeAndCompressImage(file, 280, 280, 20 * 1024);
  //     this.logo = resizedImage;
  //   } else {
  //     alert('Por favor, seleccione un archivo de imagen (jpg, jpeg, png, gif).');
  //   }
  // }
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

}