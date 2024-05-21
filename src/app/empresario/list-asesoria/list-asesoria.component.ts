import { Component, OnInit } from '@angular/core';
import { Asesoria } from '../../Modelos/asesoria.model';
import { AsesoriaService } from '../../servicios/asesoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrearAsesoriaModalComponent } from './crear-asesoria-modal/crear-asesoria-modal.component';

@Component({
  selector: 'app-list-asesoria',
  templateUrl: './list-asesoria.component.html',
  styleUrls: ['./list-asesoria.component.css']
})
export class ListAsesoriaComponent implements OnInit {
  token: string | null = null;
  documento: string | null = null;
  listaAsesorias: Asesoria[] = [];

  constructor(
    private asesoriaService: AsesoriaService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.documento = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.validartoken();
    this.cargarAsesoriasTrue();
    this.cargarAsesoriasFalse();
  }
  
  validartoken(): void {
    this.token = localStorage.getItem('token');
    this.documento = localStorage.getItem('documento');
    if (!this.token || !this.documento) {
      this.router.navigate(['/inicio/body']);
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
        // Recargar asesorías si es necesario
        this.cargarAsesoriasTrue();
        this.cargarAsesoriasFalse();
      }
    });
  }

  cargarAsesoriasTrue(): void {
    if (this.token && this.documento) {
      this.asesoriaService.getAsesorias(this.token, this.documento, true).subscribe(
        (data) => {
          this.listaAsesorias = this.listaAsesorias.concat(data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  cargarAsesoriasFalse(): void {
    if (this.token && this.documento) {
      this.asesoriaService.getAsesorias(this.token, this.documento, false).subscribe(
        (data) => {
          this.listaAsesorias = this.listaAsesorias.concat(data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  changeColor(button) {
    const buttons = document.querySelectorAll('.btn-color');
    buttons.forEach(btn => {
      btn.classList.remove('bg-gray-200');
    });
    button.classList.add('bg-gray-200');
  }
}
