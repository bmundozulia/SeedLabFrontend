import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { faMagnifyingGlass, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { HeaderComponent } from '../../../header/header.component';

import { EmprendedorService } from '../../../servicios/emprendedor.service';

import { Empresa } from '../../../Modelos/empresa.model';
import { User } from '../../../Modelos/user.model';

@Component({
  selector: 'app-list-empresas',
  providers: [EmprendedorService, HeaderComponent],
  templateUrl: './list-empresas.component.html',
  styleUrls: ['./list-empresas.component.css']
})

export class ListEmpresasComponent implements OnInit {
  faPen = faPenToSquare;
  listaEmpresas: Empresa[] = [];
  listaUser: User[] = [];
  documento: string | null;
  public page!: number;
  token: string | null = null;
  isLoading: boolean = true; // Variable para gestionar el estado de carga
  userFilter: any = { nombre: ''};
  falupa = faMagnifyingGlass;



  constructor(private emprendedorService: EmprendedorService, 
    private router: Router, 
    private aRoute: ActivatedRoute, 
    private fb: FormBuilder,) {
    this.documento = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.validartoken();
    this.cargarEmpresas();
  }

  validartoken(): void {
    this.token = localStorage.getItem('token');
    this.documento = localStorage.getItem('documento');
    if (!this.token || !this.documento) {
      this.router.navigate(['/inicio/body']);
    }
  }

  cargarEmpresas(): void {
    if (this.token) {
      this.emprendedorService.getEmpresas(this.token, this.documento).subscribe(
        (data) => {
          setTimeout(() => {
            this.listaEmpresas = data;
            this.isLoading = false;
          }, 500);
        },
        (err) => {
          console.log(err);
          setTimeout(() => {
            this.isLoading = false;
          }, 500); 
        }
      );
    }
  }
}
