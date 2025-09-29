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
// export class Login {
// forgotPassword() {
// throw new Error('Method not implemented.');
// }

// email = '';
// password = '';
// role = '';
// hide = true;
// loading = false;
// error = '';


// constructor(private auth: AuthService, private router: Router) {}


// login() {
// this.error = '';
// if (!this.role) { this.error = 'Please select a role'; return; }


// const req: LoginRequest = { email: this.email, password: this.password, role: this.role };
// this.loading = true;


// this.auth.login(req).subscribe({
// next: (res) => {
// this.loading = false;
// // if backend provides token in response, store it
// if (res.token) localStorage.setItem('token', res.token);
// localStorage.setItem('role', res.role);
// const route = this.getDashboardRoute(res.role);
// this.router.navigate([route]);
// },
// error: (err) => {
// this.loading = false;
// this.error = err?.error?.message || err?.message || 'Login failed';
// }
// });
// }


// private getDashboardRoute(role: string) {
// const r = (role || '').toUpperCase();
// if (r === 'ADMIN') return '/admin/dashboard';
// if (r === 'TRAINER') return '/trainer/dashboard';
// return '/student/dashboard';
// }
// }




// function forgotPassword() {
//   throw new Error('Function not implemented.');
// }



export class Login {

 email = '';
  password = '';
  role = '';
  hide = true;
  loading = false;
  error = '';

  // Forgot/OTP/reset states
  forgotMode = false;
  otpMode = false;
  resetMode = false;
  newPassword = '';
  otp = '';

  constructor(private auth: AuthService, private router: Router) {}

  // ------------ LOGIN ------------
  login() {
    this.error = '';
    if (!this.role) {
      this.error = 'Please select a role';
      return;
    }

    const req: LoginRequest = { email: this.email, password: this.password, role: this.role };
    this.loading = true;

    this.auth.login(req).subscribe({
      next: (res) => {
        this.loading = false;
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

  // ------------ FORGOT PASSWORD FLOW ------------

  forgotPassword() {
    this.forgotMode = true;
    this.otpMode = false;
    this.resetMode = false;
    this.error = '';
  }

  // Step 1: Send OTP
  sendOtp() {
    debugger
    if (!this.email || !this.role) {
      this.error = 'Please enter email and role';
      return;
    }
    this.auth.sendOtp(this.email, this.role).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.otpMode = true; // show OTP input
        this.forgotMode = false;
        this.resetMode = false;
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'Failed to send OTP';
      }
    });
  }

  // Step 2: Verify OTP
  verifyOtp() {
    if (!this.otp) {
      this.error = 'Please enter OTP';
      return;
    }
    this.auth.verifyOtp(this.email, this.otp).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.resetMode = true;  // allow new password input
        this.otpMode = false;
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'Invalid OTP';
      }
    });
  }

  // Step 3: Update Password
  sendForgotRequest() {
    if (!this.newPassword) {
      this.error = 'Please enter new password';
      return;
    }
    this.auth.updatePassword(this.email, this.role, this.newPassword).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.forgotMode = false;
        this.resetMode = false;
        this.otpMode = false;
        this.email = '';
        this.role = '';
        this.newPassword = '';
        this.otp = '';
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'Failed to reset password';
      }
    });
  }

  cancelForgot() {
    this.forgotMode = false;
    this.otpMode = false;
    this.resetMode = false;
    this.error = '';
    this.email = '';
    this.role = '';
    this.newPassword = '';
    this.otp = '';
  }


}