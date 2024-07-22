import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faLandmarkFlag } from '@fortawesome/free-solid-svg-icons';
import { faMountainCity } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Emprendedor } from '../../../Modelos/emprendedor.model';

import { AlertService } from '../../../servicios/alert.service';
import { AuthService } from '../../../servicios/auth.service';
import { DepartamentoService } from '../../../servicios/departamento.service';
import { MunicipioService } from '../../../servicios/municipio.service';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  providers: [DepartamentoService, MunicipioService, AuthService, AlertService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent implements OnInit {
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


  currentIndex = 0;
  progressWidth = 0; // Añadido para el progreso
  totalFields = 12; // Número total de campos


  updateProgress() {
    let filledFields = 0;
    for (const controlName in this.registerForm.controls) {
      if (this.registerForm.controls.hasOwnProperty(controlName)) {
        const control = this.registerForm.get(controlName);
        if (control && control.value) {
          filledFields++;
        }
      }
    }
    this.progressWidth = (filledFields / this.totalFields) * 100;
  }


  sections = [
    { title: 'Información Personal', fieldNames: ['nombre', 'apellido', 'nombretipodoc', 'documento'] },
    { title: 'Información Adicional', fieldNames: ['fecha_nacimiento', 'genero', 'password', 'email'] },
    { title: 'Ubicación', fieldNames: ['celular', 'departamento', 'municipio', 'direccion'] }
  ];

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateProgress();
    }
  }

  next() {
    if (this.currentIndex < this.sections.length - 1) {
      this.currentIndex++;
      this.updateProgress();
    }
  }



  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private registroService: AuthService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.cargarDepartamentos();

    this.registerForm = this.fb.group({
      documento: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      nombretipodoc: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: ['', [Validators.required, Validators.maxLength(10)]],
      genero: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      municipio: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      estado: '1'
    });
  }



  //Funcion validar password
  passwordValidator(control: AbstractControl) {
    const value = control.value;
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    if (hasUpperCase && hasSpecialChar) {
      return null;
    } else {
      return { passwordStrength: 'La contraseña debe contener al menos una letra mayúscula y un carácter especial *' };
    }
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
        console.log('Municipios cargados:', JSON.stringify(data));
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
    console.log('Errores del formulario:', this.registerForm.errors);
    console.log('Controles del formulario:', this.registerForm.controls);

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
        this.alertService.successAlert('Registro exitoso', response.message);
        this.email = response.email; // Obtiene el correo electrónico de la respuesta

        this.router.navigate(['/verification'], { queryParams: { email: this.email } });
      },
      (error) => {
        console.log('Error en el registro', error);
        if (error.status === 400) {
          this.alertService.errorAlert('Error', error.error.message)
        } else if (this.errorMessage = error.error.message) {
          this.alertService.errorAlert('Error', error.message)
        }
      }
    );
  }

}