import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { EmprendedorService } from '../../servicios/emprendedor.service';
import { Emprendedor } from '../../Modelos/emprendedor.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Empresa } from '../../Modelos/empresa.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-empresas',
  providers: [EmprendedorService, HeaderComponent],
  templateUrl: './list-empresas.component.html',
  styleUrl: './list-empresas.component.css'
})
export class ListEmpresasComponent implements OnInit {
  @Input() data: any;
  faPen = faPenToSquare;

  listaEmpresas: Empresa[] = [];
  documento: string | null;
  length!: number;
  pageSize = 5;
  pageSizeOptions: number[] = [5];

  pageEvent!: PageEvent;
  lowValue: number;
  highValue: number;



  constructor(private emprendedorService: EmprendedorService, private _router: Router, private aRoute: ActivatedRoute) {
    this.documento = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarEmpresas();
    this.length = this.data.length;
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = event.pageIndex + event.pageSize;
    return event;
  }

  cargarEmpresas(): void {
    this.emprendedorService.getEmpresas(this.documento).subscribe(
      data => {
        this.listaEmpresas = data;
      },
      err => {
        console.log(err);
      });
  }

}
