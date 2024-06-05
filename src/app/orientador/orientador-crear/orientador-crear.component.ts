import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SwitchService } from '../../servicios/switch.service';

@Component({
  selector: 'app-orientador-crear',
  templateUrl: './orientador-crear.component.html',
  styleUrls: ['./orientador-crear.component.css']
})
export class OrientadorCrearComponent implements OnInit {
  faPen = faPenToSquare;
  faPlus = faPlus;
  modalCrearOrientador: boolean;
  isEditing: boolean;

  constructor(private modalCRO: SwitchService) { }

  ngOnInit(): void {
    this.modalCRO.$modalCrearOrientador.subscribe((valor) => { this.modalCrearOrientador = valor });
  }

  openModalCrearOrientador() {
    this.isEditing = false;
    this.modalCrearOrientador = true;
  }

  openModalEditarOrientador() {
    this.isEditing = true;
    this.modalCrearOrientador = true;
  }
}
