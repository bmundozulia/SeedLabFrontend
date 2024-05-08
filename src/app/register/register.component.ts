import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import  {  faCoffee  }  from '@fortawesome/free-solid-svg-icons' ;
import { faVenusMars } from '@fortawesome/free-solid-svg-icons';
import {  } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  faGlobe = faVenusMars;
//   faGlobe = ;
}
