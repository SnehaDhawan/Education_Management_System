export interface LoginRequest {
email: string;
password: string;
role: string; // "ADMIN" | "TRAINER" | "STUDENT"
}


export interface LoginResponse {
token: string; // JWT token (optional if you use HttpOnly cookie)
role: string; // returned role (e.g. "ADMIN")
id :string;
name:string;
}



export interface Student {
  studentId: string;
  studentName: string;
  email: string;
  password: string;
  mobileNo: number;
  batchId: string;
}

export interface Trainer {
  trainerId: string;
  trainerName: string;
  email: string;
  password: string;
  mobileNo: number;
  specialization: string;
  batchId: string; // link batch
}


export interface Batch {
  batchId: string;
  batchName: string;
  trainerId: string;   // link trainer
  studentIds: string[]; // link multiple students
  startDate: string;
  endDate: string;
  course:string;
  schedule :string;
}


export interface TaskAssign {
  id?: number;
  task: string;
  taskName: string;
  assignedDate: string;
  dueDate: string;
  trainerId: number;
  batchId: number;
}
