import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsesoriaService } from '../../servicios/asesoria.service';
import { Asesoria } from '../../Modelos/asesoria.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.component.html',
  styleUrls: ['./asesorias.component.css']
})
export class AsesoriasComponent implements OnInit {
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
      this.loadAsesorias();
    }
  }

  loadAsesorias(): void {
    if (!this.token) return;

    const idAsesor = parseInt(this.currentRolId!, 10); // Asume que el rol ID es el ID del asesor
    const horario = true; // Cambia esto según sea necesario

    this.asesoriaService.mostrarAsesoriasAsesor(idAsesor, horario).subscribe(
      response => {
        console.log('Asesorías cargadas:', response);
        this.asesorias = response;
        this.asesoriasConAsesor = this.asesorias.filter(asesoria => asesoria.Asesor);
        this.asesoriasSinAsesor = this.asesorias.filter(asesoria => !asesoria.Asesor);
      },
      error => {
        console.error('Error al cargar asesorías:', error);
      }
    );
  }
}
