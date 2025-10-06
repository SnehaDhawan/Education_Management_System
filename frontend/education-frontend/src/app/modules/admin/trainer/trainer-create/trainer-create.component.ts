import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Trainer } from '../../../../models/interface';
import { Batch } from '../../../../models/interface';
import { TrainerService } from '../../../../services/trainer.service';
import { BatchService } from '../../../../services/batch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trainer-create',
  standalone:true,
  imports : [CommonModule,FormsModule],
  templateUrl: './trainer-create.component.html',
  styleUrl: './trainer-create.component.css'
})
export class TrainerCreateComponent implements OnInit {

  @Output() formClosed = new EventEmitter<Trainer | null>();
  @Input() selectedTrainer: Trainer | null = null;

  // Trainer form model
  formTrainer: Trainer = {
    trainerId: '',
    trainerName: '',
    email: '',
    password: '',
    mobileNo: 0,
    specialization: '',
    batchId: '' 
  };

  // Array to populate batch dropdown
  batches: Batch[] = [];

  constructor(
    private trainerService: TrainerService,
    private batchService: BatchService
  ) {}

  ngOnInit(): void {
    // Load batches for dropdown
    this.batchService.getAllBatches().subscribe({
      next: (data: Batch[]) => this.batches = data,
      error: (err) => console.error('Error fetching batches:', err)
    });

    // If editing an existing trainer
    if (this.selectedTrainer) {
      this.formTrainer = { ...this.selectedTrainer };
    }
  }

  // Form submission
  onSubmit(form: NgForm) {
    // Validation patterns
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const mobilePattern = /^[6-9]\d{9}$/;

    if (!emailPattern.test(this.formTrainer.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!passwordPattern.test(this.formTrainer.password)) {
      alert('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
      return;
    }

    if (!mobilePattern.test(this.formTrainer.mobileNo.toString())) {
      alert('Mobile number must be 10 digits and start with 6, 7, 8, or 9.');
      return;
    }

    if (form.valid) {
      if (this.formTrainer.trainerId) {
        // Update existing trainer
        this.trainerService.updateTrainer(this.formTrainer).subscribe({
          next: (res: any) => {
            alert('Trainer updated successfully!');
            this.closeForm(res);
          },
          error: (err) => {
            console.error('Error updating trainer:', err);
            alert('Failed to update trainer.');
          }
        });
      } else {
        // Create new trainer
        this.trainerService.createTrainer(this.formTrainer).subscribe({
          next: (res: any) => {
            alert('Trainer created successfully!');
            this.closeForm(res);
          },
          error: (err) => {
            console.error('Error creating trainer:', err);
            alert('Failed to create trainer.');
          }
        });
      }
    }
  }

  // Close form and reset
  closeForm(trainer?: Trainer) {
    this.formClosed.emit(trainer || null);
    this.formTrainer = {
      trainerId: '',
      trainerName: '',
      email: '',
      password: '',
      mobileNo: 0,
      specialization: '',
      batchId: '' 
    };
  }
}
