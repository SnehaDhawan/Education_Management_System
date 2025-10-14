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


export interface Attendance {
  trainerId: string;
  batchId: string;
  studentId: string;
  date: string; // yyyy-MM-dd
  status: 'PRESENT' | 'ABSENT';
}


export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080' 
};
