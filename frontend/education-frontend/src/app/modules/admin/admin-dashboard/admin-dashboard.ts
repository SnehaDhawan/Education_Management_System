import { TrainerService } from '../../../services/trainer.service';
import { Trainer } from '../../../models/interface';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/interface';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentListComponent } from "../student/student-list/student-list.component";
import { StudentCreateComponent } from "../student/student-create/student-create.component";
import { TrainerListComponent } from "../trainer/trainer-list/trainer-list.component";
import { TrainerCreateComponent } from "../trainer/trainer-create/trainer-create.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StudentListComponent, StudentCreateComponent, TrainerListComponent, TrainerCreateComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class Dashboard {

 activePage: string = 'dashboard';
  studentView: 'list' | 'create' = 'list';
 trainerView: 'list' | 'create' = 'list'; // default to list view
  totalUsers = 120;
  trainerCount = 0;
  reports = 5;
  studentCount = 0;
  showingStudentCount = false;

  constructor(private studentService: StudentService, private trainerService: TrainerService) {
    this.fetchTrainerCount();
    this.fetchStudentCount();
  }
  fetchStudentCount() {
    this.studentService.getAllStudents().subscribe((students: Student[]) => {
      this.studentCount = students.length;
    });
  }

  fetchTrainerCount() {
    this.trainerService.getAllTrainers().subscribe((trainers: Trainer[]) => {
      this.trainerCount = trainers.length;
    });
  }
  // Removed hover logic for student count

  showPage(page: string) {
    this.activePage = page;
    if (page === 'students') {
      this.studentView = 'list'; // default to student list
    }
  }

  toggleStudentView(view: 'list' | 'create') {
    this.studentView = view;
  }

    toggleTrainerView(view: 'list' | 'create') {
    this.trainerView = view;
  }

  logout() {
    console.log("Logout clicked");
    // add your logout logic here
  }
}