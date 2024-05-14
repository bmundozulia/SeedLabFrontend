import { Component } from '@angular/core';
import { EmprendedorService } from '../../servicios/emprendedor.service';
import { Emprendedor } from '../../modelos/emprendedor.model';
import { Empresa } from '../../modelos/empresa.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-empresas',
  standalone: true,
  imports: [CommonModule],
  providers: [EmprendedorService],
  templateUrl: './list-empresas.component.html',
  styleUrl: './list-empresas.component.css'
})
export class ListEmpresasComponent {
listaEmpresas: Empresa[] = [];

documento: string | null;

  constructor (private emprendedorService: EmprendedorService, private _router: Router, private aRoute: ActivatedRoute){
    this.documento = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void{
    this.cargarEmpresas();
    }

  cargarEmpresas():void{
    this.emprendedorService.getEmpresas(this.documento).subscribe(
      data =>{
        this.listaEmpresas = data;
      },
      err => {
        console.log(err);
      });
  }

}
