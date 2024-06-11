import { Component } from '@angular/core';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
  providers: [HeaderComponent],

})
export class ReportesComponent {
  faPrint = faPrint;

}
