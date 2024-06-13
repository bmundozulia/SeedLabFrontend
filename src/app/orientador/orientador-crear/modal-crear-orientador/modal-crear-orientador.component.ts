import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { SwitchService } from '../../../servicios/switch.service';
import { User } from '../../../Modelos/user.model';
import { Orientador } from '../../../Modelos/orientador.model';
import { OrientadorService } from '../../../servicios/orientador.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuperadminService } from '../../../servicios/superadmin.service';

@Component({
  selector: 'app-modal-crear-orientador',
  templateUrl: './modal-crear-orientador.component.html',
  styleUrls: ['./modal-crear-orientador.component.css'],
  providers: [OrientadorService]
})
export class ModalCrearOrientadorComponent implements OnInit {
  @Input() isEditing: boolean = false;
  submitted: boolean = false;
  boton = true;
  estado: boolean;
  isActive: boolean = true;
  token: string | null = null;
  user: User | null = null;
  id: number | null = null;
  currentRolId: string | null = null;
  orientadorId: any;

  orientadorForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    celular: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    estado: true,
  });

  constructor(public dialogRef: MatDialogRef<ModalCrearOrientadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orientadorServices: OrientadorService,
    private superadminService: SuperadminService,

  ) {
    this.orientadorId = data.orientadorId;
    console.log(' en el modal:', this.orientadorId);
  }

  ngOnInit(): void {
    this.validateToken();
    if (this.orientadorId != null) {
      this.isEditing = true;
      this.orientadorForm.get('password')?.setValidators([Validators.minLength(8)]);
      this.verEditar(); // Llama a verEditar si estás editando un orientador
    } else {
      this.orientadorForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
    }
    this.orientadorForm.get('password')?.updateValueAndValidity();
     
  }

  get f() { return this.orientadorForm.controls; } //aquii

  cancelarCrearOrientador() {
    this.dialogRef.close();

  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.currentRolId = this.user.id_rol?.toString();
        this.estado = this.user.estado;
        this.id = this.user.id;
        console.log("this", identity);
      }
    }
  }

  verEditar(): void {
    if (this.orientadorId != null) {
      this.orientadorServices.getinformacionOrientador(this.token, this.orientadorId).subscribe(
        data => {

          this.orientadorForm.patchValue({
            nombre: data.nombre,
            apellido: data.apellido,
            celular: data.celular,
            email: data.email,
            password: '',
            estado: data.estado // Esto establece el valor del estado en el formulario
          }); 
          this.isActive = data.estado === 'Activo'; // Asegura que el estado booleano es correcto
          console.log("Estado inicial:", this.isActive); // Verifica el estado inicial en la consola

          // Forzar cambio de detección de Angular
          setTimeout(() => {
            this.orientadorForm.get('estado')?.setValue(this.isActive);
        });
       },
        error => {
          console.log(error);
        }
      )
    }
  }



  addOrientador(): void {
    this.submitted = true;
    if (this.orientadorForm.invalid) {
      return;
    }
    const orientador: Orientador = {
      nombre: this.orientadorForm.value.nombre,
      apellido: this.orientadorForm.value.apellido,
      celular: this.orientadorForm.value.celular,
      email: this.orientadorForm.value.email,
      password: this.orientadorForm.value.password ? this.orientadorForm.value.password : null,
      estado: this.orientadorForm.value.estado,
    };
    if (this.orientadorId != null) {
      this.orientadorServices.updateOrientador(this.token, this.orientadorId, orientador).subscribe(
        data => {
          location.reload();
          console.log(data);
        },
        error => {
          console.error("Error al actualizar el orientador:", error);
        });
    } else {
      this.orientadorServices.createOrientador(this.token, orientador).subscribe(
        data => {
          location.reload();
        },
        error => {
          console.error("Error al crear el orientador:", error);
        });
    }
  }

  cancelarModal() {
    this.dialogRef.close();
  }

  toggleActive() {

    this.isActive = !this.isActive;
    //this.orientadorForm.patchValue({ estado: this.isActive });
    //console.log("Estado después de toggle:", this.isActive); // Verifica el estado después de toggle
    //this.orientadorForm.patchValue({ estado: this.isActive ? true : false });
    this.orientadorForm.patchValue({ estado: this.isActive ? true : false });
    //console.log("Estado después de toggle:", this.isActive); // Verifica el estado después de toggle
  }


  mostrarToggle(): void {
    if (this.orientadorId != null) {
      this.boton = false;
    }
    this.boton = true;
  }
}
