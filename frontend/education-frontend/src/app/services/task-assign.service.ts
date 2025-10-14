import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskAssign } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class TaskAssignService {

  private baseUrl = 'http://localhost:8082/api/task'; // backend URL

  constructor(private http: HttpClient) {}

  createTask(task: TaskAssign): Observable<TaskAssign> {
    return this.http.post<TaskAssign>(`${this.baseUrl}/save`, task);
  }

  getAllTasks(): Observable<TaskAssign[]> {
    return this.http.get<TaskAssign[]>(`${this.baseUrl}/list`);
  }

  getTaskById(id: number): Observable<TaskAssign> {
    return this.http.get<TaskAssign>(`${this.baseUrl}/${id}`);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
