import { Component } from '@angular/core';

import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-orientador-crear',

  templateUrl: './orientador-crear.component.html',
  styleUrl: './orientador-crear.component.css'
})
export class OrientadorCrearComponent {
  faPen = faPenToSquare;

}
