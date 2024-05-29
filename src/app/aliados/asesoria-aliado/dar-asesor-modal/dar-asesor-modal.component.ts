import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsesoriaService } from '../../../servicios/asesoria.service';
import { AsesorDisponible } from '../../../Modelos/AsesorDisponible.model';

@Component({
  selector: 'app-dar-asesor-modal',
  templateUrl: './dar-asesor-modal.component.html',
  styleUrls: ['./dar-asesor-modal.component.css']
})
export class DarAsesorModalComponent implements OnInit {
  asignarForm: FormGroup;
  asesores: AsesorDisponible[] = [];

  constructor(
    public dialogRef: MatDialogRef<DarAsesorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private asesoriaService: AsesoriaService,
  ) {
    this.asignarForm = this.fb.group({
      nom_asesor: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log('Datos de la asesoría recibidos en el modal:', this.data.asesoria);
    const identityJSON = localStorage.getItem('identity');
    if (identityJSON) {
      const identity = JSON.parse(identityJSON);
      const idAliado = identity.id;
      this.cargarAsesores(idAliado);
    }
  }

  onGuardar(): void {
    if (this.asignarForm.valid) {
      const idAsesor = this.asignarForm.get('nom_asesor')?.value;
      const idAsesoria = this.data.asesoria.id_asesoria;

      this.asesoriaService.asignarAsesoria(idAsesoria, idAsesor).subscribe(
        response => {
          console.log('Asesoría asignada con éxito:', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error al asignar asesoría:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  cargarAsesores(idaliado: number): void {
    this.asesoriaService.listarAsesores(idaliado).subscribe(
      data => {
        this.asesores = data;
        console.log('Asesores disponibles:', this.asesores);
      },
      error => {
        console.error('Error al obtener los asesores disponibles:', error);
      }
    );
  }
}
