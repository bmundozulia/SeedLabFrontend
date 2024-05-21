import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { Router } from '@angular/router'; 
import { ListAliadosComponent } from '../list-aliados/list-aliados.component';
 

@Component({
  selector: 'app-add-aliados',
  templateUrl: './add-aliados.component.html',
  styleUrl: './add-aliados.component.css',
  providers: [HeaderComponent, ListAliadosComponent,]

})

export class AddAliadosComponent {
  logoUrl: string | ArrayBuffer | null = null;
  nombre: string = '';
  descripcion: string = '';
  ruta: string = '';

  constructor(private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.logoUrl = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
        console.log('Intentando redirigir a list-aliados...');

    const aliado = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      logoUrl: this.logoUrl,
      ruta: this.ruta
    };

      // Mostrar alerta de éxito
      alert('Creación exitosa');

      // Redirigir a la vista list-aliados después de que el usuario interactúa con la alerta
      this.router.navigate(['list-aliados']).then((navigated: boolean) => {
        if (navigated) {
          console.log('Redirección a list-aliados exitosa.');
        } else {
          console.error('Error al redirigir a list-aliados.');
          alert('Error al redirigir a list-aliados. Por favor, intente nuevamente.');
        }
      });
    }
  }