import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asesoria } from '../../../Modelos/asesoria.model';
import { AsesoriaService } from '../../../servicios/asesoria.service';
import { MatDialog } from '@angular/material/dialog';
import { DarAliadoAsesoriaModalComponent } from '../dar-aliado-asesoria-modal/dar-aliado-asesoria-modal.component';

@Component({
  selector: 'app-ver-asesorias',
  templateUrl: './ver-asesorias.component.html',
  styleUrls: ['./ver-asesorias.component.css']
})
export class VerAsesoriasComponent implements OnInit {
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

  loadAsesorias(pendiente: boolean = true): void {
    this.asesoriaService.postAsesoriasOrientador(pendiente).subscribe(
      data => {
        console.log('Respuesta de la API:', data); // Escribir la respuesta en la consola
        this.asesorias = data;
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
        this.loadAsesorias(); // Recargar asesorías si el modal se cerró con éxito
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
