import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Batch, Student } from '../../../models/interface';
import { ApiService } from '../../../services/api.service';
import { StudentTaskComponent } from "../student-task/student-task.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentTaskComponent],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class Dashboard implements OnInit{
  constructor (private router: Router,
     private apiService: ApiService,
   
  ){};

activeTab = 'overview';
studentName: string = '';



  myBatches = [
    { name: 'Java Batch A', trainer: 'Mr. Sharma', time: '10:00 - 12:00' },
    { name: 'Spring Boot Batch B', trainer: 'Ms. Mehta', time: '2:00 - 4:00' }
  ];

  attendancePercent = 85;
  pendingTasks = 2;
  attendanceRecords: any[] = [];

  taskList = [
    { title: 'Assignment 1', status: 'Pending' },
    { title: 'Project Report', status: 'Pending' }
  ];

  grades = [
    { task: 'Assignment 1', score: 'A', feedback: 'Good work!' },
    { task: 'Project Report', score: 'B+', feedback: 'Needs improvement' }
  ];

  studentId: string = '';
  student!: Student;
  batches: Batch[] = [];


  ngOnInit(): void {
    this.studentName = localStorage.getItem('name') || '';
    this.studentId = localStorage.getItem('id') || '';
    this.loadStudent();
    this.loadBatches();
    this.loadAttendance();
  }

  loadStudent(): void {
    if (this.studentId) {
      this.apiService.getStudentById(this.studentId).subscribe({
        next: (data: Student) => {
          this.student = data;
          console.log('Student loaded:', this.student);
        },
        error: (err) => {
          console.error('Error loading student:', err);
        }
      });
    } else {
      console.warn('Student ID not found in localStorage.');
    }
  }

  loadBatches(): void {
    this.apiService.getAllBatches().subscribe({
      next: (data: Batch[]) => {
        // Filter batches linked to this student’s batchId
        this.batches = data.filter(batch => batch.batchId === this.student.batchId);
        console.log('Filtered Batches for Student:', this.batches);
      },
      error: (err) => {
        console.error('Error fetching batches:', err);
      }
    });
  }

  loadAttendance() {
  this.apiService.getAttendanceByStudentId(this.studentId).subscribe({
    next: (data) => {
      this.attendanceRecords = data;
      console.log('Attendance Records:', this.attendanceRecords);
    },
    error: (err) => console.error('Error loading attendance:', err)
  });
}

  onFileSelected(event: any, task: any) {
    const file = event.target.files[0];
    task.file = file;
  }

  submitTask(task: any) {
    if (task.file) {
      console.log('Task submitted:', task.title, task.file.name);
      alert(`Task "${task.title}" submitted successfully!`);
      task.status = 'Submitted';
    } else {
      alert('Please select a file before submitting');
    }
  }

   logout() {
    console.log("Logout clicked");
    localStorage.clear(); 
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
