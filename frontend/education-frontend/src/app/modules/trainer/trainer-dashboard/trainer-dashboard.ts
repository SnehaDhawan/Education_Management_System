import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './trainer-dashboard.html',
  styleUrl: './trainer-dashboard.css'
})
export class Dashboard implements OnInit {
  constructor (private router: Router){};

 activeTab = 'batches';
 trainerName: string = '';

  todayBatches = [
    { name: 'Java Batch A', time: '10:00 - 12:00', students: ['Amit', 'Riya', 'Sneha'] },
    { name: 'Spring Boot Batch B', time: '2:00 - 4:00', students: ['Rahul', 'Neha', 'Arjun'] }
  ];

  pendingAttendance = 1;
  pendingTasks = 3;
  selectedBatch: string = '';
  attendance: any = {};

  taskBatch: string = '';
  newTask: string = '';
  pendingTaskList = [
    { student: 'Riya', title: 'Assignment 1' },
    { student: 'Rahul', title: 'Project Report' }
  ];

   ngOnInit(): void {
    this.trainerName = localStorage.getItem('name') || '';
  }

  getStudentsForBatch(batchName: string) {
    const batch = this.todayBatches.find(b => b.name === batchName);
    return batch ? batch.students : [];
  }

  saveAttendance() {
    console.log('Attendance saved:', this.attendance);
    alert('Attendance marked successfully!');
  }

  assignTask() {
    if (this.taskBatch && this.newTask.trim()) {
      console.log('Task assigned:', this.taskBatch, this.newTask);
      alert(`Task assigned to ${this.taskBatch}`);
      this.newTask = '';
    } else {
      alert('Please select a batch and enter task details');
    }
  }

  
   logout() {
    console.log("Logout clicked");
    localStorage.clear(); 
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
