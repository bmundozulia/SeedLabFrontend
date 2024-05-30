import { Component, OnInit } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SwitchService } from '../../servicios/switch.service';


@Component({
  selector: 'app-orientador-crear',
  templateUrl: './orientador-crear.component.html',
  styleUrl: './orientador-crear.component.css'
})
export class OrientadorCrearComponent implements OnInit {
  faPen = faPenToSquare;
  faPlus = faPlus;
  modalCrearOrientador: boolean;


  constructor(private modalCRO: SwitchService) {

  }

  ngOnInit(): void {

    this.modalCRO.$modalCrearOrientador.subscribe((valor) => { this.modalCrearOrientador = valor })
  }

  OpenModalCrearOrientador() {
    this.modalCrearOrientador = true;
  }




}
