import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent {

  constructor(private router: Router) { }

  navigateToDetail() {
    this.router.navigate(['/ruta-detalle']);
  }
}
