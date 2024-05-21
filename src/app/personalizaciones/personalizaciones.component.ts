import { Component, QueryList, ViewChildren, ElementRef } from '@angular/core';



@Component({
  selector: 'app-personalizaciones',
  templateUrl: './personalizaciones.component.html',
  styleUrls: ['./personalizaciones.component.css']
})
export class PersonalizacionesComponent {
  selectedColorPrincipal = '#C2FFFB';
  selectedColorSecundario = '##C2FFFB';
  previewUrl: any = null;


  @ViewChildren('colorPicker') colorPickers: QueryList<ElementRef>;

  openColorPicker(index: number) {
    const colorPicker = this.colorPickers.toArray()[index];
    if (colorPicker) {
      colorPicker.nativeElement.click();
    }
  }

  onColorChangePrincipal(event) {
    this.selectedColorPrincipal = event.target.value;
  }

  onColorChangeSecundario(event) {
    this.selectedColorSecundario = event.target.value;
  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.previewUrl = reader.result;
      }
    }
  }
  
}


