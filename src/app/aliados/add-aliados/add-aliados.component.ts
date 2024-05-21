import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ListAliadosComponent } from '../list-aliados/list-aliados.component';
import { AliadoService } from '../../servicios/aliado.service';
import { Aliado } from '../../Modelos/aliado.model';
import { UserService } from '../../servicios/user.service';

@Component({
  selector: 'app-add-aliados',
  templateUrl: './add-aliados.component.html',
  styleUrl: './add-aliados.component.css',
  providers: [HeaderComponent, ListAliadosComponent, AliadoService, UserService]

})

export class AddAliadosComponent {
  logoUrl: string | ArrayBuffer | null = null;
  nombre: string = '';
  descripcion: string = '';
  ruta: string = '';
  token: string | null = null;

  constructor(private aliadoService: AliadoService,
    private userService: UserService,
    private router: Router,
    private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.validartoken();
    //this.cargarcorreo();
  }

  validartoken(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
      if (!this.token) {
        this.router.navigate(['/inicio/body']);
        // console.log('no lista empresa no esta tomando el token');
      }
    }

    // console.log(localStorage.getItem('documento'));
  }

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