import { Component } from '@angular/core';
import { faFileLines} from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fan-page',
  templateUrl: './fan-page.component.html',
  styleUrl: './fan-page.component.css'
})
export class FanPageComponent {
  imagePreview: string | ArrayBuffer | null = null;
  faFileLines = faFileLines;
  hide = true;
  showPassword = faEye;
  faFileUpload=faFileUpload;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

}
