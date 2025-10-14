import { Component } from '@angular/core';
import { Student } from '../../../../models/interface';
import { StudentCreateComponent } from "../student-create/student-create.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-student-list',
  standalone :true,
  imports: [StudentCreateComponent,CommonModule,FormsModule],
  templateUrl: './student-list.component.html',
 styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
constructor(private apiService: ApiService) {}
 students: Student[] = [];
  showForm = false;
selectedStudent: Student | null = null;

 ngOnInit(): void {
    this.loadStudents();
  }

  // ✅ Call service to get students
  loadStudents(): void {
    this.apiService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        console.error('Error loading students:', err);
      }
    });
  }




  editStudent(student: Student) {
    this.selectedStudent = { ...student };
    this.showForm = true;
  }

deleteStudent(studentId: string) {
  debugger
  this.apiService.deleteStudent(studentId).subscribe({
    next: () => {
      this.students = this.students.filter(s => s.studentId !== studentId);
      alert('Student deleted successfully!');
    },
    error: (err) => console.error('Failed to delete student:', err)
  });
}


  closeForm(updatedStudent: Student | null) {
    if (updatedStudent) {
      if (updatedStudent.studentId) {
        // ✅ update
        const index = this.students.findIndex(s => s.studentId === updatedStudent.studentId);
        if (index !== -1) {
          this.students[index] = updatedStudent;
        }
      } else {
        const newId = `S${Date.now()}`; // Use timestamp to create a unique string ID
         this.students.push({ ...updatedStudent, studentId: newId });
      }
    }


    this.showForm = false;
    this.selectedStudent = null;
  }
}
