import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsesoriaService } from '../../servicios/asesoria.service';
import { Asesoria } from '../../Modelos/asesoria.model';
import { MatDialog } from '@angular/material/dialog';
import { HorarioModalComponent } from '../horario-modal/horario-modal/horario-modal.component';

@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.component.html',
  styleUrls: ['./asesorias.component.css']
})
export class AsesoriasComponent implements OnInit {
  asesorias: Asesoria[] = [];
  asesoriasConHorario: Asesoria[] = [];
  asesoriasSinHorario: Asesoria[] = [];
  showTrue: boolean = false; // Inicializa en false para no mostrar asesorías con horario al principio
  showFalse: boolean = true; // Inicializa en true para mostrar asesorías sin horario al principio
  token: string | null = null;
  user: any = null;
  filteredAsesorias: Asesoria[] = [];
  currentRolId: string | null = null;

  constructor(
    private asesoriaService: AsesoriaService, 
    public dialog: MatDialog,
    private router: Router
  ) { }
 
  ngOnInit() {
    this.validateToken();
    this.loadAsesoriasFalse();    
    this.loadAsesoriasTrue();
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
      this.loadAsesoriasFalse();
    }
  }

  filterAsesorias(status: boolean): void {
    if (status) {
      this.showTrue = true;
      this.showFalse = false;
      this.filteredAsesorias = this.asesoriasConHorario;
    } else {
      this.showTrue = false;
      this.showFalse = true;
      this.filteredAsesorias = this.asesoriasSinHorario;
    }
  }

  loadAsesoriasFalse(): void {
    if (!this.token) return;
  
    const userData = localStorage.getItem('identity');
    if (!userData) {
      console.error('Error: No se encontraron datos de usuario en el local storage.');
      return;
    }
    const user = JSON.parse(userData);
    const idAsesor = user.id; // Obtener el ID del asesor del objeto de usuario
    const horario = false; // Cambia esto según sea necesario
    this.asesoriaService.mostrarAsesoriasAsesor(idAsesor, horario).subscribe(
      response => {
        console.log('Asesorías sin horario cargadas:', response);
        this.asesoriasSinHorario = response;
      },
      error => {
        console.error('Error al cargar asesorías:', error);
      }
    );
  }

  loadAsesoriasTrue(): void {
    if (!this.token) return;
  
    const userData = localStorage.getItem('identity');
    if (!userData) {
      console.error('Error: No se encontraron datos de usuario en el local storage.');
      return;
    }
    const user = JSON.parse(userData);
    const idAsesor = user.id; // Obtener el ID del asesor del objeto de usuario
    const horario = true; // Cambia esto según sea necesario
    this.asesoriaService.mostrarAsesoriasAsesor(idAsesor, horario).subscribe(
      response => {
        console.log('Asesorías con horario cargadas:', response);
        this.asesoriasConHorario = response;
      },
      error => {
        console.error('Error al cargar asesorías:', error);
      }
    );
  }

  openModal(asesoria: any): void {
    // Logs para depuración
    console.log('Abriendo modal para asesoria:', asesoria);
    if (!asesoria || !asesoria.id) {
      console.error('ID de asesoria no encontrado');
      return;
    }

    const dialogRef = this.dialog.open(HorarioModalComponent, {
      width: '400px',
      data: { asesoria }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Recargar las asesorías después de cerrar el modal
      this.loadAsesoriasFalse();
      this.loadAsesoriasTrue();
    });
  }
}
