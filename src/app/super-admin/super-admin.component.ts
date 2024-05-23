import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../servicios/switch.service';



@Component({
  selector: 'app-super-admin',

  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent implements OnInit {

  modalSwitch: boolean;

  constructor(private modalSS: SwitchService) {

  }

  ngOnInit() {

    this.modalSS.$modal.subscribe((valor) => { this.modalSwitch = valor })

  }
  openModal() {
    this.modalSwitch = true;
  }


  persona = {
    tipoDocumento: '',
    descripcion: '',
    titulo: '',
    cuerpo: '',
    links: ''
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (this.isFormValid()) {
      console.log('Form data:', this.persona);
      // Realizar acción de guardar
    }
  }

  isFormValid() {
    return this.persona.tipoDocumento && this.persona.descripcion && this.persona.titulo && this.persona.cuerpo && this.persona.links;
  }
}
