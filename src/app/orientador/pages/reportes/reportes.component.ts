import { Component } from '@angular/core';
import { faPrint } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent {
  faPrint = faPrint;

}
