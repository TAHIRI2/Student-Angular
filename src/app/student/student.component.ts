import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService, Student } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  studentForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService
  ) {
    const nextId = this.studentService.getNextId();
    this.studentForm = this.fb.group({
      id: [nextId],
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      date: ['', Validators.required],
      mark: ['', [Validators.required, this.markValidator()]]
    });
  }

  // Validateur personnalisé pour la note
  markValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const mark = control.value;
      if (isNaN(mark) || mark < 0 || mark > 20) {
        return { invalidMark: true };
      }
      return null;
    };
  }

  // Getters pour accéder facilement aux champs du formulaire
  get f() { return this.studentForm.controls; }

  submitStudent() {
    this.submitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    const newStudent: Student = {
      ...this.studentForm.value,
      date: new Date(this.studentForm.value.date)
    };

    this.studentService.addStudent(newStudent);
    this.router.navigate(['/']);
  }

  goToList() {
    this.router.navigate(['/']);
  }
}