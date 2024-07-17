import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';

  constructor() { }

  login(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}