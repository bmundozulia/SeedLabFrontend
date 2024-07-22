import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsesoriaService } from '../../../servicios/asesoria.service';
import { AsesorDisponible } from '../../../Modelos/AsesorDisponible.model';
import { Router } from '@angular/router';
import { AlertService } from '../../../servicios/alert.service';

@Component({
  selector: 'app-dar-asesor-modal',
  templateUrl: './asignar-asesor-modal.component.html',
  styleUrls: ['./asignar-asesor-modal.component.css'],
  providers: [AsesoriaService, AlertService]
})
export class AsignarAsesorModalComponent implements OnInit {
  asignarForm: FormGroup;
  asesores: AsesorDisponible[] = [];
  token: string | null = null;
  user: any = null;
  currentRolId: string | null = null;
  @Output() asesoriaAsignada = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<AsignarAsesorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private asesoriaService: AsesoriaService,
  ) {
    this.asignarForm = this.fb.group({
      nom_asesor: ['', Validators.required]
    });
  }

  /* Inicializa con esas funciones al cargar la pagina */
  ngOnInit() {
    this.validateToken();
  }
  
  /* Valida el token del login */
  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      const identityJSON = localStorage.getItem('identity');
    
      const identity = JSON.parse(identityJSON);
      const idAliado = identity.id;
      this.cargarAsesores(idAliado);
    }
    if (!this.token ) {
      this.router.navigate(['/home']);
  }
}

  onGuardar(): void {
    if (this.asignarForm.valid) {
      const idAsesor = this.asignarForm.get('nom_asesor')?.value;
      const idAsesoria = this.data.asesoria.id_asesoria;

      this.asesoriaService.asignarAsesoria(this.token, idAsesoria, idAsesor).subscribe(
        data => {
          this.asesoriaAsignada.emit(); // Emit the event
          this.dialogRef.close(true);
          this.alertService.successAlert('Exito',data.message);
        },
        error => {
          console.error('Error al asignar asesoría:', error);
          this.alertService.errorAlert('Error',error.error.message);
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
      },
      error => {
        console.error('Error al obtener los asesores disponibles:', error);
      }
    );
  }
}
