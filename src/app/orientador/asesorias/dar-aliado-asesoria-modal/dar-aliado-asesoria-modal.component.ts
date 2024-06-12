import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AsesoriaService } from '../../../servicios/asesoria.service';
import { AliadoService } from '../../../servicios/aliado.service';

@Component({
  selector: 'app-dar-aliado-asesoria-modal',
  templateUrl: './dar-aliado-asesoria-modal.component.html',
  styleUrls: ['./dar-aliado-asesoria-modal.component.css'],
  providers: [AsesoriaService, AliadoService]
})
export class DarAliadoAsesoriaModalComponent {
  asignarForm: FormGroup;
  aliados: any[] = []; 
  token: string | null = null;
  currentRolId: string | null = null;
  docEmprendedor: string | null = null;

  user: any;

  constructor(
    public dialogRef: MatDialogRef<DarAliadoAsesoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private asesoriaService: AsesoriaService,
    private aliadoService: AliadoService,
    private router: Router
  ) {
    this.asignarForm = this.fb.group({
      nom_aliado: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.validateToken();
    this.loadAliados();
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
        console.log(this.currentRolId);
        // Asigna el valor del documento del emprendedor a la variable docEmprendedor

      }
    }
    if (!this.token ) {
      this.router.navigate(['/inicio/body']);
    }
  }

  onGuardar(): void {
    if (this.asignarForm.valid) {
      const nombreAliado = this.asignarForm.get('nom_aliado')?.value;
      this.asesoriaService.asignarAliado(this.token, this.data.id, nombreAliado).subscribe(
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
    this.aliadoService.mostrarAliado(this.token).subscribe(
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
