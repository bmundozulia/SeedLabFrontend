import { Component, OnInit } from '@angular/core';
import { Asesoria } from '../../Modelos/asesoria.model';
import { AsesoriaService } from '../../servicios/asesoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrearAsesoriaModalComponent } from './crear-asesoria-modal/crear-asesoria-modal.component';

@Component({
  selector: 'app-list-asesoria',
  templateUrl: './list-asesoria.component.html',
  styleUrls: ['./list-asesoria.component.css']
})

export class ListAsesoriaComponent implements OnInit {
  asesorias: Asesoria[] = []; 

  constructor(private asesoriaService: AsesoriaService) { }

  ngOnInit() {
    const documento = localStorage.getItem('documento');
    if (documento) {
      const body = {
        documento: documento,
        asignacion: false
      };

      this.asesoriaService.getMisAsesorias(body).subscribe(
        response => {
          this.asesorias = response;
          console.log(this.asesorias); 
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Documento no encontrado en el localStorage');
    }
  }
}
