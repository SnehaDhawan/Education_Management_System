import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  private baseUrl = 'http://localhost:8082/api/media'; // Backend URL

  constructor(private http: HttpClient) { }

  // Upload media files
  uploadMedia(files: File[]): Observable<Media[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return this.http.post<Media[]>(`${this.baseUrl}/upload`, formData);
  }

  // Get list of all media
  getMediaList(): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.baseUrl}/list`);
  }
}
