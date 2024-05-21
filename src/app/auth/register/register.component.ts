import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import { faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { faMountainCity } from '@fortawesome/free-solid-svg-icons';
import { faLandmarkFlag } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartamentoService } from '../../servicios/departamento.service';
import { MunicipioService } from '../../servicios/municipio.service';
import { RegistroService } from '../../servicios/registro.service';
import { Router } from '@angular/router';
import { Emprendedor } from '../../Modelos/emprendedor.model';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  providers: [DepartamentoService, MunicipioService, RegistroService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  faVenusMars = faVenusMars;
  faMountainCity = faMountainCity;
  faLandmarkFlag = faLandmarkFlag;
  showPassword = faEye;
  faIdCard = faIdCard;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  hide = true;
  name: string | null;
  listDepartamentos: any[] = [];
  listMunicipios: any[] = [];
  departamentoPredeterminado = '';
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;
  email: string;




  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private registroService: RegistroService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cargarDepartamentos();

    this.registerForm = this.fb.group({
      documento: ['', Validators.required],
      nombretipodoc: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: ['', Validators.required],
      genero: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      municipio: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      estado: '1'
    });
  }

  get f() { return this.registerForm.controls; }


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

  //Funcion para registrar un emprendedor
  registro(): void {
    this.submitted = true;
    console.log('Formulario enviado', this.registerForm.value);
    if (this.registerForm.invalid) {
      console.log('Formulario inválido');
      return;
    }


    const emprendedor = new Emprendedor(
      this.f.documento.value,
      this.f.nombretipodoc.value,
      this.f.nombre.value,
      this.f.apellido.value,
      this.f.celular.value,
      this.f.email.value,
      this.f.password.value,
      this.f.genero.value,
      this.f.fecha_nacimiento.value,
      this.f.direccion.value,
      this.f.estado.value,
      this.f.municipio.value
    );

    this.registroService.registrar(emprendedor).subscribe(
      (response: any) => {
        console.log(response);
        console.log('Registro exitoso', response);
        this.email = response.email; // Obtener el correo electrónico de la respuesta

        this.router.navigate(['/verification'], { queryParams: { email: this.email } });
      },
      (error) => {
        console.log('Error en el registro', error);
        this.errorMessage = error.error.message || 'An error occurred during registration.';
      }
    );
  }

}




