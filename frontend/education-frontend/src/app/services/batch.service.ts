import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Batch } from '../models/interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  private baseUrl = 'http://localhost:8082/batch'; // ✅ Backend base URL

  constructor(private http: HttpClient) {}
  createBatch(batch: Batch): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, batch);
  }
  getAllBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(`${this.baseUrl}/getAll`);
  }
  updateBatch(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(`${this.baseUrl}/update/${batch.batchId}`, batch);
  }
  
  deleteBatch(batchId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${batchId}`);
  }
}
