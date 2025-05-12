import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService, Student } from '../services/student.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  paginatedStudents: Student[] = [];
  
  currentPage: number = 1;
  pageSize: number = 2;
  
  searchName: string = '';
  selectedGradeFilter: string = 'all';
  selectedGenderFilter: string = 'all';
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
      this.applyFilters();
    });
  }
  editStudent(id: number) {
    this.router.navigate(['/edit-student', id]);
  }
  applyFilters() {
    this.filteredStudents = this.studentService.filterStudents(
      this.searchName,
      this.selectedGradeFilter,
      this.selectedGenderFilter,
      this.sortOrder
    );
    this.updatePaginatedStudents();
  }

  updatePaginatedStudents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStudents = this.filteredStudents.slice(startIndex, endIndex);
  }

  goToNextPage() {
    if ((this.currentPage * this.pageSize) < this.filteredStudents.length) {
      this.currentPage++;
      this.updatePaginatedStudents();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedStudents();
    }
  }

  goToAddStudent() {
    this.router.navigate(['/add-student']);
  }

  deleteStudent(id: number) {
    if(confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.studentService.deleteStudent(id);
    }
  }

  getStatus(mark: number): string {
    if (mark > 12) return 'Validé';
    if (mark >= 8) return 'Rattrapage';
    return 'Éliminatoire';
  }

  getStatusClass(mark: number): string {
    if (mark > 12) return 'status-success';
    if (mark >= 8) return 'status-rattrapage';
    return 'status-eliminated';
  }

  toggleSort() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  getFilterLabel(): string {
    let label = '';
    
    switch (this.selectedGradeFilter) {
      case 'success': label = 'Validés'; break;
      case 'rattrapage': label = 'Rattrapage'; break;
      case 'eliminated': label = 'Éliminatoires'; break;
      default: label = 'Tous'; break;
    }

    if (this.selectedGenderFilter !== 'all') {
      label += ' - ' + (this.selectedGenderFilter === 'male' ? 'Hommes' : 'Femmes');
    }

    return label;
  }
}