import { Component, OnInit, input } from '@angular/core';
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
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartamentoService } from '../../servicios/departamento.service';
import { EmprendedorService } from '../../servicios/emprendedor.service';
import { MunicipioService } from '../../servicios/municipio.service';
import { RegistroService } from '../../servicios/registro.service';
import { Router } from '@angular/router';
import { Emprendedor } from '../../Modelos/emprendedor.model';
import { PerfilEmprendedor } from '../../Modelos/perfil-emprendedor.model';
import { User } from '../../Modelos/user.model';


@Component({
  selector: 'app-perfil-emprendedor',
  templateUrl: './perfil-emprendedor.component.html',
  styleUrl: './perfil-emprendedor.component.css'
})
export class PerfilEmprendedorComponent implements OnInit {
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
  submitted = false;
  errorMessage: string | null = null;
  email: string;
  token = '';
  blockedInputs = true; // Inicialmente bloqueados
  bloqueado = true;
  documento: string;
  user: User | null = null;
  currentRolId: string | null = null;
  emprendedorForm = this.fb.group({
    documento: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    celular: ['', [Validators.required, Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10), this.passwordValidator]],
    genero: ['', Validators.required],
    fecha_nac: ['', Validators.required],
    direccion: ['', Validators.required],
    nombretipodoc: new FormControl({ value: '', disabled: true }, Validators.required), // Aquí se deshabilita el campo
    municipio: ['', Validators.required],
  });
  registerForm: FormGroup; //ahorita quitarlo
  listEmprendedor: PerfilEmprendedor[] = [];
  originalData: any;
  perfil: '';
  boton: boolean;

  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private emprendedorService: EmprendedorService,
    private registroService: RegistroService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.validateToken();
    this.verEditar();
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

  verEditar(): void {
    if (this.token) {
      this.emprendedorService.getInfoEmprendedor(this.token, this.documento).subscribe(
        (data) => {
          this.emprendedorForm.patchValue({
            documento: data.documento,
            nombre: data.nombre,
            apellido: data.apellido,
            celular: data.celular,
            email: data.auth ? data.auth.email : '',
            password: data.password,
            genero: data.genero,
            fecha_nac: data.fecha_nac,
            direccion: data.direccion,
            nombretipodoc: data.id_tipo_documento ? data.id_tipo_documento.toString() : '',
            municipio: data.id_municipio ? data.id_municipio.toString() : ''
          });
          console.log(data);

        },
        (err) => {
          console.log(err);
        }
      );
    }
  }


  updateEmprendedor(): void {
    const perfil: PerfilEmprendedor = {
      documento: this.emprendedorForm.get('documento')?.value,
      id_tipo_documento: this.emprendedorForm.get('nombretipodoc')?.value,
      nombre: this.emprendedorForm.get('nombre')?.value,
      apellido: this.emprendedorForm.get('apellido')?.value,
      celular: this.emprendedorForm.get('celular')?.value,
      email: this.emprendedorForm.get('email')?.value,
      password: this.emprendedorForm.get('password')?.value,
      genero: this.emprendedorForm.get('genero')?.value,
      fecha_nac: this.emprendedorForm.get('fecha_nac')?.value,
      direccion: this.emprendedorForm.get('direccion')?.value,
      estado: this.emprendedorForm.get('estado')?.value,
      id_municipio: this.emprendedorForm.get('municipio')?.value,
    }
    this.emprendedorService.updateEmprendedor(perfil, this.token, this.documento).subscribe(
      (data) => {
        location.reload();
      },
      (err) => {
        console.log(err);
      }
    )
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

  //para que no me deje editar el nombre del tipo del documento
  toggleInputsLock(): void {
    this.blockedInputs = !this.blockedInputs;
    const fieldsToToggle = ['documento', 'nombre', 'apellido', 'celular', 'email', 'password', 'genero', 'fecha_nac', 'direccion', 'municipio'];
    fieldsToToggle.forEach(field => {
      const control = this.emprendedorForm.get(field);
      if (control && field !== 'nombretipodoc') {
        if (this.blockedInputs) {
          control.disable();
        } else {
          control.enable();
        }
      }
    });
  }

  // Restaura los datos originales
  onCancel(): void {
    this.verEditar();
  }

  mostrarGuardarCambios(): void {
    this.boton = false;
  }

}
