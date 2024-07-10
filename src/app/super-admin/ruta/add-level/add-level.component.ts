import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-level',
  templateUrl: './add-level.component.html',
  styleUrl: './add-level.component.css'
})
export class AddLevelComponent {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
      public dialogRef:MatDialogRef<AddLevelComponent>
  ) {}


  cancelModalAddNivel(){
    this.dialogRef.close();
  }

  ngOnInit() {
    this.form = this.fb.group({
      levels: this.fb.array([this.createLevel()])
    });
  }

  get levels(): FormArray {
    return this.form.get('levels') as FormArray;
  }

  createLevel(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      lessons: this.fb.array([this.createLesson()])
    });
  }

  createLesson(): FormGroup {
    return this.fb.group({
      lessonName: ['', Validators.required],
      url: [''],
      description: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  addLevel() {
    this.levels.push(this.createLevel());
  }

  addLesson(level: FormGroup) {
    const lessons = level.get('lessons') as FormArray;
    lessons.push(this.createLesson());
  }

  cancelLesson(level: FormGroup, index: number) {
    const lessons = level.get('lessons') as FormArray;
    if (lessons.length > 1) {
      lessons.removeAt(index);
    }
  }
  



  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
      // Aquí podrías enviar el formulario o realizar otra acción
    }
  }
}
