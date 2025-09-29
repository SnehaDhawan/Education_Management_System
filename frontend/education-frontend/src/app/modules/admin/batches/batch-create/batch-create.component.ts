import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BatchService } from '../../../../services/batch.service';
import { Batch } from '../../../../models/interface';

@Component({
  selector: 'app-batch-create',
  standalone :true,
    imports: [CommonModule, FormsModule],
  templateUrl: './batch-create.component.html',
  styleUrl: './batch-create.component.css'
})
export class BatchCreateComponent  implements OnInit {
  @Input() batch: Batch | null = null;       
  @Output() formClose = new EventEmitter<Batch | null>();

  constructor(private batchService: BatchService) {}

  // ✅ Form model
  formBatch: Batch = {
    batchId: '',
    batchName: '',
    trainerId: '',
    studentIds: [],
    startDate: '',
    endDate: '',
    course: '',
    schedule: ''
  };

  ngOnInit(): void {
    if (this.selectedBatch) {
      this.formBatch = { ...this.selectedBatch };
    }
  }

  // ✅ Handle submit
  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.formBatch.batchId) {
        // 🔹 Update batch
        this.batchService.updateBatch(this.formBatch).subscribe({
          next: (res: any) => {
            console.log('Batch updated successfully:', res);
            alert('Batch updated successfully!');
            this.closeForm(res);
          },
          error: (err) => {
            console.error('Error updating batch:', err);
            alert('Failed to update batch.');
          },
        });
      } else {
        // 🔹 Create batch
        this.batchService.createBatch(this.formBatch).subscribe({
          next: (res: any) => {
            console.log('Batch created successfully:', res);
            alert('Batch created successfully!');
            this.closeForm(res);
          },
          error: (err) => {
            console.error('Error creating batch:', err);
            alert('Failed to create batch.');
          },
        });
      }
    }
  }

  // ✅ Reset form + emit close
  closeForm(batch?: Batch) {
    this.formClosed.emit(batch || null);

    this.formBatch = {
      batchId: '',
      batchName: '',
      trainerId: '',
      studentIds: [],
      startDate: '',
      endDate: '',
      course: '',
      schedule: ''
    };
  }
}



