import { Component } from '@angular/core';
import { Student } from '../../../../models/interface';
import { StudentCreateComponent } from "../student-create/student-create.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list',
  imports: [StudentCreateComponent,CommonModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
students: Student[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Angular' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'Java' }
  ];

  showForm = false;
  selectedStudent: Student | null = null;


  editStudent(student: Student) {
    this.selectedStudent = { ...student };
    this.showForm = true;
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
  }

  closeForm(updatedStudent: Student | null) {
    if (updatedStudent) {
      if (updatedStudent.id) {
        // update
        const index = this.students.findIndex(s => s.id === updatedStudent.id);
        if (index !== -1) this.students[index] = updatedStudent;
      } else {
        // create new
        const newId =
          this.students.length > 0
            ? Math.max(...this.students.map(s => s.id)) + 1
            : 1;
        this.students.push({ ...updatedStudent, id: newId });
      }
    }
    this.showForm = false;
    this.selectedStudent = null;
  }
}
