import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AliadoService } from '../../../servicios/aliado.service';

@Component({
  selector: 'app-add-aliados',
  templateUrl: './add-aliados.component.html',
  styleUrls: ['./add-aliados.component.css'],
  providers: [AliadoService]
})
export class AddAliadosComponent {
  nombre: string = '';
  logo: string = '';
  descripcion: string = '';
  tipodato: string = '';
  ruta: string = ''; // Ruta para la imagen o el video
  pdfRuta: string = ''; // Ruta para el PDF
  email: string = '';
  password: string = '';
  estado: boolean = true;
  token: string | null = localStorage.getItem('token');
  hide = true;
  passwordVisible: boolean = false;
  rutaSeleccionada: string = '';
  pdfFileName: string = '';


  

  constructor(private aliadoService: AliadoService, private router: Router) {}

  onSubmit(): void {
    if (!this.token) {
      console.error('Token no disponible.');
      return;
    }

    if (!this.logo) {
      alert('Por favor, seleccione una imagen.');
      return;
    }
    if (!this.nombre.trim()) {
      alert('Por favor, escriba el nombre de un aliado.');
      return;
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

  async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    if (file && allowedExtensions.exec(file.name)) {
      const resizedImage = await this.resizeAndCompressImage(file, 280, 280, 20 * 1024);
      this.logo = resizedImage;
    } else {
      alert('Por favor, seleccione un archivo de imagen (jpg, jpeg, png, gif).');
    }
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

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onRutaChange(event: any): void {
    this.rutaSeleccionada = event.target.value;
    if (this.rutaSeleccionada === 'pdf') {
      this.pdfFileName = '';
    } else {
      this.pdfRuta = ''; // Limpiar pdfRuta si la ruta seleccionada no es pdf
    }
  }

  onPdfSelected(event: any): void {
    const file = event.target.files[0];
    const allowedExtensions = /(\.pdf)$/i;

    if (file && allowedExtensions.exec(file.name)) {
      this.pdfFileName = file.name;
      this.pdfRuta = 'assets/content/' + this.generateUniqueFileName(file.name);
    } else {
      alert('Por favor, seleccione un archivo PDF.');
    }
  }

  generateUniqueFileName(fileName: string): string {
    // Generar un identificador único para el nombre del archivo para asegurar la unicidad
    const uniqueId = new Date().getTime();
    const extension = fileName.split('.').pop(); // Obtener la extensión del archivo
    return `${uniqueId}.${extension}`;
  }
}