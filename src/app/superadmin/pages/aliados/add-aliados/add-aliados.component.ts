import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AliadoService } from '../../../../servicios/aliado.service';
import { User } from '../../../../Modelos/user.model';
import { Aliado } from '../../../../Modelos/aliado.model';
import { faEye, faEyeSlash, faFileUpload, faFileLines } from '@fortawesome/free-solid-svg-icons';
import Pica from 'pica';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-add-aliados',
  templateUrl: './add-aliados.component.html',
  styleUrls: ['./add-aliados.component.css'],
  providers: [AliadoService]
})
export class AddAliadosComponent implements OnInit {
  nombre: string = '';
  logo: string = '';
  banner: string = '';
  descripcion: string = '';
  ruta: string = '';
  pdfRuta: string = '';
  email: string = '';
  password: string = '';
  estado: boolean = true;
  token: string;
  hide = true;
  user: User | null = null;
  passwordVisible: boolean = false;
  rutaSeleccionada: string = '';
  pdfFileName: string = '';
  currentRolId: number;
  id: number | null = null;
  compressedImage: string;
  bannerFile: File | null = null;
  selectedBanner: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  aliadoForm: FormGroup;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faFileUpload = faFileUpload;
  faFileLines = faFileLines;

  constructor(private aliadoService: AliadoService,
              private router: Router,
              private formBuilder: FormBuilder,
              private imageCompress: NgxImageCompressService,
              private cdRef: ChangeDetectorRef) {
    this.aliadoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      logo: [null, Validators.required],
      banner: [''],
      ruta: [''],
      tipodato: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      estado: [1]
    });
  }

  ngOnInit(): void {
    this.validateToken();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem('token');
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.id = this.user.id;
        this.currentRolId = this.user.id_rol;
        if (this.currentRolId != 1) {
          this.router.navigate(['/inicio/body']);
        }
      }
    }
    if (!this.token) {
      this.router.navigate(['/inicio/body']);
    }
  }

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.aliadoForm.patchValue({ logo: file });
    }
  }

  addAliado(): void {
    const aliado: Aliado = {
      nombre: this.aliadoForm.get('nombre')?.value,
      descripcion: this.aliadoForm.get('descripcion')?.value,
      logo: this.aliadoForm.get('logo')?.value,
      banner: this.aliadoForm.get('banner')?.value,
      ruta: this.aliadoForm.get('ruta')?.value,
      tipodato: this.aliadoForm.get('tipodato')?.value,
      email: this.aliadoForm.get('email')?.value,
      password: this.aliadoForm.get('password')?.value,
      estado: this.aliadoForm.get('estado')?.value,
    };

    console.log('Datos de aliado:', aliado);

    this.aliadoService.crearAliado(this.token, aliado).subscribe(
      data => {
        console.log('Aliado creado', data);
      },
      err => {
        console.log('Error al crear aliado', err);
      }
    );
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
