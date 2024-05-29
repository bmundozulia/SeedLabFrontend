import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsesoriaService } from '../../../servicios/asesoria.service';
import { AliadoService } from '../../../servicios/aliado.service';

@Component({
  selector: 'app-dar-aliado-asesoria-modal',
  templateUrl: './dar-aliado-asesoria-modal.component.html',
  styleUrls: ['./dar-aliado-asesoria-modal.component.css']
})
export class DarAliadoAsesoriaModalComponent {
  asignarForm: FormGroup;
  aliados: any[] = []; 

  constructor(
    public dialogRef: MatDialogRef<DarAliadoAsesoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private asesoriaService: AsesoriaService,
    private aliadoService: AliadoService
  ) {
    this.asignarForm = this.fb.group({
      nom_aliado: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadAliados();
  }

  onGuardar(): void {
    if (this.asignarForm.valid) {
      const nombreAliado = this.asignarForm.get('nom_aliado')?.value;
      this.asesoriaService.asignarAliado(this.data.id, nombreAliado).subscribe(
        response => {
          console.log('Asesoría asignada con éxito:', response);
          this.dialogRef.close(true); // Cerrar el modal y enviar un valor de éxito si lo deseas
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

  loadAliados(): void {
    this.aliadoService.mostrarAliado().subscribe(
      (data: any[]) => {
        this.aliados = data;
        console.log(this.aliados);
      },
      error => {
        console.error('Error al obtener la lista de aliados:', error);
      }
    );
  }
}
