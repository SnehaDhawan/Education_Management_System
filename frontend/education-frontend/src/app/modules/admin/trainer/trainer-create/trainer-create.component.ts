import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trainer } from '../../../../models/interface';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TrainerService } from '../../../../services/trainer.service';

@Component({
  selector: 'app-trainer-create',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './trainer-create.component.html',
  styleUrl: './trainer-create.component.css'
})
export class TrainerCreateComponent implements OnInit {
  @Output() formClosed = new EventEmitter<Trainer | null>();
  @Input() selectedTrainer: Trainer | null = null;

  // ✅ Use ONLY this object everywhere
  formTrainer: Trainer = {
    trainerId: '',
    trainerName: '',
    email: '',
    password: '',
    mobileNo: 0,
    specialization: ''
  };

  constructor(private trainerService: TrainerService) {}

  ngOnInit(): void {
    if (this.selectedTrainer) {
      this.formTrainer = { ...this.selectedTrainer };
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.formTrainer.trainerId) {
        // ✅ Update existing trainer
        this.trainerService.updateTrainer(this.formTrainer).subscribe({
          next: (res: any) => {
            console.log('Trainer updated successfully:', res);
            alert('Trainer updated successfully!');
            this.closeForm(res); // emit updated trainer
          },
          error: (err) => {
            console.error('Error updating trainer:', err);
            alert('Failed to update trainer.');
          },
        });
      } else {
        // ✅ Create new trainer
        this.trainerService.createTrainer(this.formTrainer).subscribe({
          next: (res: any) => {
            console.log('Trainer created successfully:', res);
            alert('Trainer created successfully!');
            this.closeForm(res); // emit new trainer
          },
          error: (err) => {
            console.error('Error creating trainer:', err);
            alert('Failed to create trainer.');
          },
        });
      }
    }
  }

  closeForm(trainer?: Trainer) {
    this.formClosed.emit(trainer || null); 

    this.formTrainer = {
      trainerId: '',
      trainerName: '',
      email: '',
      password: '',
      mobileNo: 0,
      specialization: ''
    };
  }
}