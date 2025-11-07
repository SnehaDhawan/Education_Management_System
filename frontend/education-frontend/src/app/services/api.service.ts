import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Attendance, Batch,  environment,  LoginRequest, LoginResponse, Student, TaskAssign, Trainer } from '../models/interface';
import { Router } from '@angular/router';

// Define Media interface to match backend model
export interface Media {
  id: number;
  filename: string;
  size: number;
  uploadTime: string; // ISO date string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
 private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,private router: Router) {}

  // -------------------------------------------------------------------
  // 🔐 AUTH SERVICE METHODS  (goes through Gateway → Auth Microservice)
  // -------------------------------------------------------------------
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, request);
  }

  sendOtp(email: string, role: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/send-otp`, { email, role });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/verify-otp`, { email, otp });
  }

  updatePassword(email: string, role: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/update-password`, { email, role, newPassword });
  }

 // -------------------------------------------------------------------
  // 🔒 AUTH HELPER METHODS (added for roleGuard compatibility)
  // -------------------------------------------------------------------
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  parseJwt(token: string | null): any {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  // -------------------------------------------------------------------
  // 🧑‍🎓 STUDENT SERVICE METHODS  (Gateway → Admin Microservice)
  // -------------------------------------------------------------------
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/admin/student/create`, student);
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/admin/student/getAll`);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/admin/student/update/${student.studentId}`, student);
  }

  deleteStudent(studentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/student/delete/${studentId}`);
  }

  getStudentById(studentId: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/admin/student/getBy/${studentId}`);
  }

  // -------------------------------------------------------------------
  // 🧑‍🏫 TRAINER SERVICE METHODS
  // -------------------------------------------------------------------
  createTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(`${this.baseUrl}/admin/trainer/create`, trainer);
  }

  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.baseUrl}/admin/trainer/getAll`);
  }

  updateTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.baseUrl}/admin/trainer/update/${trainer.trainerId}`, trainer);
  }

  deleteTrainer(trainerId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/trainer/delete/${trainerId}`);
  }

  getTrainerById(trainerId: string): Observable<Trainer> {
    return this.http.get<Trainer>(`${this.baseUrl}/admin/trainer/getBy/${trainerId}`);
  }

  // -------------------------------------------------------------------
  // 🧑‍🏫 BATCH SERVICE METHODS
  // -------------------------------------------------------------------
  createBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(`${this.baseUrl}/admin/batch/create`, batch);
  }

  getAllBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(`${this.baseUrl}/admin/batch/getAll`);
  }

  updateBatch(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(`${this.baseUrl}/admin/batch/update/${batch.batchId}`, batch);
  }

  deleteBatch(batchId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/batch/delete/${batchId}`);
  }

  // -------------------------------------------------------------------
  // 🕒 ATTENDANCE SERVICE METHODS
  // -------------------------------------------------------------------
  saveAttendance(attendanceList: Attendance[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/attendance/save`, attendanceList);
  }

  getAttendanceByStudentId(studentId: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}/admin/attendance/student/${studentId}`);
  }

  // ✅ Export attendance as Excel file
  exportAttendanceReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/admin/attendance/export`, { responseType: 'blob' });
  }

  // -------------------------------------------------------------------
  // 📋 TASK SERVICE METHODS
  // -------------------------------------------------------------------
  saveTask(task: TaskAssign): Observable<TaskAssign> {
    return this.http.post<TaskAssign>(`${this.baseUrl}/admin/task/save`, task);
  }

  getAllTasks(): Observable<TaskAssign[]> {
    return this.http.get<TaskAssign[]>(`${this.baseUrl}/admin/task/all`);
  }

  


 getTasksByStudentId(studentId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/admin/tasks/student/${studentId}`);
}


// updateStudentSolution(payload: any) {
//   return this.http.put(`${this.baseUrl}/admin/tasks/update-solution`, payload);
// }


updateStudentSolution(payload: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/admin/tasks/update-solution`, payload, {
    responseType: 'text' // 👈 This line ensures Angular expects plain text
  });
}


getTaskStatusByBatch(batchId: string) {
  return this.http.get<any[]>(`${this.baseUrl}/admin/tasks/batch/${batchId}/tasks-status`);
}




}
