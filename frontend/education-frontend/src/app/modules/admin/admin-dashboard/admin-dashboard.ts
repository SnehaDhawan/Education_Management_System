import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Student } from '../../../models/interface';
import { Trainer } from '../../../models/interface';
import { StudentListComponent } from "../student/student-list/student-list.component";
import { StudentCreateComponent } from "../student/student-create/student-create.component";
import { TrainerListComponent } from "../trainer/trainer-list/trainer-list.component";
import { TrainerCreateComponent } from "../trainer/trainer-create/trainer-create.component";
import { BatchCreateComponent } from "../batches/batch-create/batch-create.component";
import { BatchListComponent } from "../batches/batch-list/batch-list.component";
import { Router } from '@angular/router';

// Define Media interface
export interface Media {
  filename: string;
  url?: string; // optional
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StudentListComponent, StudentCreateComponent, TrainerListComponent, TrainerCreateComponent, BatchListComponent, BatchCreateComponent],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class Dashboard {
  activePage: string = 'dashboard';
  studentView: 'list' | 'create' = 'list';
  trainerView: 'list' | 'create' = 'list'; // default to list view
  batchView: 'list' | 'create' = 'list';

  totalUsers = 120;
  trainerCount = 0;
  studentCount = 0;
  reports = 5;
  showingStudentCount = false;
  showMediaUpload: boolean = false;
  uploadedMediaFiles: File[] = [];
  mediaList: Media[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.fetchTrainerCount();
    this.fetchStudentCount();

  }

  // Fetch student count
  fetchStudentCount() {
    this.apiService.getAllStudents().subscribe((students: Student[]) => {
      this.studentCount = students.length;
    });
  }

  // Fetch trainer count
  fetchTrainerCount() {
    this.apiService.getAllTrainers().subscribe((trainers: Trainer[]) => {
      this.trainerCount = trainers.length;
    });
  }

  // Show different pages
  showPage(page: string) {
    this.activePage = page;
    if (page === 'students') {
      this.studentView = 'list';
    }
  }

  toggleStudentView(view: 'list' | 'create') {
    this.studentView = view;
  }

  toggleTrainerView(view: 'list' | 'create') {
    this.trainerView = view;
  }

    toggleBatchView(view: 'list' | 'create') {
    this.batchView = view;
  }
  logout() {
    console.log("Logout clicked");
    localStorage.clear(); 
    sessionStorage.clear();
    this.router.navigate(['/login']);

  }


}
