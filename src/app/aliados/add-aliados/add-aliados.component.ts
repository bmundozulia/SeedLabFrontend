import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ListAliadosComponent } from '../list-aliados/list-aliados.component';
import { AliadoService } from '../../servicios/aliado.service';
import { Aliado } from '../../Modelos/aliado.model';
import { UserService } from '../../servicios/user.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-aliados',
  templateUrl: './add-aliados.component.html',
  styleUrls: ['./add-aliados.component.css'],
  providers: [HeaderComponent, ListAliadosComponent, AliadoService, UserService]
})
export class AddAliadosComponent {
  logoUrl: string | ArrayBuffer | null = null;
  nombre: string = '';
  descripcion: string = '';
  ruta: string = '';
  token: string | null = null;

  constructor(
    private aliadoService: AliadoService,
    private userService: UserService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private imageCompress: NgxImageCompressService,
    private http: HttpClient  
  ) { }

  ngOnInit(): void {
    this.validartoken();
  }

  validartoken(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
      if (!this.token) {
        this.router.navigate(['/inicio/body']);
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result as string;

        this.imageCompress.compressFile(base64String, -1, 50, 50).then(
          result => {
            this.logoUrl = result;
          }
        );
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const aliado = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      logoUrl: this.logoUrl,
      ruta: this.ruta
    };

    // Enviar la imagen base64 al backend
    this.http.post('URL_DE_TU_API', aliado).subscribe(
      response => {
        alert('Creación exitosa');
        this.router.navigate(['list-aliados']).then((navigated: boolean) => {
          if (!navigated) {
            alert('Error al redirigir a list-aliados. Por favor, intente nuevamente.');
          }
        });
      },
      error => {
        alert('Error al enviar la imagen al servidor. Por favor, intente nuevamente.');
      }
    );
  }
}
