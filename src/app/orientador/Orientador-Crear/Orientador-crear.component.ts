import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-super-admin',
  templateUrl: './Orientador-crear.component.html',
  standalone: true,
  imports: [FontAwesomeModule],
  styleUrl: './Orientador-crear.component.ts'
})
export class OrientadorCrearComponent {
  faPen = faPenToSquare;

}
