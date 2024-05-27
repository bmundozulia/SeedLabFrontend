import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asesoria } from '../../Modelos/asesoria.model';
import { AsesoriaService } from '../../servicios/asesoria.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-asesoria-aliado',
  templateUrl: './asesoria-aliado.component.html',
  styleUrls: ['./asesoria-aliado.component.css']
})
export class AsesoriaAliadoComponent implements OnInit {
  asesorias: Asesoria[] = [];
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
    } else {
      // Llama a loadAsesorias después de que currentRolId se haya establecido
      this.loadAsesorias(parseInt(this.currentRolId), 1);
    }
  }

  loadAsesorias(rol: number, estado: number): void {
    this.asesoriaService.getAsesoriasPorRolYEstado(rol, estado).subscribe(
      data => {
        console.log('Respuesta de la API:', data);
        this.asesorias = data;
      },
      error => {
        console.error('Error al obtener las asesorías:', error);
      }
    );
  }
}
