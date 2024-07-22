import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faEye, faIdCard, faLandmarkFlag, faMountainCity, faPhone, faVenusMars } from '@fortawesome/free-solid-svg-icons';

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
  styleUrls: ['./registro.component.css']
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
  listDepartamentos: any[] = [];
  listMunicipios: any[] = [];
  departamentoPredeterminado = '';
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;
  email: string;

  currentIndex = 0;
  progressWidth = 0;
  totalFields = 12;

  sections = [
    { title: 'Información Personal', fieldNames: ['nombre', 'apellido', 'nombretipodoc', 'documento'] },
    { title: 'Información Adicional', fieldNames: ['fecha_nacimiento', 'genero', 'password', 'email'] },
    { title: 'Ubicación', fieldNames: ['celular', 'departamento', 'municipio', 'direccion'] }
  ];

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

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateProgress();
    }
  }

  next() {
    if (this.currentIndex < this.sections.length - 1) {
      const currentSectionFields = this.sections[this.currentIndex].fieldNames;
      const allFilled = currentSectionFields.every(field => this.registerForm.get(field)?.value);

      if (!allFilled) {
        this.alertService.errorAlert('Campos Vacíos', 'Por favor, complete todos los campos antes de avanzar.');
        return;
      }

      this.currentIndex++;
      this.updateProgress();
    }
  }

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

  cargarDepartamentos(): void {
    this.departamentoService.getDepartamento().subscribe(
      (data: any[]) => {
        this.listDepartamentos = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onDepartamentoSeleccionado(nombreDepartamento: string): void {
    this.cargarMunicipios(nombreDepartamento);
  }

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

  registro(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.alertService.errorAlert('Error en el Formulario', 'Por favor, complete todos los campos requeridos.');
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
        this.alertService.successAlert('Registro exitoso', response.message);
        this.email = response.email;
        this.router.navigate(['/verification'], { queryParams: { email: this.email } });
      },
      (error) => {
        if (error.status === 400) {
          this.alertService.errorAlert('Error', error.error.message);
        } else {
          this.alertService.errorAlert('Error', error.message);
        }
      }
    );
  }
}
