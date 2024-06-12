import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RutaService } from '../../servicios/rutas.service';
import { SwitchService } from '../../servicios/switch.service'

import { Ruta } from '../../Modelos/ruta.modelo';
import { User } from '../../Modelos/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [RutaService, DatePipe]

})
export class ModalComponent implements OnInit {

  createRutaForm: FormGroup;
  token = '';
  user: User | null = null;
  currentRolId: string | null = null;
  now = new Date();
  formattedDate: string = '';
  submitted: boolean = false;
  private modalSubscription: Subscription;
  isVisible = true;
  

  constructor(
    private modalSS: SwitchService,
    private rutaService: RutaService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.createRutaForm = this.fb.group({
      nombre: [''],
      fecha_creacion: [this.formattedDate],
      estado: ['1']
    });
  }

  ngOnInit(): void {
    this.validateToken();
  }

    validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        this.currentRolId = this.user.id_rol?.toString();
        //console.log(this.currentRolId);
      }
    }
  }

  createRuta() {
    this.modalSS.$modal.emit(false);
    const ruta = new Ruta(
      this.createRutaForm.get('nombre')?.value,
      this.createRutaForm.get('fecha_creacion')?.value,
      this.createRutaForm.get('estado')?.value
    );
    this.rutaService.createRutas(this.token, ruta).subscribe(
      (response:any) => {
        console.log(response);
        
      },
      (error) => {
        console.error(error);
      }
    )
  };

  closeModal() {
    this.modalSS.$modal.emit(false);
  }

  
  

  // isFormValid() {
  //   return this.persona.nombre.trim() !== '';
  // }
}