import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AsesoriaService } from '../../../servicios/asesoria.service';

import { AsesorDisponible } from '../../../Modelos/AsesorDisponible.model';

@Component({
  selector: 'app-dar-asesor-modal',
  templateUrl: './dar-asesor-modal.component.html',
  styleUrls: ['./dar-asesor-modal.component.css'],
  providers: [AsesoriaService]
})
export class DarAsesorModalComponent implements OnInit {
  asignarForm: FormGroup;
  asesores: AsesorDisponible[] = [];
  token: string | null = null;
  user: any = null;
  currentRolId: string | null = null;
  @Output() asesoriaAsignada = new EventEmitter<void>();

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
    this.validateToken();
    console.log('Datos de la asesoría recibidos en el modal:', this.data.asesoria);
    const identityJSON = localStorage.getItem('identity');
    if (identityJSON) {
      const identity = JSON.parse(identityJSON);
      const idAliado = identity.id;
      this.cargarAsesores(idAliado);
    }
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
        console.log(this.user);
      }
    }
  }

  onGuardar(): void {
    if (this.asignarForm.valid) {
      const idAsesor = this.asignarForm.get('nom_asesor')?.value;
      const idAsesoria = this.data.asesoria.id_asesoria;

      this.asesoriaService.asignarAsesoria(this.token, idAsesoria, idAsesor).subscribe(
        response => {
          console.log('Asesoría asignada con éxito:', response);
          this.asesoriaAsignada.emit(); // Emit the event
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
    this.asesoriaService.listarAsesores(this.token, idaliado).subscribe(
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
