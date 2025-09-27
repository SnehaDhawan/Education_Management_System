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
    // Custom validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const mobilePattern = /^[6-9]\d{9}$/;

    const emailValid = emailPattern.test(this.formTrainer.email);
    const passwordValid = passwordPattern.test(this.formTrainer.password);
    const mobileValid = mobilePattern.test(this.formTrainer.mobileNo.toString());

    if (!emailValid) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!passwordValid) {
      alert('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
      return;
    }
    if (!mobileValid) {
      alert('Mobile number must be 10 digits and start with 6, 7, 8, or 9.');
      return;
    }

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