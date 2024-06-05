import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwitchService } from '../../../servicios/switch.service';

@Component({
  selector: 'app-modal-crear-orientador',
  templateUrl: './modal-crear-orientador.component.html',
  styleUrls: ['./modal-crear-orientador.component.css']
})
export class ModalCrearOrientadorComponent implements OnInit {
  @Input() isEditing: boolean = false;
  submitted: boolean = false;

  constructor(private modalCRO: SwitchService) { }

  ngOnInit(): void { }

  cancelarCrearOrientador() {
    this.modalCRO.$modalCrearOrientador.emit(false);
  }

  confirmarCrearOrientador(formulario: NgForm) {
    this.submitted = true;

    if (formulario.valid) {
      this.modalCRO.$modalCrearOrientador.emit(false);
    }
  }
}
