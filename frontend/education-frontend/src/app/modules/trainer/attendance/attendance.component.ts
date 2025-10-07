import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Batch, Student, Trainer } from '../../../models/interface';
import { BatchService } from '../../../services/batch.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-attendance',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  @Input() trainerId!: string;   // Trainer ID from parent
  @Input() batchId!: string;     // Selected batch ID from parent

  trainer!: Trainer;
  batches: Batch[] = [];
  students: Student[] = [];
  selectedBatch: string = '';
  attendance: { [key: string]: boolean } = {};
  pendingAttendance = 0;

  constructor(
    private batchService: BatchService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.trainerId = localStorage.getItem('id') || '';
    this.loadBatches();
    this.loadStudentListByBatch();
  }

  // loadBatches(): void {
  //   this.batchService.getAllBatches().subscribe({
  //     next: (data: Batch[]) => {
  //       // Filter batches based on trainer if needed
  //       this.batches = data; // modify if trainer has specific batch
  //       console.log('Batches:', this.batches);
  //     },
  //     error: (err) => console.error('Error fetching batches:', err)
  //   });
  // }

loadBatches() {
  this.batchService.getAllBatches().subscribe({
    next: (data: Batch[]) => {
      this.batches = data.filter(batch => batch.batchId === this.batchId);
      console.log('Filtered Batches:', this.batches);
    },
    error: (err) => console.error('Error fetching batches:', err)
  });
}

  loadStudentListByBatch(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
        console.log('All Students:', this.students);
      },
      error: (err) => console.error('Error loading students:', err)
    });
  }

  getStudentsForBatch(batchId: string): Student[] {
    if (!batchId) return [];
    const filteredStudents = this.students.filter(student => student.batchId === batchId);
    console.log(`Students for batch ${batchId}:`, filteredStudents);
    return filteredStudents;
  }

  saveAttendance(): void {
    console.log('Attendance saved:', this.attendance);
    alert('Attendance marked successfully!');
    this.pendingAttendance--;
  }

}

