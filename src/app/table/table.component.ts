import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  gender: string;
  date: Date;
  mark: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: './table.component.html',
  styles: [`
     .search-input {
      padding: 8px;
      width: 200px;
      border-radius: 4px;
      border: 1px solid #ddd;
      font-size: 14px;
    }
    .search-input:focus {
      outline: none;
      border-color: #4CAF50;
      box-shadow: 0 0 5px rgba(74, 175, 80, 0.2);
    }
    .filter-container {
      margin: 20px;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 4px;
      display: flex;
      gap: 20px;
    }
    .filter-select {
      padding: 8px;
      width: 200px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .table-container {
      margin: 20px;
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #4CAF50;
      color: white;
    }
    tr:hover {
      background-color: #f5f5f5;
    }
    .status-success {
      color: green;
      font-weight: bold;
    }
    .status-rattrapage {
      color: orange;
      font-weight: bold;
    }
    .status-eliminated {
      color: red;
      font-weight: bold;
    }
  `]
})
export class TableComponent implements OnInit {
  currentPage: number = 1;
pageSize: number = 2; // 2 lignes par page

  students: Student[] = [
    { id: 1, name: 'OUSSAMA', gender: 'male', date: new Date('2000-01-01'), mark: 15 },
    { id: 2, name: 'MARWA', gender: 'female', date: new Date('2001-02-15'), mark: 10 },
    { id: 3, name: 'SALAH', gender: 'male', date: new Date('2000-06-20'), mark: 6 },
    { id: 4, name: 'ASMAA', gender: 'female', date: new Date('2001-03-10'), mark: 13 }
  ];

  filteredStudents: Student[] = [];
  selectedGradeFilter: string = 'all';
  selectedGenderFilter: string = 'all';
  sortOrder: 'asc' | 'desc' = 'desc';

  ngOnInit() {
    this.applyFilters();
  }
  searchName: string = '';
  applyFilters() {
    let filtered = [...this.students];

     // Apply name search filter
     if (this.searchName.trim()) {
      const searchTerm = this.searchName.toLowerCase().trim();
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm)
      );
    }
    // Apply grade filter
    switch (this.selectedGradeFilter) {
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

    // Apply gender filter
    if (this.selectedGenderFilter !== 'all') {
      filtered = filtered.filter(s => s.gender === this.selectedGenderFilter);
    }
    this.filteredStudents = filtered.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a.mark - b.mark;
      } else {
        return b.mark - a.mark;
      }
    });
    
    // Appliquer la pagination ici
    this.updatePaginatedStudents();
    
  }
  paginatedStudents: Student[] = [];

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
    
    // Grade filter label
    switch (this.selectedGradeFilter) {
      case 'success': label = 'Validés'; break;
      case 'rattrapage': label = 'Rattrapage'; break;
      case 'eliminated': label = 'Éliminatoires'; break;
      default: label = 'Tous'; break;
    }

    // Add gender filter label
    if (this.selectedGenderFilter !== 'all') {
      label += ' - ' + (this.selectedGenderFilter === 'male' ? 'Hommes' : 'Femmes');
    }

    return label;
  }
}