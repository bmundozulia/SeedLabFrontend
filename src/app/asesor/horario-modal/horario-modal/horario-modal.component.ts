import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.asignarForm = this.fb.group({
      nomAliado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Puedes inicializar el formulario aquí si es necesario
  }

  onGuardar(): void {
    if (this.asignarForm.valid) {
      // Lógica para guardar
      this.dialogRef.close(this.asignarForm.value);
    }
  }
}
