import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskAssign } from '../../../models/interface';
import { TaskAssignService } from '../../../services/task-assign.service';

@Component({
  selector: 'app-task-assign.component',
  imports: [CommonModule,FormsModule],
   standalone:true,
  templateUrl: './task-assign.component.html',
  styleUrl: './task-assign.component.css'
})
export class TaskAssignComponent {
  task: TaskAssign = {
    trainerId: '',
    batchId: '',
    studentId: '',
    taskTitle: '',
    taskDescription: '',
    assignedDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'Assigned'
  };
selectedBatch: any;
batches: any;

  constructor(private taskService: TaskAssignService) {}

  onSubmit() {
    this.taskService.createTask(this.task).subscribe({
      next: (res) => {
        console.log('Task Assigned:', res);
        alert('✅ Task assigned successfully!');
        this.resetForm();
      },
      error: (err) => {
        console.error('❌ Error assigning task:', err);
        alert('Failed to assign task');
      }
    });
  }

  resetForm() {
    this.task = {
      trainerId: '',
      batchId: '',
      studentId: '',
      taskTitle: '',
      taskDescription: '',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      status: 'Assigned'
    };
  }

}
