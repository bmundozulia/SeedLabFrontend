import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-super-admin',
  templateUrl: './Orientadorsuper-admin.component.html',
  imports: [FontAwesomeModule],
  styleUrl: './Orientadorsuper-admin.component.css'
})
export class OrientadorSuperAdminComponent {
  faPen = faPenToSquare;

}
