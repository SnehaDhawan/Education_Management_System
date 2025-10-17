import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskAssign } from '../models/interface';


@Injectable({
  providedIn: 'root'
})
export class TaskAssignService {

  private baseUrl = 'http://localhost:8080/admin/tasks';

  constructor(private http: HttpClient) {}

  saveTask(task: TaskAssign): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, task);
  }

  getAllTasks(): Observable<TaskAssign[]> {
    return this.http.get<TaskAssign[]>(`${this.baseUrl}/all`);
  }

  getTasksByStudentId(studentId: string): Observable<TaskAssign[]> {
    return this.http.get<TaskAssign[]>(`${this.baseUrl}/student/${studentId}`);
  }
}
