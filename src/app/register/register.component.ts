import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import { faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { faMountainCity } from '@fortawesome/free-solid-svg-icons';
import {faLandmarkFlag } from '@fortawesome/free-solid-svg-icons';
import {faEye } from '@fortawesome/free-solid-svg-icons';
import {faIdCard } from '@fortawesome/free-solid-svg-icons';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  faVenusMars = faVenusMars;
  faMountainCity=faMountainCity;
  faLandmarkFlag=faLandmarkFlag;
  showPassword=faEye;
  faIdCard=faIdCard;
  hide = true;

  constructor() {

   }
}


 

