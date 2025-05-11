import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  gender: string;
  date: Date;
  mark: number;
}

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  student: Student = {
    id: 0,
    name: '',
    gender: '',
    date: new Date(),
    mark: 0
  };

  submitStudent() {
    console.log('Student submitted:', this.student);
    // Here you can add logic to save the student
  }
}