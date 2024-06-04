import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../../servicios/switch.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  ngOnInit(): void {

  }

  persona = {
    nombre: ''
  };

  submitted = false;

  constructor(private modalSS: SwitchService) { }

  closeModal() {
    this.modalSS.$modal.emit(false);
  }

  confirmarModal() {
    this.submitted = true;
    if (this.isFormValid()) {
      console.log('Form data:', this.persona);
      // Realizar acción de guardar
      this.modalSS.$modal.emit(false);
    }
  }

  isFormValid() {
    return this.persona.nombre.trim() !== '';
  }
}