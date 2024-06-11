import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { SwitchService } from '../../../servicios/switch.service';
import { User } from '../../../Modelos/user.model';
import { Orientador } from '../../../Modelos/orientador.model';
import { OrientadorService } from '../../../servicios/orientador.service';

@Component({
  selector: 'app-modal-crear-orientador',
  templateUrl: './modal-crear-orientador.component.html',
  styleUrls: ['./modal-crear-orientador.component.css'],
  providers: [OrientadorService]
})
export class ModalCrearOrientadorComponent implements OnInit {
  @Input() isEditing: boolean = false;
  submitted: boolean = false;
  token = '';
  user: User | null = null;
  id: number | null = null;
  currentRolId: string | null = null;


  orientadorForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    celular: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    estado: '1',
  });






  constructor(private modalCRO: SwitchService, private fb: FormBuilder, private orientadorServices: OrientadorService) { }

  ngOnInit(): void {
    this.validateToken();
  }

  cancelarCrearOrientador() {
    this.modalCRO.$modalCrearOrientador.emit(false);
  }



  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        this.id = this.user.id;
        this.currentRolId = this.user.id_rol?.toString();
        console.log(this.currentRolId);
      }
    }
  }

  addOrientador(): void {
    this.submitted = true;

    if (this.orientadorForm.valid) {
      const orientador: Orientador = {
        nombre: this.orientadorForm.value.nombre,
        apellido: this.orientadorForm.value.apellido,
        celular: this.orientadorForm.value.celular,
        email: this.orientadorForm.value.email,
        password: this.orientadorForm.value.password,
        estado: this.orientadorForm.value.estado,
      }
      this.orientadorServices.createOrientador(this.token, orientador).subscribe(
        data => {
          console.log("si funciona");
          location.reload();
        },
        error => {
          console.error("No funciona", error);
        }
      )
    }
  }


}
