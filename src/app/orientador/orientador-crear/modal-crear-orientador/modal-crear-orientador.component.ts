import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../../../servicios/switch.service';

@Component({
  selector: 'app-modal-crear-orientador',
  templateUrl: './modal-crear-orientador.component.html',
  styleUrl: './modal-crear-orientador.component.css'
})
export class ModalCrearOrientadorComponent implements OnInit {

  constructor(private modalCRO: SwitchService) {

  }
  ngOnInit(): void {

  }

  cancelarCrearOrientador() {
    this.modalCRO.$modalCrearOrientador.emit(false);
  }
  guardarCrearOrientador() {
    this.modalCRO.$modalCrearOrientador.emit(false);
  }
}
