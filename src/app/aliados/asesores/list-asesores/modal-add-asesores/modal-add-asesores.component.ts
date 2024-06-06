import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../Modelos/user.model';
import { Asesor } from '../../../../Modelos/asesor.model';
import { AsesorService } from '../../../../servicios/asesor.service';


@Component({
  selector: 'app-modal-add-asesores',
  templateUrl: './modal-add-asesores.component.html',
  styleUrl: './modal-add-asesores.component.css',
  providers: [AsesorService]
})
export class ModalAddAsesoresComponent implements OnInit {
  hide = true;
  asesorId: any;
  user: User | null = null;
  currentRolId: string | null = null;
  listaAsesores: Asesor[] = [];
  estado: boolean;
  id: number | null = null;
  token: string | null = null;
  nombre: string | null = null;
  nombreAliado: string | null = null;
  asesorForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    celular: ['', [Validators.required, Validators.maxLength(10)]],
    aliado: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]],
    estado: '1',
  });

  constructor(
    public dialogRef: MatDialogRef<ModalAddAsesoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private asesorService: AsesorService,
  ) {      this.asesorId = data.id;
    console.log('ID recibido en el modal:', this.asesorId);

    // Aquí puedes usar el id para cargar los detalles del asesor si es necesario
    }

  ngOnInit(): void {
    this.validateToken();
  }


  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      //console.log(this.token);
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        //console.log(identity);
        this.user = identity;
        this.currentRolId = this.user.id_rol?.toString();
        this.estado = this.user.estado;
        this.id = this.user.id;
        this.nombreAliado = this.user.nombre;
        //console.log("this", identity);

        if (this.user && this.user.nombre) {
          this.nombreAliado = this.user.nombre;
          this.asesorForm.patchValue({ aliado: this.nombreAliado });
        } else {
          console.warn('El nombre del aliado no está definido en el objeto identity');
        }
      } else {
        console.error('No se encontró información de identity en localStorage');
      }
    }
  }


  AddAsesor(): void {
    const asesor: Asesor = {
      nombre: this.asesorForm.get('nombre')?.value,
      apellido: this.asesorForm.get('apellido')?.value,
      celular: this.asesorForm.get('celular')?.value,
      aliado: this.nombreAliado,
      email: this.asesorForm.get('email')?.value,
      password: this.asesorForm.get('password')?.value,
      estado: this.asesorForm.get('estado')?.value,
    }
    console.log("Objeto Asesor:", asesor);
    this.asesorService.createAsesor(this.token, asesor).subscribe(
      data => {
        console.log("siuuuuuuuuu");
        console.log(data);
        location.reload();
      },
      error => {
        console.error('Error al crear el asesor:', error);
      }
    )
  }

}
