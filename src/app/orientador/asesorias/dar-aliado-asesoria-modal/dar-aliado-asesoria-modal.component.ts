import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsesoriaService } from '../../../servicios/asesoria.service';
import { VerAsesoriasComponent } from '../list-asesorias/ver-asesorias.component';

@Component({
  selector: 'app-dar-aliado-asesoria-modal',
  templateUrl: './dar-aliado-asesoria-modal.component.html',
  styleUrl: './dar-aliado-asesoria-modal.component.css'
})
export class DarAliadoAsesoriaModalComponent {
  asignarForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DarAliadoAsesoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private AsesoriaService: AsesoriaService,
    @Inject(VerAsesoriasComponent) private parentComponent: VerAsesoriasComponent
  ) {
    this.asignarForm = this.fb.group({
      nom_aliado: ['', Validators.required]
    });
  }

  onGuardar(): void {
    if (this.asignarForm.valid) {
      const nombreAliado = this.asignarForm.get('nom_aliado')?.value;
      this.AsesoriaService.asignarAliado(this.data.id, nombreAliado).subscribe(
        response => {
          console.log('Asesoría asignada con éxito:', response);
          this.parentComponent.loadSinAsignar();
          this.parentComponent.loadAsignadas();
          this.dialogRef.close(true); // Puedes cerrar el modal y enviar un valor de éxito si lo deseas
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

  
}
