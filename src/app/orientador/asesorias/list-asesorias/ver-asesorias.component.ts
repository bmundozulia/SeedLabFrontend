import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AsesoriaService } from '../../../servicios/asesoria.service';

import { Asesoria } from '../../../Modelos/asesoria.model';
import { DarAliadoAsesoriaModalComponent } from '../dar-aliado-asesoria-modal/dar-aliado-asesoria-modal.component';

@Component({
  selector: 'app-ver-asesorias',
  templateUrl: './ver-asesorias.component.html',
  styleUrls: ['./ver-asesorias.component.css'],
  providers: [AsesoriaService]
})
export class VerAsesoriasComponent implements OnInit {
  asesorias: Asesoria[] = [];
  token: string | null = null;
  user: any = null;
  currentRolId: string | null = null;
  sinAsignarCount: number = 0;
  asignadasCount: number = 0;
  backgroundClass: string = 'bg-red-500'; // Default to 'sin asignar'

  userFilter: any = { Nombre_sol: ''};
  Nombre_sol: string | null = null;

  fullHeightIndices: number[] = [];
  toggleFullHeight(index: number): void {
    const idx = this.fullHeightIndices.indexOf(index);
    if (idx > -1) {
      this.fullHeightIndices.splice(idx, 1);
    } else {
      this.fullHeightIndices.push(index);
    }
  }

  constructor(
    private asesoriaService: AsesoriaService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.validateToken();
    this.loadSinAsignar(); // Load sin asignar by default
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
        this.loadAsesorias(false);
      }
    }

    if (!this.token || !this.currentRolId) {
      this.router.navigate(['/inicio/body']);
    }
  }

  loadAsesorias(pendiente: boolean): void {
    this.asesoriaService.postAsesoriasOrientador(pendiente).subscribe(
      data => {
        console.log('Respuesta de la API:', data); // Escribir la respuesta en la consola
        this.asesorias = data;

        if (pendiente) {
          this.sinAsignarCount = this.asesorias.length; // Actualiza el contador de sin asignar
          this.backgroundClass = 'bg-red-500'; // Set background class for 'sin asignar'
        } else {
          this.asignadasCount = this.asesorias.length; // Actualiza el contador de asignadas
          this.backgroundClass = 'bg-green-500'; // Set background class for 'asignadas'
        }
      },
      error => {
        console.error('Error al obtener las asesorías orientador:', error);
      }
    );
  }

  openModal(asesoria: Asesoria): void {
    const dialogRef = this.dialog.open(DarAliadoAsesoriaModalComponent, {
      width: '400px',
      data: asesoria
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.loadAsesorias(this.backgroundClass === 'bg-[#FFB7B7]'); // Recargar asesorías si el modal se cerró con éxito
      }
    });
  }

  loadSinAsignar(): void {
    this.loadAsesorias(true);
  }

  loadAsignadas(): void {
    this.loadAsesorias(false);
  }
}
