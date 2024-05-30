import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asesoria } from '../../Modelos/asesoria.model';
import { AsesoriaService } from '../../servicios/asesoria.service';
import { MatDialog } from '@angular/material/dialog';
import { DarAsesorModalComponent } from './dar-asesor-modal/dar-asesor-modal.component';

@Component({
  selector: 'app-asesoria-aliado',
  templateUrl: './asesoria-aliado.component.html',
  styleUrls: ['./asesoria-aliado.component.css']
})
export class AsesoriaAliadoComponent implements OnInit {
  asesorias: Asesoria[] = [];
  asesoriasConAsesor: Asesoria[] = [];
  asesoriasSinAsesor: Asesoria[] = [];
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
      this.loadAsesorias(parseInt(this.currentRolId), 1);
    }
  }

  loadAsesorias(rol: number, estado: number): void {
    this.asesoriaService.getAsesoriasPorRolYEstado(rol, estado).subscribe(
      data => {
        console.log('Respuesta de la API:', data);
        this.asesorias = data;
        this.separarAsesorias();
      },
      error => {
        console.error('Error al obtener las asesorías:', error);
      }
    );
  }

  separarAsesorias(): void {
    this.asesoriasConAsesor = this.asesorias.filter(asesoria => asesoria.Asesor);
    this.asesoriasSinAsesor = this.asesorias.filter(asesoria => !asesoria.Asesor);
    console.log('Asesorías con asesor:', this.asesoriasConAsesor);
    console.log('Asesorías sin asesor:', this.asesoriasSinAsesor);
  }

  openModal(asesoria: Asesoria): void {
    const dialogRef = this.dialog.open(DarAsesorModalComponent, {
      width: '400px',
      data: { asesoria: asesoria }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }


  rechazarAsesoria(asesoria: Asesoria): void {
    console.log('Asesoría a rechazar:', asesoria);  // <-- Verifica que tienes el objeto correcto
    if (asesoria && asesoria.id_asesoria) {
      this.asesoriaService.rechazarAsesoria(asesoria.id_asesoria, 'rechazar').subscribe(
        response => {
          console.log('Asesoría rechazada con éxito:', response);
          this.loadAsesorias(parseInt(this.currentRolId!), 1);
        },
        error => {
          console.error('Error al rechazar asesoría:', error);
        }
      );
    } else {
      console.error('Asesoría inválida:', asesoria);
    }
  }
}
