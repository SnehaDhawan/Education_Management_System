import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Batch, Student, Trainer } from '../../../models/interface';
import { BatchService } from '../../../services/batch.service';
import { StudentService } from '../../../services/student.service';
import { Attendance } from '../../student/attendance/attendance';
import { AttendanceService } from '../../../services/attendance.service';

@Component({
  selector: 'app-attendance',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  @Input() trainerId!: string;   // Trainer ID from parent (optional override)
  @Input() batchId!: string;     // Selected batch ID from parent (optional)

  trainer!: Trainer | null;
  batches: Batch[] = [];
  students: Student[] = [];
  selectedBatch: string = '';
  // attendance map keyed by studentId: true = present, false = absent
  attendance: { [studentId: string]: boolean } = {};
  selectedDate: string = ''; // yyyy-MM-dd

  constructor(
    private batchService: BatchService,
    private studentService: StudentService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    // If trainerId wasn't passed as @Input, try localStorage
    if (!this.trainerId) {
      this.trainerId = localStorage.getItem('id') || '';
    }

    // set default date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.selectedDate = `${yyyy}-${mm}-${dd}`;

    this.loadBatches();
    this.loadStudentListByBatch();
  }

  loadBatches() {
    this.batchService.getAllBatches().subscribe({
      next: (data: Batch[]) => {
        // If a batchId input is provided, show only that; otherwise load all
        this.batches = this.batchId ? data.filter(b => b.batchId === this.batchId) : data;
        // if only one batch present, set selectedBatch
        if (this.batches.length === 1) {
          this.selectedBatch = this.batches[0].batchId;
        }
      },
      error: (err) => console.error('Error fetching batches:', err)
    });
  }

  loadStudentListByBatch(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
        // initialize attendance for known students
        this.students.forEach(s => {
          if (!(s.studentId in this.attendance)) this.attendance[s.studentId] = true; // default present
        });
      },
      error: (err) => console.error('Error loading students:', err)
    });
  }

  getStudentsForBatch(batchId: string): Student[] {
    if (!batchId) return [];
    const filteredStudents = this.students.filter(student => student.batchId === batchId);
    // ensure attendance map has keys for these students
    filteredStudents.forEach(s => {
      if (!(s.studentId in this.attendance)) this.attendance[s.studentId] = true;
    });
    return filteredStudents;
  }

  toggleAllPresent(present: boolean) {
    const list = this.getStudentsForBatch(this.selectedBatch);
    list.forEach(s => this.attendance[s.studentId] = present);
  }

  saveAttendance(): void {
    if (!this.selectedBatch) {
      alert('Please select a batch.');
      return;
    }
    if (!this.selectedDate) {
      alert('Please select a date.');
      return;
    }

    const studentsForBatch = this.getStudentsForBatch(this.selectedBatch);
    if (studentsForBatch.length === 0) {
      alert('No students found for selected batch.');
      return;
    }

    const payload: Attendance[] = studentsForBatch.map(s => ({
      trainerId: this.trainerId || '',
      batchId: this.selectedBatch,
      studentId: s.studentId,
      date: this.selectedDate,
      status: this.attendance[s.studentId] ? 'PRESENT' : 'ABSENT'
    }));

    this.attendanceService.saveAttendance(payload).subscribe({
      next: (res) => {
        console.log('Attendance saved response:', res);
        alert('Attendance saved successfully.');
      },
      error: (err) => {
        console.error('Error saving attendance:', err);
        alert('Failed to save attendance. See console for details.');
      }
    });
  }
}