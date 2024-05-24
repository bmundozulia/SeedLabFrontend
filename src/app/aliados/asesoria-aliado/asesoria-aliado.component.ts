import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asesoria } from '../../Modelos/asesoria.model';
import { AsesoriaService } from '../../servicios/asesoria.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-asesoria-aliado',
  templateUrl: './asesoria-aliado.component.html',
  styleUrl: './asesoria-aliado.component.css'
})
export class AsesoriaAliadoComponent {
  asesorias: Asesoria[] = [];
  barritaColor: string;
  token: string | null = null;
  user: any = null;
  currentRolId: string | null = null;

  constructor(
    private asesoriaService: AsesoriaService, 
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.validateToken();
    this.loadAsesorias();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        this.currentRolId = this.user.id_rol?.toString();
        console.log(this.currentRolId);
      }
    }

    if (!this.token || !this.currentRolId) {
      this.router.navigate(['/inicio/body']);
    }
  }

  loadAsesorias(): void {
    this.asesoriaService.getAsesoriasOrientador().subscribe(
      data => {
        console.log('Respuesta de la API:', data); // Escribir la respuesta en la consola
        this.asesorias = data;
      },
      error => {
        console.error('Error al obtener las asesorías orientador:', error);
      }
    );
  }
  
}
