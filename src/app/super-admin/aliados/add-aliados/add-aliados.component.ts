import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AliadoService } from '../../../servicios/aliado.service';
import Pica from 'pica';

@Component({
  selector: 'app-add-aliados',
  templateUrl: './add-aliados.component.html',
  styleUrls: ['./add-aliados.component.css']
})
export class AddAliadosComponent {
  nombre: string = '';
  logo: string = '';
  descripcion: string = '';
  tipodato: string = '';
  ruta: string = '';
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
      ruta: this.ruta,
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
    const file = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.pdf)$/i;

    if (file && allowedExtensions.exec(file.name)) {
      if (file.type === 'application/pdf') {
        this.pdfFileName = file.name;
        this.ruta = file.name;
      } else {
        this.compressImage(file).then((compressedImage) => {
          this.logo = compressedImage;
        }).catch((error) => {
          console.error('Error leyendo el archivo:', error);
          alert('Error leyendo el archivo.');
        });
      }
    } else {
      alert('Por favor, seleccione un archivo de imagen (jpg, jpeg, png, gif) o PDF.');
    }
  }

  async compressImage(file: File): Promise<string> {
    const pica = Pica();
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();

    const canvas = document.createElement('canvas');
    const MAX_WIDTH = 500; // Ajusta este valor según sea necesario
    const scale = MAX_WIDTH / img.width;
    canvas.width = MAX_WIDTH;
    canvas.height = img.height * scale;

    await pica.resize(img, canvas, {
      quality: 3,
      alpha: true,
    });

    const compressedImage = await pica.toBlob(canvas, 'image/jpeg', 0.5); // Ajusta la calidad según sea necesario
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(compressedImage);
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (file && allowedExtensions.exec(file.name)) {
      this.compressImage(file).then((compressedImage) => {
        this.ruta = compressedImage;
      }).catch((error) => {
        console.error('Error leyendo el archivo:', error);
        alert('Error leyendo el archivo.');
      });
    } else {
      alert('Por favor, seleccione un archivo de imagen (jpg, jpeg, png, gif)');
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onRutaChange(event: any): void {
    this.rutaSeleccionada = event.target.value;
    if (this.rutaSeleccionada === 'pdf') {
      this.ruta = '';
      this.pdfFileName = '';
      this.pdfFileName = '';
    }
  }

  onPdfSelected(event: any): void {
    const file = event.target.files[0];
    const allowedExtensions = /(\.pdf)$/i;

    if (file && allowedExtensions.exec(file.name)) {
      this.pdfFileName = file.name;
      this.ruta = file.name;
    } else {
      alert('Por favor, seleccione un archivo PDF.');
    }
  }
}
