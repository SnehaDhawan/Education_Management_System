import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Attendance } from '../modules/student/attendance/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private baseUrl = 'http://localhost:8082/attendance';

  constructor(private http: HttpClient) {}

  saveAttendance(payload: Attendance[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, payload);
  }

    // ✅ Get attendance records by studentId
  getAttendanceByStudentId(studentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/student/${studentId}`);
  }

}
