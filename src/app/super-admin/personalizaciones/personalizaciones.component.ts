import { Component, QueryList, ViewChildren, ElementRef } from '@angular/core';

@Component({
  selector: 'app-personalizaciones',
  templateUrl: './personalizaciones.component.html',
  styleUrls: ['./personalizaciones.component.css'], // Cambiado a plural
})
export class PersonalizacionesComponent {
  selectedColorPrincipal = '#C2FFFB';
  selectedColorSecundario = '#C2FFFB';
  previewUrl: any = null;
  

  @ViewChildren('colorPicker') colorPickers: QueryList<ElementRef>;

  openColorPicker(index: number): void {
    const colorPicker = this.colorPickers.toArray()[index];
    if (colorPicker) {
      colorPicker.nativeElement.click();
    }
  }

  onColorChangePrincipal(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedColorPrincipal = input.value;
  }

  onColorChangeSecundario(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedColorSecundario = input.value;
  }

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