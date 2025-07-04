import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type TRegisterPayload = {
  username: string;
  password: string;
  role: 'user' | 'admin';
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/ath'

  register(payload: TRegisterPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }


  private readonly userKey = 'currentUser'
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      const user = { username, role: 'admin' };
      localStorage.setItem(this.userKey, JSON.stringify(user));
      return true;
    } else if (username && password) {
      const user = { username, role: 'user' };
      localStorage.setItem(this.userKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  getUser() {
    const raw = localStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
}
