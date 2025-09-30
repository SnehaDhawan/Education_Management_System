import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerService } from '../../../services/trainer.service';
import { StudentService } from '../../../services/student.service';
import { ApiService } from '../../../services/api.service';
import { Student } from '../../../models/interface';
import { Trainer } from '../../../models/interface';
import { StudentListComponent } from "../student/student-list/student-list.component";
import { StudentCreateComponent } from "../student/student-create/student-create.component";
import { TrainerListComponent } from "../trainer/trainer-list/trainer-list.component";
import { TrainerCreateComponent } from "../trainer/trainer-create/trainer-create.component";
import { BatchCreateComponent } from "../batches/batch-create/batch-create.component";
import { BatchListComponent } from "../batches/batch-list/batch-list.component";

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

  // Media upload
  showMediaUpload: boolean = false;
  uploadedMediaFiles: File[] = [];
  mediaList: Media[] = [];

  constructor(
    private studentService: StudentService,
    private trainerService: TrainerService,
    private apiService: ApiService
  ) {
    this.fetchTrainerCount();
    this.fetchStudentCount();
    this.loadMediaList(); // Load uploaded media on init
  }

  // Fetch student count
  fetchStudentCount() {
    this.studentService.getAllStudents().subscribe((students: Student[]) => {
      this.studentCount = students.length;
    });
  }

  // Fetch trainer count
  fetchTrainerCount() {
    this.trainerService.getAllTrainers().subscribe((trainers: Trainer[]) => {
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
    // Add your logout logic here
  }

  // Media selection
  onMediaSelected(event: any) {
    const files: FileList = event.target.files;
    this.uploadedMediaFiles = Array.from(files);
    console.log('Selected media files:', this.uploadedMediaFiles);
  }

  // Upload media
  uploadMedia() {
    if (this.uploadedMediaFiles.length) {
      this.apiService.uploadMedia(this.uploadedMediaFiles).subscribe({
        next: (mediaList: Media[]) => {
          // Append new media to the list
          this.mediaList = this.mediaList.concat(mediaList);
          this.showMediaUpload = false;
          this.uploadedMediaFiles = [];
        },
        error: (err) => console.error('Upload failed:', err)
      });
    }
  }

  // Load media list from backend
  loadMediaList(): void {
    this.apiService.getMediaList().subscribe({
      next: (data) => {
        // Map to Media interface with URLs
        this.mediaList = data.map(media => ({
          filename: media.filename,
          url: media.filename.startsWith('http') ? media.filename : `http://localhost:8082/media/${media.filename}`
        }));
      },
      error: (err) => {
        console.error('Error fetching media list', err);
      }
    });
  }
}
