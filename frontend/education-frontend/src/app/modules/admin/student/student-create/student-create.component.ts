import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../../../../models/interface';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-student-create',
   standalone:true,
  imports: [FormsModule], 
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css',
})
export class StudentCreateComponent implements OnInit {
  @Output() formClosed = new EventEmitter<Student | null>();
@Input() selectedStudent: Student | null = null;


  // ✅ Use ONLY this object everywhere
  formStudent: Student = {
    studentId: '',
    studentName: '',
    email: '',
    password: '',
    mobileNo: 0,
    class: ''
  };

  constructor(private studentService: StudentService) {}
  


ngOnInit(): void {
    if (this.selectedStudent) {
      this.formStudent = { ...this.selectedStudent };
    }
  }


onSubmit(form: NgForm) {
  debugger
  if (form.valid) {
    if(this.formStudent.studentId) {
      // ✅ Update existing student
      this.studentService.updateStudent(this.formStudent).subscribe({
        next: (res: any) => {
          console.log('Student updated successfully:', res);
          alert('Student updated successfully!');
          this.closeForm(res); // emit updated student to parent
        },
        error: (err) => {
          console.error('Error updating student:', err);
          alert('Failed to update student.');
        },
      });
    } 
    
    else {
     debugger
      this.studentService.createStudent(this.formStudent).subscribe({
        next: (res: any) => {
          console.log('Student created successfully:', res);
          alert('Student created successfully!');
          this.closeForm(res); // emit new student to parent
        },
        error: (err) => {
          console.error('Error creating student:', err);
          alert('Failed to create student.');
        },
      });
    }
  }
}

  
// Accept optional student parameter
closeForm(student?: Student) {
  this.formClosed.emit(student || null); // emit student if present, otherwise null

  // Reset formStudent
  this.formStudent = {
    studentId: '',
    studentName: '',
    email: '',
    password: '',
    mobileNo: 0,
    class: ''
  };
}

}
