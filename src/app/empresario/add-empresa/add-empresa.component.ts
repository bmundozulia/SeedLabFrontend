import { Component } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../../header/header.component';
import { AddEmpresaService } from '../../servicios/add-empresa.service';
import { FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa } from '../../Modelos/empresa.model';
import { DepartamentoService } from '../../servicios/departamento.service';
import { MunicipioService } from '../../servicios/municipio.service';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.component.html',
  styleUrl: './add-empresa.component.css',
  providers: [HeaderComponent,AddEmpresaService, DepartamentoService, MunicipioService] 
})

export class AddEmpresaComponent{
  faGlobe = faGlobe;
  faCircleQuestion = faCircleQuestion;
  addEmpresaForm:FormGroup;
  listDepartamentos: any[] = [];
  listMunicipios: any[] = [];
  departamentoPredeterminado = '';

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private addEmpresaService:AddEmpresaService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
  ){}

  ngOnInit(): void {
      this.addEmpresaForm = this.fb.group({
        nombre:['',Validators.required],
        apellido:['',Validators.required],
        nombretipodoc: ['', Validators.required],
        documento:['',Validators.required],
        cargo:['',Validators.required],
        razonSocial:['',Validators.required],
        url_pagina:['',Validators.required],
        telefono:['',Validators.required],
        celular:['',Validators.required],
        email:['',Validators.required],
        direccion:['',Validators.required],
        profesion:['',Validators.required],
        experiencia:['',Validators.required],
        funciones:['',Validators.required],
        municipio:['',Validators.required],
      });
      this.cargarDepartamentos();
  }

  get f() { return this.addEmpresaForm.controls; }

  crearEmpresa():void {
    const empresa = new Empresa(
      this.f.nombre.value,
      this.f.apellido.value,
      this.f.nombreDepartamento.value,
      this.f.documento.value,
      this.f.cargo.value,
      this.f.razonSocial.value,
      this.f.url_pagina.value,
      this.f.telefono.value,
      this.f.celular.value,
      this.f.email.value,
      this.f.profesion.value,
      this.f.experiencia.value,
      this.f.funciones.value,
      this.f.direccion.value,
      this.f.municipio.value
    );
    this.addEmpresaService.addEmpresa(this.addEmpresaForm.value).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/emprendedores']);
      },
      error => {
        console.log(error);
      }
    );
  }


  mostrarOcultarContenido() {
    const checkbox = document.getElementById("mostrarContenido") as HTMLInputElement;
    const contenidoDiv = document.getElementById("contenido");
    const guardar = document.getElementById("guardar");
    if (contenidoDiv && guardar) {
      contenidoDiv.style.display = checkbox.checked ? "block" : "none";
      guardar.style.display = checkbox.checked ? "none" : "block";
    }
  }

  //Funcion para cargar los departamentos
  cargarDepartamentos(): void {
    this.departamentoService.getDepartamento().subscribe(
      (data: any[]) => {
        this.listDepartamentos = data;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  //Funcion para traer el nombre del departamento seleccionado
  onDepartamentoSeleccionado(nombreDepartamento: string): void {
    this.cargarMunicipios(nombreDepartamento);
  }

  //Funcion para cargar los municipios
  cargarMunicipios(nombreDepartamento: string): void {
    this.municipioService.getMunicipios(nombreDepartamento).subscribe(
      data => {
        this.listMunicipios = data;
      },
      err => {
        console.log('Error al cargar los municipios:', err);
      }
    );
  }

}
