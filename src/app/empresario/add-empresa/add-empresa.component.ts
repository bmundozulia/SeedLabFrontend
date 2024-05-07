import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-empresa',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './add-empresa.component.html',
  styleUrl: './add-empresa.component.css'
})
export class AddEmpresaComponent {
  faGlobe = faGlobe;
}
