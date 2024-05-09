import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-add-empresa',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './add-empresa.component.html',
  styleUrl: './add-empresa.component.css',
  providers: [HeaderComponent] 
})
export class AddEmpresaComponent {
  faGlobe = faGlobe;
  faCircleQuestion = faCircleQuestion;


  mostrarOcultarContenido() {
    const checkbox = document.getElementById("mostrarContenido") as HTMLInputElement;
    const contenidoDiv = document.getElementById("contenido");
    const guardar = document.getElementById("guardar");
    if (contenidoDiv && guardar) {
      contenidoDiv.style.display = checkbox.checked ? "block" : "none";
      guardar.style.display = checkbox.checked ? "none" : "block";
    }
  }


}
