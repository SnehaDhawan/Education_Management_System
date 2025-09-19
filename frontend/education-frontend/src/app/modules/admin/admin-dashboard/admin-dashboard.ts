import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentListComponent } from "../student/student-list/student-list.component";
import { StudentCreateComponent } from "../student/student-create/student-create.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StudentListComponent, StudentCreateComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class Dashboard {

 activePage: string = 'dashboard';
  studentView: 'list' | 'create' = 'list';

  totalUsers = 120;
  activeTrainers = 15;
  reports = 5;

  showPage(page: string) {
    this.activePage = page;
    if (page === 'students') {
      this.studentView = 'list'; // default to student list
    }
  }

  toggleStudentView(view: 'list' | 'create') {
    this.studentView = view;
  }

  logout() {
    console.log("Logout clicked");
    // add your logout logic here
  }
}