import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AliadoService } from '../../../servicios/aliado.service';

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
        this.logo = URL.createObjectURL(file);
      }
    } else {
      alert('Por favor, seleccione un archivo de imagen (jpg, jpeg, png, gif) o PDF.');
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (file && allowedExtensions.exec(file.name)) {
      this.ruta = URL.createObjectURL(file);
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
