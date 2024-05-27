import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asesoria } from '../../../Modelos/asesoria.model';
import { AsesoriaService } from '../../../servicios/asesoria.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearAsesoriaModalComponent } from '../crear-asesoria-modal/crear-asesoria-modal.component';

@Component({
  selector: 'app-list-asesoria',
  templateUrl: './list-asesoria.component.html',
  styleUrls: ['./list-asesoria.component.css']
})
export class ListAsesoriaComponent implements OnInit {
  asesoriasTrue: Asesoria[] = [];
  asesoriasFalse: Asesoria[] = []; 
  asesorias: Asesoria[] = [];
  barritaColor: string;
  showTrue: boolean = false;
  showFalse: boolean = true; // Set to true by default to show "Sin Asignar" asesorias
  token: string | null = null;
  documento: string | null = null;
  user: any = null;
  currentRolId: string | null = null;

  constructor(
    private asesoriaService: AsesoriaService, 
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.validateToken();
    this.listarAsesoriaTrue();
    this.listarAsesoriaFalse();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        this.documento = this.user.emprendedor.documento;
        this.currentRolId = this.user.id_rol?.toString();
        console.log(this.currentRolId);
      }
    }

    if (!this.token || !this.documento) {
      this.router.navigate(['/inicio/body']);
    }
  }

  loadAsesorias() {
    this.asesorias = [...this.asesoriasTrue, ...this.asesoriasFalse];
  }

  listarAsesoriaTrue() {
    if (this.documento && this.token) {
      const body = {
        documento: this.documento,
        asignacion: true
      };
      this.asesoriaService.getMisAsesorias(body).subscribe(
        response => {
          this.asesoriasTrue = response;
          this.loadAsesorias();
          console.log(this.asesoriasTrue); 
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Documento o token no encontrado en el localStorage');
    }
  }

  listarAsesoriaFalse() {
    if (this.documento && this.token) {
      const body = {
        documento: this.documento,
        asignacion: false
      };

      this.asesoriaService.getMisAsesorias(body).subscribe(
        response => {
          this.asesoriasFalse = response;
          this.loadAsesorias();
          console.log(this.asesoriasFalse); 
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Documento o token no encontrado en el localStorage');
    }
  }

  openCrearAsesoriaModal() {
    const dialogRef = this.dialog.open(CrearAsesoriaModalComponent, {
      width: '400px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Asesoría creada:', result);
        this.listarAsesoriaTrue();
        this.listarAsesoriaFalse();
      }
    });
  }

  changeColor(button) {
    const buttons = document.querySelectorAll('.btn-color');
    buttons.forEach(btn => {
      btn.classList.remove('bg-gray-200');
    });
    button.classList.add('bg-gray-200');
  }

  showSinAsignar() {
    this.showTrue = false;
    this.showFalse = true;
  }

  showAsignadas() {
    this.showTrue = true;
    this.showFalse = false;
  }
}
