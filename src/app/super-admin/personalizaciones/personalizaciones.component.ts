import { Component, OnInit, ViewChild } from '@angular/core';

import { ColorPickerDirective } from 'ngx-color-picker';

import { faImage } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../Modelos/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalizacionesService } from '../../servicios/personalizaciones.service';
import { Personalizaciones } from '../../Modelos/personalizaciones.model';
@Component({
  selector: 'app-personalizaciones',
  templateUrl: './personalizaciones.component.html',
  styleUrls: ['./personalizaciones.component.css'], // Cambiado a plural
})
export class PersonalizacionesComponent implements OnInit {
  personalizacionForm: FormGroup;
  selectedColorPrincipal = '#C2FFFB';
  selectedColorSecundario = '#C2FFFB';
  previewUrl: any = null;
  faImage = faImage;


  // crear personalización
  token = '';
  user: User | null = null;
  id: number | null = null;
  currentRolId: string | null = null;

  @ViewChild('colorPickerPrincipal') colorPickerPrincipal: ColorPickerDirective;
  @ViewChild('colorPickerSecundario') colorPickerSecundario: ColorPickerDirective;


  constructor(private fb: FormBuilder, private personalizacionesService: PersonalizacionesService) {
    this.personalizacionForm = this.fb.group({
      imagen_Logo: [''],
    })
  }





  ngOnInit(): void {
    this.validateToken();
    this.personalizacionForm = this.fb.group({
      nombre_sistema: ['', Validators.required],
      imagen_Logo: ['', Validators.required],
      color_principal: ['#C2FFFB', Validators.required],
      color_secundario: ['#C2FFFB', Validators.required],
    })

  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
      let identityJSON = localStorage.getItem('identity');

      if (identityJSON) {
        let identity = JSON.parse(identityJSON);
        this.user = identity;
        this.id = this.user.id;
        this.currentRolId = this.user.id_rol?.toString();
      }
    }
  }

  onColorChangePrincipal(color: string): void {
    this.selectedColorPrincipal = color;
  }



  onColorChangeSecundario(color: string): void {
    this.selectedColorSecundario = color;
  }

  // Resto de tu código...


  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.personalizacionForm.patchValue({
          imagen_Logo: reader.result // Guarda la imagen en base64 en el formulario
        });
      };
    }
  }




  addPersonalizacion(): void {
    try {
      if (this.personalizacionForm.valid) {
        const itemslocal = localStorage.getItem('identity');
        if (!itemslocal) {
          console.error("No se encontró 'identity' en el almacenamiento local.");
          return;
        }
        const id_temp = JSON.parse(itemslocal).id;
        console.log("ID Superadmin:", id_temp);

        const personalizaciones: Personalizaciones = {
          nombre_sistema: this.personalizacionForm.value.nombre_sistema,
          imagen_Logo: this.personalizacionForm.value.imagen_Logo,
          color_principal: this.selectedColorPrincipal,
          color_secundario: this.selectedColorSecundario,
          id_superadmin: id_temp
        };

        console.log("Datos a enviar:", personalizaciones);

        this.personalizacionesService.createPersonalizacion(this.token, personalizaciones).subscribe(
          data => {
            console.log("personalizacion creada", data);
            // console.log("Imagen en base64:", this.personalizacionForm.value.imagen_Logo);
            // alert("Imagen en base64:\n");

            location.reload();
          },
          error => {
            console.error("no funciona", error);
          }
        );
      } else {
        console.error("El formulario no es válido");
        console.log(this.personalizacionForm);
        this.logFormErrors();

      }
    } catch (error) {
      console.error("Ocurrió un error:", error);
    }
  }


  logFormErrors(): void {
    Object.keys(this.personalizacionForm.controls).forEach(key => {
      const controlErrors = this.personalizacionForm.get(key)?.errors;
      if (controlErrors) {
        console.error(`Error en el control ${key}:`, controlErrors);
      }
    });
  }




}