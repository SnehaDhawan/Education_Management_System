import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;

  private baseUrl = 'http://localhost:8083/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // Login
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, request);
  }

  // Logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // --------------- FORGOT PASSWORD FLOW ----------------

  // Send OTP
  sendOtp(email: string, role: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/send-otp`, { email, role });
  }

  // Verify OTP
  verifyOtp(email: string, otp: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/verify-otp`, { email, otp });
  }

  // Update Password
  updatePassword(
    email: string,
    role: string,
    newPassword: string
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/update-password`, {
      email,
      role,
      newPassword,
    });
  }

  parseJwt(token: string | null) {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }
}
