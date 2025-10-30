import { Component, Input, OnInit } from '@angular/core';
import { Batch, Student } from '../../../../models/interface';
import { TaskAssignService } from '../../../../services/task-assign.service';
import { ApiService } from '../../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  @Input() trainerId!: string;
  @Input() batchId!: string;

  batches: Batch[] = [];
  //students: Student[] = [];
  selectedBatch: string = '';
  tableData: any[] = [];
  //tasks: string[] = [];

  students: any[] = [];
tasks: string[] = [];

  constructor(private taskService: TaskAssignService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBatches();
    this.loadStudents();
    if (this.batchId) {
      console.log("batch id found");
      
      this.loadTaskStatus(this.batchId);
    }
  }

  loadBatches() {
    this.apiService.getAllBatches().subscribe({
      next: (data: Batch[]) => {
        this.batches = this.batchId ? data.filter(b => b.batchId === this.batchId) : data;
        if (this.batches.length === 1) {
          this.selectedBatch = this.batches[0].batchId;
        }
      },
      error: (err) => console.error('Error fetching batches:', err),
    });
  }

  filteredStudents: Student[] = [];

loadStudents() {
  this.apiService.getAllStudents().subscribe({
    next: (data: Student[]) => {
      this.students = data;
      this.filteredStudents = this.batchId
        ? data.filter(s => s.batchId === this.batchId)
        : data;
    },
    error: (err) => console.error('Error loading students:', err),
  });
}






// loadTaskStatus(batchId: string) {
//   this.apiService.getTaskStatusByBatch(batchId).subscribe((data) => {
//     this.students = data;
//     // Collect all task titles
//     this.tasks = Array.from(new Set(
//       data.flatMap((s: any) => Object.keys(s.statuses))
//     ));
//   });
// }

// getStatus(statuses: any, task: string): string {
//   return statuses[task] || 'N/A';
// }



showSolutionModal: boolean = false;
selectedSolution: string = '';
selectedTask: string = '';
selectedStudent = '';

// viewSolution(studentId: string, taskTitle: string) {
//   const record = this.tableData.find(
//     d => d.studentId === studentId && d.taskAssign.taskTitle === taskTitle
//   );
//   if (record && record.taskSolution) {
//     this.selectedSolution = record.taskSolution;
//     this.selectedTask = taskTitle;
//     this.showSolutionModal = true;
//   } else {
//     alert('No solution submitted yet.');
//   }
// }

// closeModal() {
//   this.showSolutionModal = false;
//   this.selectedSolution = '';
//   this.selectedTask = '';
// }



  loadTaskStatus(batchId: string) {
    this.taskService.getTaskStatusByBatch(batchId).subscribe({
      next: (data: any[]) => {
        this.students = data;

        // collect all task titles
        const taskSet = new Set<string>();
        data.forEach(student => {
          Object.keys(student.statuses).forEach(task => taskSet.add(task));
        });
        this.tasks = Array.from(taskSet);
      },
      error: err => console.error('Error fetching task status:', err)
    });
  }

  getStatus(student: any, taskTitle: string): string {
    const entry = student.statuses[taskTitle];
    return entry ? entry.split('|')[0] : 'NA';
  }

  getSolution(student: any, taskTitle: string): string {
    const entry = student.statuses[taskTitle];
    return entry ? entry.split('|')[1] : '';
  }

  viewSolution(student: any, taskTitle: string) {
    const solution = this.getSolution(student, taskTitle);
    if (solution) {
      this.selectedSolution = solution;
      this.selectedTask = taskTitle;
      this.selectedStudent = student.studentName;
      this.showSolutionModal = true;
    } else {
      alert('No solution submitted yet.');
    }
  }

  closeModal() {
    this.showSolutionModal = false;
    this.selectedSolution = '';
    this.selectedTask = '';
    this.selectedStudent = '';
  }


}