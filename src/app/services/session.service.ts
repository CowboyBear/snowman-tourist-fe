import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {  
  private readonly SESSION_STORAGE_KEY = "LOGGED_FB_USER";

  constructor() { }

  invalidateSession() {
    window.sessionStorage.removeItem(this.SESSION_STORAGE_KEY);
  }

  createSession(user: User) {
    window.sessionStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(user));
  }

  getUserFromSession(): User {
    return JSON.parse(window.sessionStorage.getItem(this.SESSION_STORAGE_KEY));
  }
}
