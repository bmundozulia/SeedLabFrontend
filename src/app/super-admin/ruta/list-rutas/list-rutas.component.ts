import { Component, OnInit } from '@angular/core';
import { faEye, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-list-rutas',
  templateUrl: './list-rutas.component.html',
  styleUrl: './list-rutas.component.css'
})
export class ListRutasComponent implements OnInit{
  userFilter: any = { nombre: '', estado_usuario: 'Activo' };
  public page!: number;
  listaRutas: [] = [];
  fax= faXmark;
  falupa = faMagnifyingGlass;

  constructor() { }

  ngOnInit(): void {
    
  }



  onEstadoChange(event: any): void {
    const estado = event.target.value;
    //this.cargarAliados(parseInt(estado, 10));
  }
 

  limpiarFiltro(): void {
    this.userFilter = { nombre: '', estado_usuario: 'Activo' };
    // Opcional: recargar los aliados con el estado por defecto
    //this.cargarAliados(1);
  }
}
