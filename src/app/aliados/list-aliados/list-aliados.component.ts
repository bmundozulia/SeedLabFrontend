import { Component } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-aliados',
  templateUrl: './list-aliados.component.html',
  styleUrl: './list-aliados.component.css'
})
export class ListAliadosComponent {
  faeye = faEye;
  public page!: number;

}
