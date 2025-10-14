import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Batch, Student } from '../../../../models/interface';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-student-create',
  standalone:true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css',
})
export class StudentCreateComponent implements OnInit {
  @Output() formClosed = new EventEmitter<Student | null>();
@Input() selectedStudent: Student | null = null;


  formStudent: Student = {
    studentId: '',
    studentName: '',
    email: '',
    password: '',
    mobileNo: 0,
    batchId: ''
  };
   // Array to populate batch dropdown
    batches: Batch[] = [];

  constructor(
    private apiService:ApiService,
) {}
  


ngOnInit(): void {
    if (this.selectedStudent) {
      this.formStudent = { ...this.selectedStudent };
    }
    this.loadBatches();
  }

    loadBatches() {
    this.apiService.getAllBatches().subscribe({
      next: (data: Batch[]) => this.batches = data,
      error: (err) => console.error('Error fetching batches:', err)
    });
    console.log(this.batches);
  }

onSubmit(form: NgForm) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const mobilePattern = /^[6-9]\d{9}$/;
  const emailValid = emailPattern.test(this.formStudent.email);
  const passwordValid = passwordPattern.test(this.formStudent.password);
  const mobileValid = mobilePattern.test(this.formStudent.mobileNo.toString());

  if (!emailValid) {
    alert('Please enter a valid email address.');
    return;
  }
  if (!passwordValid) {
    alert('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
    return;
  }
  if (!mobileValid) {
    alert('Mobile number must be 10 digits and start with 6, 7, 8, or 9.');
    return;
  }

  if (form.valid) {
    if(this.formStudent.studentId) {
      this.apiService.updateStudent(this.formStudent).subscribe({
        next: (res: any) => {
          console.log('Student updated successfully:', res);
          alert('Student updated successfully!');
          this.closeForm(res); 
        },
        error: (err) => {
          console.error('Error updating student:', err);
          alert('Failed to update student.');
        },
      });
    } 
    
    else {
      this.apiService.createStudent(this.formStudent).subscribe({
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

closeForm(student?: Student) {
  this.formClosed.emit(student || null); 

  this.formStudent = {
    studentId: '',
    studentName: '',
    email: '',
    password: '',
    mobileNo: 0,
    batchId: ''
  };
}

}
