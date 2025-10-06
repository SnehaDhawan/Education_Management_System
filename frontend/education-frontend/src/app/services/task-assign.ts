import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TaskAssign {
  

  private baseUrl = 'http://localhost:8082/api/task'; // change if different

  constructor(private http: HttpClient) {}

  saveTask(task: TaskAssign): Observable<TaskAssign> {
    return this.http.post<TaskAssign>(`${this.baseUrl}/save`, task);
  }

  getAllTasks(): Observable<TaskAssign[]> {
    return this.http.get<TaskAssign[]>(`${this.baseUrl}/all`);
  }
}
