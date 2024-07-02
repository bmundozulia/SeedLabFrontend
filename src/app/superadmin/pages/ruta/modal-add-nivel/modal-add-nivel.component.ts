import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal-add-nivel',
  templateUrl: './modal-add-nivel.component.html',
  styleUrl: './modal-add-nivel.component.css'
})
export class ModalAddNivelComponent{
  form: FormGroup;

  constructor(private fb: FormBuilder,
      public dialogRef:MatDialogRef<ModalAddNivelComponent>
  ) {
    
  }


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
      description: [''],
      file: [null]
    });
  }

  addLevel() {
    this.levels.push(this.createLevel());
  }

  addLesson(level: FormGroup) {
    const lessons = level.get('lessons') as FormArray;
    lessons.push(this.createLesson());
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
