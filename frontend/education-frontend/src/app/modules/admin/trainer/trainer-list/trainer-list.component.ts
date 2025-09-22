import { Component } from '@angular/core';
import { Trainer } from '../../../../models/interface';
import { TrainerService } from '../../../../services/trainer.service';
import { TrainerCreateComponent } from "../trainer-create/trainer-create.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainer-list',
  standalone:true,
  imports: [TrainerCreateComponent,CommonModule,FormsModule],
  templateUrl: './trainer-list.component.html',
  styleUrl: './trainer-list.component.css'
})

export class TrainerListComponent {
  trainers: Trainer[] = [];
  showForm = false;
  selectedTrainer: Trainer | null = null;

  constructor(private trainerService: TrainerService) {}

  ngOnInit(): void {
    this.loadTrainers();
  }

  loadTrainers(): void {
    this.trainerService.getAllTrainers().subscribe({
      next: (data) => {
        this.trainers = data;
      },
      error: (err) => {
        console.error('Error loading trainers:', err);
      }
    });
  }

  editTrainer(trainer: Trainer) {
    this.selectedTrainer = { ...trainer };
    this.showForm = true;
  }

  deleteTrainer(trainerId: string) {
    this.trainerService.deleteTrainer(trainerId).subscribe({
      next: () => {
        this.trainers = this.trainers.filter(t => t.trainerId !== trainerId);
      },
      error: (err) => {
        console.error('Error deleting trainer:', err);
      }
    });
  }

 closeForm(updatedTrainer: Trainer | null) {
  if (updatedTrainer) {
    if (updatedTrainer.trainerId) {
      const index = this.trainers.findIndex(t => t.trainerId === updatedTrainer.trainerId);
      if (index !== -1) {
        this.trainers[index] = updatedTrainer;
      }
    } else {
      const newId =
        this.trainers.length > 0
          ? Math.max(...this.trainers.map(t => +t.trainerId)) + 1
          : 1;
      this.trainers.push({ ...updatedTrainer, trainerId: String(newId) });
    }
  }

  this.showForm = false;
  this.selectedTrainer = null;
}
}
