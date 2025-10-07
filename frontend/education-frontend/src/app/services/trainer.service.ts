import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Trainer } from '../models/interface';
import { ApiLinks } from '../../api/apiLinks';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

constructor(private http: HttpClient) {}

  // ✅ Create Trainer
  createTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(
      ApiLinks.baseLinkTrainer + ApiLinks.createTrainer,
      trainer
    );
  }

  // ✅ Get All Trainers
  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(
      ApiLinks.baseLinkTrainer + ApiLinks.getAllTrainer
    );
  }

  // ✅ Update Trainer
  updateTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.put<Trainer>(
      `${ApiLinks.baseLinkTrainer}${ApiLinks.updateTrainer}/${trainer.trainerId}`,
      trainer
    );
  }

  // ✅ Delete Trainer
  deleteTrainer(trainerId: string): Observable<void> {
    return this.http.delete<void>(
      `${ApiLinks.baseLinkTrainer}${ApiLinks.deleteTrainer}/${trainerId}`
    );
  }

    getTrainerById(trainerId: string): Observable<Trainer> {
    return this.http.get<Trainer>(
      `${ApiLinks.baseLinkTrainer}${ApiLinks.getByTrainerId}/${trainerId}`
    );
  }
}


