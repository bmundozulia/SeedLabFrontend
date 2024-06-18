import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AsesoriaService } from '../../servicios/asesoria.service';

@Component({
  selector: 'app-horario-modal',
  templateUrl: './horario-modal.component.html',
  styleUrls: ['./horario-modal.component.css']
})
export class HorarioModalComponent implements OnInit {
  asignarForm: FormGroup;
  token: string | null = null;
  user: any = null;
  currentRolId: string | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HorarioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private asesoriaService: AsesoriaService
  ) {
    this.asignarForm = this.fb.group({
      fecha: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
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
        console.log(this.user);
      }
    }
  }

  onGuardar(): void {
    if (this.asignarForm.valid) {
      const { fecha, observaciones } = this.asignarForm.value;
      const idAsesoria = this.data.asesoria.id;

      // Logs para depuración
      console.log('Formulario válido:', this.asignarForm.valid);
      console.log('Fecha:', fecha);
      console.log('Observaciones:', observaciones);
      console.log('ID Asesoria:', idAsesoria);

      this.asesoriaService.agregarHorarioAsesoria(this.token, observaciones, idAsesoria, fecha).subscribe(
        response => {
          console.log('Horario asignado exitosamente', response);
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error al asignar el horario', error);
        }
      );
    } else {
      console.error('Formulario inválido:', this.asignarForm.value);
    }
  }
}
