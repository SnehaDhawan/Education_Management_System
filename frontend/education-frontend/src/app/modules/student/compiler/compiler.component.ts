import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-compiler',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './compiler.component.html',
  styleUrl: './compiler.component.css'
})
export class CompilerComponent implements OnInit {
  taskTitle: string = '';
  taskDescription: string = '';
  taskId: string = '';
  studentId: string = '';
  studentCode: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService,private router :Router) {}

  ngOnInit(): void {
    this.taskTitle = this.route.snapshot.queryParamMap.get('title') || '';
    this.taskDescription = this.route.snapshot.queryParamMap.get('desc') || '';
    this.taskId = this.route.snapshot.queryParamMap.get('taskId') || '';
    this.studentId = localStorage.getItem('id') || '';
  }

  




submitSolution(): void {
  if (!this.studentCode.trim()) {
    alert('Please paste or write your code before submitting!');
    return;
  }

  const payload = {
    studentId: this.studentId,
    taskId: this.taskId,
    taskSolution: this.studentCode,
    batchId: "",  // if available in your component

  };

 
  this.apiService.updateStudentSolution(payload).subscribe({
    next: (res: any) => {
      console.log('Update response:', res);
      alert('✅ Task solution updated successfully!');
      this.router.navigate(['/student-dashboard']); 
    },
    error: (err: any) => {
      console.error('Update error:', err);
      alert('❌ Failed to update solution. Please try again.');
    }
  });
}

}