import { Component, OnInit } from '@angular/core';
import { Asesoria } from '../../Modelos/asesoria.model';
import { AsesoriaService } from '../../servicios/asesoria.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearAsesoriaModalComponent } from './crear-asesoria-modal/crear-asesoria-modal.component';

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
  showAll: boolean = true;
  showTrue: boolean = false;
  showFalse: boolean = false;

  constructor(private asesoriaService: AsesoriaService, public dialog: MatDialog) { }

  ngOnInit() {
    this.listarAsesoriaTrue();
    this.listarAsesoriaFalse();
  }

  loadAsesorias() {
    this.asesorias = [...this.asesoriasTrue, ...this.asesoriasFalse];
  }

  listarAsesoriaTrue() {
    const documento = localStorage.getItem('documento');
    if (documento) {
      const body = {
        documento: documento,
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
      console.error('Documento no encontrado en el localStorage');
    }
  }

  listarAsesoriaFalse() {
    const documento = localStorage.getItem('documento');
    if (documento) {
      const body = {
        documento: documento,
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
      console.error('Documento no encontrado en el localStorage');
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
    this.showAll = false;
    this.showTrue = false;
    this.showFalse = true;
  }

  showAsignadas() {
    this.showAll = false;
    this.showTrue = true;
    this.showFalse = false;
  }

  showAllAsesorias() {
    this.showAll = true;
    this.showTrue = false;
    this.showFalse = false;
  }
}
