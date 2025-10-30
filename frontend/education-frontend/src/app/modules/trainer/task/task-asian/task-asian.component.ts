import { Component, Input, OnInit } from '@angular/core';
import { Batch, Student, TaskAssign, TaskDetails, Trainer } from '../../../../models/interface';
import { TaskAssignService } from '../../../../services/task-assign.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-task-asian',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-asian.component.html',
  styleUrl: './task-asian.component.css',
})
  
export class TaskAsianComponent implements OnInit {
  @Input() trainerId!: string;
  @Input() batchId!: string;

  batches: Batch[] = [];
  students: Student[] = [];
  selectedBatch: string = '';

  taskAssign: TaskAssign = {
    taskId: '',
    trainerId: '',
    batchId: '',
    taskTitle: '',
    taskDescription: '',
    assignedDate: '',
    dueDate: '',
    status: 'Assigned',
    taskDetails: [],
  };

  constructor(private taskService: TaskAssignService, private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch trainer ID from local storage if not passed as input
    if (!this.trainerId) {
      this.trainerId = localStorage.getItem('id') || '';
    }

    this.loadBatches();
    this.loadStudents();
  }

  loadBatches() {
    this.apiService.getAllBatches().subscribe({
      next: (data: Batch[]) => {
        this.batches = this.batchId ? data.filter((b) => b.batchId === this.batchId) : data;   
        if (this.batches.length === 1) {
          this.selectedBatch = this.batches[0].batchId;
        }
      },
      error: (err) => console.error('Error fetching batches:', err),
    });
  }


  loadStudents(): void {
    this.apiService.getAllStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
      },
      error: (err) => console.error('Error loading students:', err),
    });
  }

  private getStudentsForBatch(batchId: string): Student[] {
    return this.students.filter((student) => student.batchId === batchId);
  }

  // 🔹 Build taskDetails list automatically for the selected batch
  private buildTaskDetails(): TaskDetails[] {
    const studentsInBatch = this.getStudentsForBatch(this.taskAssign.batchId);
    return studentsInBatch.map((student) => ({
      taskId: this.taskAssign.taskId,
      studentId: student.studentId,
      taskSubmitStatus: 'Pending',
      batchId: this.taskAssign.batchId,
    }));
  }

  // 🔹 Save Task (header + detail)
  // saveTask(): void {
  //   debugger
  //   if (!this.taskAssign.batchId) {
  //     alert('Please select a batch first.');
  //     return;
  //   }
  //   this.taskAssign.trainerId = this.trainerId;
  //   this.taskAssign.taskDetails = this.buildTaskDetails();
  //   console.log('📦 Final Payload Sent:', this.taskAssign);
  //   this.taskService.saveTask(this.taskAssign).subscribe({
  //     next: (res) => {
  //       alert('✅ Task assigned successfully!');
  //       console.log('Response:', res);
  //       this.resetForm();
  //     },
  //     error: (err) => {
  //       console.error('❌ Error while assigning task:', err);
  //       alert('Error while assigning task!');
  //     },
  //   });
  // }


  saveTask(): void {
    debugger
  if (!this.taskAssign.batchId) {
    alert('Please select a batch first.');
    return;
  }

  this.taskAssign.trainerId = this.trainerId;
  this.taskAssign.taskDetails = this.buildTaskDetails();

  console.log('📦 Final Payload Sent:', this.taskAssign);

  this.taskService.saveTask(this.taskAssign).subscribe({
    next: (res: TaskAssign) => {
      console.log('✅ Response received:', res);
      alert(`✅ Task  assigned successfully to Batch ${res.batchId}.`);
      this.resetForm();
    },
    error: (err) => {
      console.error('❌ Error while assigning task:', err);
      alert('⚠️ Error while assigning task! Please check the console for details.');
    }
  });
}
  // 🔹 Reset form after submission
  resetForm(): void {
    this.taskAssign = {
      taskId: '',
      trainerId: this.trainerId,
      batchId: '',
      taskTitle: '',
      taskDescription: '',
      assignedDate: '',
      dueDate: '',
      status: 'Assigned',
      taskDetails: [],
    };
  }
}