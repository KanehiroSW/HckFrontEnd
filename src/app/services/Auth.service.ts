import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor() { }

  login(userDetails: string): void {
    this.isLoggedIn = true;
    localStorage.setItem('authToken', userDetails);
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || !!localStorage.getItem('authToken');
  }
}