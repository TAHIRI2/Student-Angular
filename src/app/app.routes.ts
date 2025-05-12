import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { StudentComponent } from './student/student.component';

export const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'add-student', component: StudentComponent }
];