import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SwitchService } from '../../../../servicios/switch.service';
import { ModalAddNivelComponent } from '../modal-add-nivel/modal-add-nivel.component';


@Component({
  selector: 'app-add-actividad',
  templateUrl: './add-actividad.component.html',
  styleUrl: './add-actividad.component.css'
})
export class AddActividadComponent implements OnInit {



  ngOnInit() {



  }


  constructor
    (public dialog: MatDialog) {

  }


  addActivityModal() {
    const dialogRef = this.dialog.open(ModalAddNivelComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerro y se devolvio', result);
    });

  }
  activityName: string = ''; // Nombre de la actividad
  levels: any[] = []; // Lista de niveles
  showAddLevelButton: boolean = false; // Control para mostrar el botón "Añadir Nivel"

  // Método para agregar un nuevo nivel
  addLevel() {
    this.levels.push({}); // Puedes definir la estructura del nivel según tus necesidades
  }

  // Método para avanzar al siguiente paso
  goToNext() {
    // Aquí puedes implementar la lógica para avanzar al siguiente paso
    console.log('Nombre de la actividad:', this.activityName);
    console.log('Niveles:', this.levels);

    // Mostrar el botón "Añadir Nivel" después de dar clic en "Siguiente"
    this.showAddLevelButton = true;
  }



}
