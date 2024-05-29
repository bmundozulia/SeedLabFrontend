import { Component } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../../../header/header.component';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartamentoService } from '../../../servicios/departamento.service';
import { MunicipioService } from '../../../servicios/municipio.service';
import { User } from '../../../Modelos/user.model';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faMountainCity } from '@fortawesome/free-solid-svg-icons';
import { faLandmarkFlag } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { catchError, of, switchMap, tap } from 'rxjs';
import { EmpresaService } from '../../../servicios/empresa.service';
import { AlertService } from '../../../servicios/alert.service';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.component.html',
  styleUrl: './add-empresa.component.css',
  providers: [HeaderComponent, EmpresaService, DepartamentoService, MunicipioService, AlertService]
})

export class AddEmpresaComponent {
  faGlobe = faGlobe;
  faCircleQuestion = faCircleQuestion;
  listDepartamentos: any[] = [];
  listMunicipios: any[] = [];
  departamentoPredeterminado = '';
  submitted = false;
  token = '';
  documento: string;
  user: User | null = null;
  currentRolId: string | null = null;
  faIdCard = faIdCard;
  faMountainCity = faMountainCity;
  faLandmarkFlag = faLandmarkFlag;
  faLocationDot = faLocationDot;
  empresaDocumento: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private addEmpresaService: EmpresaService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private alertService: AlertService
  ) {

  }

  ngOnInit(): void {
    this.validateToken();
    this.cargarDepartamentos();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        console.log(identity);
        this.user = identity;
        this.documento = this.user.emprendedor.documento;
        this.currentRolId = this.user.id_rol?.toString();
        console.log(this.currentRolId);
      }
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

  addEmpresaForm = this.fb.group({
    nombre: ['', Validators.required],
    documento: ['', Validators.required],
    id_tipo_documento: ['', Validators.required],
    id_municipio: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    cargo: ['', Validators.required],
    razonSocial: ['', Validators.required],
    url_pagina: ['', Validators.required],
    telefono: [''],
    celular: ['', Validators.required],
    direccion: ['', Validators.required],
    profesion: ['', Validators.required],
    experiencia: ['', Validators.required],
    funciones: ['', Validators.required],
  });

  addApoyoEmpresaForm = this.fb.group({
    documento: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    cargo: ['', Validators.required],
    telefono: [''],
    celular: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    id_tipo_documento: ['', Validators.required],
  });





  crearEmpresa(): void {
    this.submitted = true;
    console.log("Formulario enviado", this.addEmpresaForm.value, this.addApoyoEmpresaForm.value);

    if (this.addEmpresaForm.invalid) {
      console.log("Formulario inválido");
      return;
    }

    const empresa: any = {
      documento: this.addEmpresaForm.get('documento')?.value,
      nombre: this.addEmpresaForm.get('nombre')?.value,
      correo: this.addEmpresaForm.get('correo')?.value,
      cargo: this.addEmpresaForm.get('cargo')?.value,
      razonSocial: this.addEmpresaForm.get('razonSocial')?.value,
      url_pagina: this.addEmpresaForm.get('url_pagina')?.value,
      telefono: this.addEmpresaForm.get('telefono')?.value,
      celular: this.addEmpresaForm.get('celular')?.value,
      direccion: this.addEmpresaForm.get('direccion')?.value,
      profesion: this.addEmpresaForm.get('profesion')?.value,
      experiencia: this.addEmpresaForm.get('experiencia')?.value,
      funciones: this.addEmpresaForm.get('funciones')?.value,
      id_tipo_documento: this.addEmpresaForm.get('id_tipo_documento')?.value,
      id_municipio: this.addEmpresaForm.get('id_municipio')?.value,
      id_emprendedor: this.user?.emprendedor.documento,
    };

    const apoyos = this.addApoyoEmpresaForm.valid ? {
      documento: this.addApoyoEmpresaForm.get('documento')?.value,
      nombre: this.addApoyoEmpresaForm.get('nombre')?.value,
      apellido: this.addApoyoEmpresaForm.get('apellido')?.value,
      cargo: this.addApoyoEmpresaForm.get('cargo')?.value,
      telefono: this.addApoyoEmpresaForm.get('telefono')?.value,
      celular: this.addApoyoEmpresaForm.get('celular')?.value,
      email: this.addApoyoEmpresaForm.get('email')?.value,
      id_tipo_documento: this.addApoyoEmpresaForm.get('id_tipo_documento')?.value,
      id_empresa: empresa.documento,
    } : null;

    const payload = {
      empresa: empresa,
      apoyos: apoyos ? [apoyos] : [] // Enviar un array vacío si no hay apoyos
    };


    this.addEmpresaService.addEmpresa(this.token, payload).pipe(
      tap((response: any) => {
        console.log('Respuesta de la API (empresa creada):', response);
        this.alertService.successAlert('Éxito', 'Registro exitoso');
        this.empresaDocumento = response.documento;
        this.router.navigate(['list-empresa', this.empresaDocumento]);

        location.reload();
      }),
      switchMap((response: any) => {
        if (!apoyos) { 
          return of(null);
        }
        console.log('Datos de apoyoEmpresa con ID de empresa:', apoyos);
        return this.addEmpresaService.addApoyoEmpresa(this.token, apoyos);
      }),
      catchError(error => {
        console.error('Error al crear la empresa o apoyoEmpresa:', error);
        this.alertService.successAlert('Éxito', 'Empresa y apoyo creados');
        this.router.navigate(['list-empresa', this.empresaDocumento]);
        location.reload();
        return of(null);
      })
    ).subscribe(
      (apoyoResponse: any) => {
        if (apoyoResponse) {
          console.log('Respuesta de la API (apoyoEmpresa creado):', apoyoResponse);
          this.alertService.successAlert('Éxito', 'Apoyo Empresa creado');
        }
        // Navegar a la ruta de la empresa después de que se crea la empresa y el apoyo (si existe)
        this.router.navigate(['list-empresa', this.empresaDocumento]);
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
}



