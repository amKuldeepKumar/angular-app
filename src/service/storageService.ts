import { Injectable } from '@angular/core';


export const SESSION_KEYS = {
  TOKEN: 'TOKEN',
  EXPIRY: 'EXPIRY',
  USER: 'USER'
}


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  setUser(user: any): any {
    if (this.isBrowser()) {
      const data = JSON.stringify(user)
      window.localStorage.setItem(SESSION_KEYS.USER, data);
    }
  }

  getUser(): any {
    if (this.isBrowser()) {
      return JSON.parse(window.localStorage.getItem(SESSION_KEYS.USER) || 'null');
    }

  }

  removeUser() {
    if (this.isBrowser()) {
      return localStorage.removeItem(SESSION_KEYS.USER)
    }
    return null;
  }
}
