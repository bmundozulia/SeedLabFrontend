import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { DarAliadoAsesoriaModalComponent } from '../dar-aliado-asesoria-modal/dar-aliado-asesoria-modal.component';

import { AsesoriaService } from '../../../servicios/asesoria.service';

import { Asesoria } from '../../../Modelos/asesoria.model';

@Component({
  selector: 'app-ver-asesorias',
  templateUrl: './ver-asesorias.component.html',
  styleUrls: ['./ver-asesorias.component.css'],
  providers: [AsesoriaService]
})
export class VerAsesoriasComponent implements OnInit {
  asesorias: Asesoria[] = [];
  asesoriasSinAsesor: Asesoria[] = [];
  asesoriasConAsesor: Asesoria[] = [];
  token: string | null = null;
  user: any = null;
  currentRolId: string | null = null;
  sinAsignarCount: number = 0;
  asignadasCount: number = 0;
  userFilter: any = { Nombre_sol: '' };
  Nombre_sol: string | null = null;
  showAsignadasFlag: boolean = false; // Flag to indicate which list is being shown

  fullHeightIndices: number[] = [];

  constructor(
    private asesoriaService: AsesoriaService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.validateToken();
    this.loadAsignadas();
    this.loadSinAsignar();
     // Load both on init to ensure counts are accurate
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.currentRolId = this.user.id_rol?.toString();
      }
    }

    if (!this.token || !this.currentRolId) {
      this.router.navigate(['/inicio/body']);
    }
  }

  loadAsesorias(pendiente: boolean): void {
    this.asesoriaService.postAsesoriasOrientador(this.token, pendiente).subscribe(
      data => {
        if (pendiente) {
          this.asesoriasSinAsesor = data;
          this.sinAsignarCount = this.asesoriasSinAsesor.length;
        } else {
          this.asesoriasConAsesor = data;
          this.asignadasCount = this.asesoriasConAsesor.length;
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
      if (result) {
        this.loadAsesorias(true);
        this.loadAsesorias(false);
      }
    });
  }

  loadSinAsignar(): void {
    this.showAsignadasFlag = false;
    this.loadAsesorias(true);
  }

  loadAsignadas(): void {
    this.showAsignadasFlag = true;
    this.loadAsesorias(false);
  }
}
