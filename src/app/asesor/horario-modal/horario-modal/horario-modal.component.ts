import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsesoriaService } from '../../../servicios/asesoria.service';

@Component({
  selector: 'app-horario-modal',
  templateUrl: './horario-modal.component.html',
  styleUrls: ['./horario-modal.component.css']
})
export class HorarioModalComponent implements OnInit {
  asignarForm: FormGroup;

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
    // Puedes inicializar el formulario aquí si es necesario
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

      this.asesoriaService.agregarHorarioAsesoria(observaciones, idAsesoria, fecha).subscribe(
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
