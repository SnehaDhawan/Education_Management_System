import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/interface';

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
role = '';
hide = true;
loading = false;
error = '';


constructor(private auth: AuthService, private router: Router) {}


login() {
this.error = '';
if (!this.role) { this.error = 'Please select a role'; return; }


const req: LoginRequest = { email: this.email, password: this.password, role: this.role };
this.loading = true;


this.auth.login(req).subscribe({
next: (res) => {
this.loading = false;
// if backend provides token in response, store it
if (res.token) localStorage.setItem('token', res.token);
localStorage.setItem('role', res.role);
const route = this.getDashboardRoute(res.role);
this.router.navigate([route]);
},
error: (err) => {
this.loading = false;
this.error = err?.error?.message || err?.message || 'Login failed';
}
});
}


private getDashboardRoute(role: string) {
const r = (role || '').toUpperCase();
if (r === 'ADMIN') return '/admin/dashboard';
if (r === 'TRAINER') return '/trainer/dashboard';
return '/student/dashboard';
}
}

