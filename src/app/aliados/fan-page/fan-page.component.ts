import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fan-page',
  templateUrl: './fan-page.component.html',
  styleUrls: ['./fan-page.component.css']
})
export class FanPageComponent implements OnInit {
  myForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  faFileLines = faFileLines;
  hide = true;
  showPassword = faEye;
  faFileUpload = faFileUpload;
  submitted = false; // Agregar propiedad submitted

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      logo: [null, Validators.required],
      formato: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  get f() {
    return this.myForm.controls;
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
      this.myForm.patchValue({ logo: file });
    }
  }

  onSubmit() {
    this.submitted = true; // Establecer submitted a true al enviar el formulario

    // Aquí puedes manejar la lógica de envío del formulario
    if (this.myForm.invalid) {
      return;
    }
    console.log(this.myForm.value);
  }
}
