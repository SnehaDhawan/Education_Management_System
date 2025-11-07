import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-task',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './student-task.component.html',
  styleUrl: './student-task.component.css'
})
export class StudentTaskComponent implements OnInit {

  tasks: any[] = [];
  studentId: string = '';  // will store logged-in student ID
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private apiService: ApiService,private router: Router) {}

  ngOnInit(): void {
    this.studentId = localStorage.getItem('id') || '';

    if (this.studentId) {
      this.loadStudentTasks();
    } else {
      this.isLoading = false;
      this.errorMessage = 'Student ID not found. Please login again.';
    }
  }

  loadStudentTasks(): void {
    this.apiService.getTasksByStudentId(this.studentId).subscribe({
      next: (response: any) => {
        this.tasks = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.errorMessage = 'Failed to load tasks.';
        this.isLoading = false;
      }
    });
  }

openCompiler(task: any) {
  this.router.navigate(['/compiler'], {
    queryParams: {
      title: task.taskAssign.taskTitle,
      desc: task.taskAssign.taskDescription,
      taskId: task.taskAssign.taskId
    }
  });
}



}