import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private baseUrl = 'http://localhost:8083/auth';


constructor(private http: HttpClient, private router: Router) {}


// call backend login
login(request: LoginRequest): Observable<LoginResponse> {
// if backend sets HttpOnly cookie, send withCredentials: true
return this.http.post<LoginResponse>(`${this.baseUrl}/login`, request /*, { withCredentials: true }*/);
}


logout() {
localStorage.removeItem('token');
localStorage.removeItem('role');
localStorage.removeItem('userId');
this.router.navigate(['/login']);
}


getToken(): string | null { return localStorage.getItem('token'); }
getRole(): string | null { return localStorage.getItem('role'); }
isLoggedIn(): boolean { return !!this.getToken(); }


// lightweight JWT parse (no extra dependency)
parseJwt(token: string | null) {
if (!token) return null;
try {
const payload = token.split('.')[1];
return JSON.parse(atob(payload));
} catch (e) {
return null;
}
}


getUserId(): string | null {
const token = this.getToken();
const payload = this.parseJwt(token);
return (payload && (payload.userId || payload.sub)) || localStorage.getItem('userId');
}
}

