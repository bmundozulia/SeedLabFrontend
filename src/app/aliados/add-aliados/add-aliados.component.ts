import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AliadoService } from '../../servicios/aliado.service';
import { User } from '../../Modelos/user.model';
@Component({
  selector: 'app-add-aliados',
  templateUrl: './add-aliados.component.html',
  styleUrls: ['./add-aliados.component.css']
})
export class AddAliadosComponent {
  nombre: string = '';
  descripcion: string = '';
  logoUrl: string = '';
  ruta: string = '';
  user: User | null = null;
  currentRolId: number;
  id: number | null = null;
  tipodato: string = 'valorDelTipoDato'; // Proporciona un valor adecuado
  email: string = 'correo@example.com'; // Proporciona un correo válido
  password: string = 'contraseñaSegura'; // Proporciona una contraseña válida
  estado: number = 1; // Proporciona un estado válido
  token: string | null = localStorage.getItem('token'); // Almacenar el token

  constructor(private aliadoService: AliadoService, private router: Router) {}

  ngOnInit(): void {
    this.validateToken();
    if (!this.token) {
      console.error('Token no disponible.');
      return;
    }

    // Implementar cualquier lógica adicional que necesites en el onInit
  }

  /* Valida el token del login */
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


  onSubmit(): void {
    if (!this.token) {
      console.error('Token no disponible.');
      return;
    }

    const aliado = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      logo: this.logoUrl,
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
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
