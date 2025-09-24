import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class Dashboard {

 activeTab = 'overview';

  myBatches = [
    { name: 'Java Batch A', trainer: 'Mr. Sharma', time: '10:00 - 12:00' },
    { name: 'Spring Boot Batch B', trainer: 'Ms. Mehta', time: '2:00 - 4:00' }
  ];

  attendancePercent = 85;
  pendingTasks = 2;

  attendanceRecords = [
    { date: '2025-09-20', status: 'Present' },
    { date: '2025-09-21', status: 'Absent' },
    { date: '2025-09-22', status: 'Present' }
  ];

  taskList = [
    { title: 'Assignment 1', status: 'Pending' },
    { title: 'Project Report', status: 'Pending' }
  ];

  grades = [
    { task: 'Assignment 1', score: 'A', feedback: 'Good work!' },
    { task: 'Project Report', score: 'B+', feedback: 'Needs improvement' }
  ];

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
}
