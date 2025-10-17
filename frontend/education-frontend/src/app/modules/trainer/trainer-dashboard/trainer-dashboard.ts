import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Batch, Student, Trainer } from '../../../models/interface';
import { ApiService } from '../../../services/api.service';
import { AttendanceComponent } from '../attendance/attendance.component';
import { TaskAsianComponent } from "../task-asian/task-asian.component";



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AttendanceComponent, TaskAsianComponent],
  templateUrl: './trainer-dashboard.html',
  styleUrl: './trainer-dashboard.css'
})
export class Dashboard implements OnInit {
  
  activeTab = 'batches';
  trainerName: string = '';
  trainerId :string='';
  batches: Batch[] = [];
  trainer!: Trainer;
  pendingAttendance = 1;
  pendingTasks = 3;
  selectedBatch: string = '';
  

  constructor(private router: Router,
    private apiService: ApiService,
    
  ) {}

  ngOnInit(): void {
  
    this.trainerName = localStorage.getItem('name') || '';
    this.trainerId =localStorage.getItem('id') || '';
    this.loadTrainer();
    this.loadBatches();
  }

  

  loadTrainer(): void {
    if(this.trainerId) {
      this.apiService.getTrainerById(this.trainerId).subscribe({
        next: (data: Trainer) => {
          this.trainer = data;
          console.log('Trainer loaded:', this.trainer);
        },
        error: (err) => {
          console.error('Error loading trainer:', err);
        }
      });
    } else {
      console.warn('Trainer ID not found in localStorage.');
    }
  }


loadBatches() {
  this.apiService.getAllBatches().subscribe({
    next: (data: Batch[]) => {
      this.batches = data.filter(batch => batch.batchId === this.trainer.batchId);
      console.log('Filtered Batches:', this.batches);
    },
    error: (err) => console.error('Error fetching batches:', err)
  });
}






  logout() {
    console.log("Logout clicked");
    localStorage.clear(); 
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }




}
