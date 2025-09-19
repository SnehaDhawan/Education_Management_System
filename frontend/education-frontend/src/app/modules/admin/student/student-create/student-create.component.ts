import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../../../../models/interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-create',
  imports: [FormsModule],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent implements OnInit {
  @Input() student: Student | null = null;
  @Output() formClosed = new EventEmitter<Student | null>();

  formStudent: Student = { id: 0, name: '', email: '', course: '' };

  ngOnInit() {
    if (this.student) {
      this.formStudent = { ...this.student };
    }
  }

  onSubmit() {
    this.formClosed.emit(this.formStudent);
  }

  closeForm() {
    this.formClosed.emit(null);
  }

}
