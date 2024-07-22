import { Component, OnInit,  Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ColorPickerDirective } from 'ngx-color-picker';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../Modelos/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalizacionesService } from '../../../servicios/personalizaciones.service';
import { Personalizaciones } from '../../../Modelos/personalizaciones.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personalizaciones',
  templateUrl: './personalizaciones.component.html',
  styleUrls: ['./personalizaciones.component.css'], // Cambiado a plural
})
export class PersonalizacionesComponent implements OnInit {
  personalizacionForm: FormGroup;
  selectedColorPrincipal = '#00B3ED';
  selectedColorSecundario = '#ffffff';
  selectedColorTerciario = '#38bdf8';
  previewUrl: any = null;
  faImage = faImage;


  // crear personalización
  token = '';
  user: User | null = null;
  id: number | null = null;
  currentRolId: number;

  @ViewChild('colorPickerPrincipal') colorPickerPrincipal: ColorPickerDirective;
  @ViewChild('colorPickerSecundario') colorPickerSecundario: ColorPickerDirective;
  @ViewChild('colorPickerTerciario') colorPickerTerciario: ColorPickerDirective;


  constructor(private fb: FormBuilder,
    private personalizacionesService: PersonalizacionesService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef) {
    this.personalizacionForm = this.fb.group({
      imagen_Logo: [''],
    })
  }





  ngOnInit(): void {
    this.validateToken();
    this.personalizacionForm = this.fb.group({
      nombre_sistema: ['', Validators.required],
      imagen_Logo: ['', Validators.required],
      color_principal: [this.selectedColorPrincipal, Validators.required],
      color_secundario: [this.selectedColorSecundario, Validators.required],
      color_terciario: [this.selectedColorTerciario, Validators.required],
    })
    this.applyCustomizations();
  }

  validateToken(): void {
    if (!this.token) {
      this.token = localStorage.getItem("token");
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

  onColorChangePrincipal(color: string): void {
    this.selectedColorPrincipal = color;
    this.applyCustomizations(); 
  }



  onColorChangeSecundario(color: string): void {
    this.selectedColorSecundario = color;
    this.applyCustomizations(); 
  }

  onColorChangeTerciario(color: string): void {
    this.selectedColorTerciario = color;
    this.applyCustomizations(); 
  }

  // Resto de tu código...

  updateMenuBackgroundColor(): void { //Agregado
    const menu = this.el.nativeElement.querySelector('.sidebar');
    if (menu) {
      this.renderer.setStyle(menu, 'backgroundColor', this.selectedColorPrincipal);
    }
  }

  updateMenuIconColors(): void {
    const menuIcons = this.el.nativeElement.querySelectorAll('.menu-icon');
    const menuIconTexts = this.el.nativeElement.querySelectorAll('.menu-icon-text');

    menuIcons.forEach((icon: HTMLElement) => {
      this.renderer.setStyle(icon, 'color', this.selectedColorSecundario);
    });

    menuIconTexts.forEach((text: HTMLElement) => {
      this.renderer.setStyle(text, 'color', this.selectedColorSecundario);
    });
  }

  updateButtonColors(): void {
    const buttons = this.el.nativeElement.querySelectorAll('.button-custom');
    buttons.forEach((button: HTMLElement) => {
      this.renderer.setStyle(button, 'backgroundColor', this.selectedColorTerciario);
    });
  } //Agregado

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



  // metodo agregar personalizacion
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
          color_terciario: this.selectedColorTerciario,
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

  applyCustomizations(): void {
    this.updateMenuBackgroundColor();
    this.updateMenuIconColors();
    this.updateButtonColors();
  }


}