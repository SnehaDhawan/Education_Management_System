import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BatchService } from '../../../../services/batch.service';
import { Batch, Trainer } from '../../../../models/interface';
import { TrainerService } from '../../../../services/trainer.service';

@Component({
  selector: 'app-batch-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './batch-create.component.html',
  styleUrl: './batch-create.component.css',
})
export class BatchCreateComponent implements OnInit {
  @Input() selectedBatch: Batch | null = null; // ✅ Input property
  @Output() formClose: EventEmitter<Batch | null> = new EventEmitter();

  constructor(private batchService: BatchService, private trainerService: TrainerService) {}
  trainers: Trainer[] = [];
  formBatch: Batch = {
    batchId: '',
    batchName: '',
    trainerId: '',
    studentIds: [],
    startDate: '',
    endDate: '',
    course: '',
    schedule: '',
  };

  ngOnInit(): void {
    if (this.selectedBatch) {
      this.formBatch = { ...this.selectedBatch };
    }
    this.loadTrainers();
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.formBatch.batchId) {
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
  closeForm(batch?: Batch) {
    this.formClose.emit(batch || null);
    this.formBatch = {
      batchId: '',
      batchName: '',
      trainerId: '',
      studentIds: [],
      startDate: '',
      endDate: '',
      course: '',
      schedule: '',
    };
  }
  loadTrainers(): void {
    this.trainerService.getAllTrainers().subscribe({
      next: (data) => {
        this.trainers = data;
      },
      error: (err) => {
        console.error('Error loading trainers:', err);
      },
    });
  }
}
