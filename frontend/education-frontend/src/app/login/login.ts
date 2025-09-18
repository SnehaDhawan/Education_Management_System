import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';

  constructor(private router: Router) {}

   login() {
    // ✅ Replace this with API call to backend
    if (this.email === 'admin@test.com' && this.password === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (this.email === 'trainer@test.com' && this.password === 'trainer') {
      this.router.navigate(['/trainer/dashboard']);
    } else if (this.email === 'student@test.com' && this.password === 'student') {
      this.router.navigate(['/student/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }

}
