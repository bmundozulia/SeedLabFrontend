import { Component, ViewChild } from '@angular/core';
import { ColorPickerDirective } from 'ngx-color-picker';

@Component({
  selector: 'app-personalizaciones',
  templateUrl: './personalizaciones.component.html',
  styleUrls: ['./personalizaciones.component.css'], // Cambiado a plural
})
export class PersonalizacionesComponent {
  selectedColorPrincipal = '#C2FFFB';
  selectedColorSecundario = '#C2FFFB';
  previewUrl: any = null;

  @ViewChild('colorPickerPrincipal') colorPickerPrincipal: ColorPickerDirective;
  @ViewChild('colorPickerSecundario') colorPickerSecundario: ColorPickerDirective;

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
      };
    }
  }
  
}