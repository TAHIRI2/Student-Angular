import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Student {
  id: number;
  name: string;
  gender: string;
  date: Date;
  mark: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'OUSSAMA', gender: 'male', date: new Date('2000-01-01'), mark: 15 },
    { id: 2, name: 'MARWA', gender: 'female', date: new Date('2001-02-15'), mark: 10 },
    { id: 3, name: 'SALAH', gender: 'male', date: new Date('2000-06-20'), mark: 6 },
    { id: 4, name: 'ASMAA', gender: 'female', date: new Date('2001-03-10'), mark: 13 }
  ];

  private studentsSubject = new BehaviorSubject<Student[]>(this.students);

  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  filterStudents(
    searchName: string = '', 
    gradeFilter: string = 'all', 
    genderFilter: string = 'all',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Student[] {
    let filtered = [...this.students];

    // Filtre par nom
    if (searchName.trim()) {
      const searchTerm = searchName.toLowerCase().trim();
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filtre par note
    switch (gradeFilter) {
      case 'success':
        filtered = filtered.filter(s => s.mark > 12);
        break;
      case 'rattrapage':
        filtered = filtered.filter(s => s.mark >= 8 && s.mark <= 12);
        break;
      case 'eliminated':
        filtered = filtered.filter(s => s.mark < 8);
        break;
    }

    // Filtre par genre
    if (genderFilter !== 'all') {
      filtered = filtered.filter(s => s.gender === genderFilter);
    }

    // Tri par note
    return filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.mark - b.mark;
      } else {
        return b.mark - a.mark;
      }
    });
  }

  addStudent(student: Student): void {
    this.students.push(student);
    this.studentsSubject.next(this.students);
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);
    this.studentsSubject.next(this.students);
  }

  updateStudent(updatedStudent: Student): void {
    const index = this.students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
      this.studentsSubject.next(this.students);
    }
  }

  getNextId(): number {
    return Math.max(...this.students.map(student => student.id)) + 1;
  }
}