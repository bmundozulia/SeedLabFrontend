import { Component, OnInit } from '@angular/core';
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
  passwordFieldType: string = 'password';
  hide = true;

  constructor(private aliadoService: AliadoService, private router: Router) {}

  onSubmit(): void {
    if (!this.token) {
      console.error('Token no disponible.');
      return;
    }
  
    const aliado = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      logo: this.logo,
      ruta: this.ruta,
      tipodato: this.tipodato,
      email: this.email,
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
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    
    if (file && allowedExtensions.exec(file.name)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logo = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // Mostrar un mensaje de error al usuario indicando que solo se permiten imágenes
      alert('Por favor, seleccione un archivo de imagen (jpg, jpeg, png, gif)');
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
 
}


