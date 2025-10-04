import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Batch, Trainer } from '../../../../models/interface';
import { BatchService } from '../../../../services/batch.service';
import { BatchCreateComponent } from "../batch-create/batch-create.component";
import { TrainerService } from '../../../../services/trainer.service';

@Component({
  selector: 'app-batch-list',
  standalone :true,
  imports: [CommonModule, FormsModule, BatchCreateComponent],
  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.css'
})



export class BatchListComponent implements OnInit {
  batches: Batch[] = [];
  trainers: Trainer[] = [];
  trainerMap: { [id: string]: string } = {}; 
  showForm = false;
  selectedBatch: Batch | null = null;

  constructor(
    private batchService: BatchService,
    private trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.loadBatches();
    this.loadTrainers();
  }

  loadBatches(): void {
    this.batchService.getAllBatches().subscribe({
      next: (data: Batch[]) => {
        this.batches = data;
      },
      error: (err) => console.error('Error fetching batches:', err)
    });
  }

  loadTrainers(): void {
    this.trainerService.getAllTrainers().subscribe({
      next: (data: Trainer[]) => {
        this.trainers = data;
        this.trainerMap = {};
        data.forEach(t => this.trainerMap[t.trainerId] = t.trainerName);
      },
      error: (err) => console.error('Error fetching trainers:', err)
    });
  }

  // ✅ Fix edit: clone batch so two-way binding in child works
  editBatch(batch: Batch) {
    this.selectedBatch = { ...batch }; 
    this.showForm = true;
  }

  deleteBatch(batchId: string) {
    if (!confirm('Are you sure you want to delete this batch?')) return;

    this.batchService.deleteBatch(batchId).subscribe({
      next: () => {
        this.batches = this.batches.filter(b => b.batchId !== batchId);
        alert('Batch deleted successfully!');
      },
      error: (err) => console.error('Failed to delete batch:', err)
    });
  }

  closeForm(updatedBatch: Batch | null) {
    this.showForm = false;
    if (updatedBatch) {
      const index = this.batches.findIndex(b => b.batchId === updatedBatch.batchId);
      if (index !== -1) {
        this.batches[index] = updatedBatch;
      } else {
        this.batches.push(updatedBatch);
      }
    }
    this.selectedBatch = null;
  }

  getTrainerName(trainerId: string): string {
    return this.trainerMap[trainerId] || 'Unknown';
  }
}
