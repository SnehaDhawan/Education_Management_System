export interface LoginRequest {
email: string;
password: string;
role: string; // "ADMIN" | "TRAINER" | "STUDENT"
}


export interface LoginResponse {
token: string; // JWT token (optional if you use HttpOnly cookie)
role: string; // returned role (e.g. "ADMIN")
}



export interface Student {
  studentId: string;
  studentName: string;
  email: string;
  password: string;
  mobileNo: number;
  class: string;
}

export interface Trainer {
  trainerId: string;
  trainerName: string;
  email: string;
  password: string;
  mobileNo: number;
  specialization: string;
}



