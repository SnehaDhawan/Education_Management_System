import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/interface';
import { Observable } from 'rxjs/internal/Observable';
import { ApiLinks } from '../../api/apiLinks';

@Injectable({
  providedIn: 'root'
})
export class StudentService {




 constructor(private http: HttpClient) {}

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(
      ApiLinks.baseLinkStudent + ApiLinks.createStudent,
      student
    );
  }  



  // ✅ Get All Students
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      ApiLinks.baseLinkStudent + ApiLinks.getAllStudent
    );
  }

updateStudent(student: Student): Observable<Student> {
  return this.http.put<Student>(
    `${ApiLinks.baseLinkStudent}update/${student.studentId}`,
    student
  );
}


deleteStudent(studentId: string): Observable<void> {
  return this.http.delete<void>(
    `${ApiLinks.baseLinkStudent}${ApiLinks.deleteStudent}/${studentId}`
  );
}


  getStudentById(studentId: string): Observable<Student> {
    return this.http.get<Student>(`${ApiLinks.baseLinkStudent}getBy/${studentId}`);
  }


}
