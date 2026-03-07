import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

const accessTokenKey = 'access_token';
const userKey = 'user';

@Injectable({ providedIn: 'root' })
export class AuthHelperService {
  isUserLogged$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.isUserLogged$.next(!!localStorage.getItem(accessTokenKey));
  }

  storeToken(accessToken: string, userDetail?: { username: string; name: string }): void {
    localStorage.setItem(accessTokenKey, accessToken);
    localStorage.setItem(userKey, JSON.stringify(userDetail));
    this.isUserLogged$.next(true);
  }

  isUserLogged(): boolean {
    return !!localStorage.getItem(accessTokenKey);
  }

  getAccessToken(): string {
    return localStorage.getItem(accessTokenKey) ?? '';
  }

  getUserDetail(): { username?: string; name?: string } {
    return JSON.parse(localStorage.getItem(userKey) || '{}');
  }

  decodeToken(token: string): { role?: string; sub?: string } | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  removePreference(): void {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(userKey);
    this.isUserLogged$.next(false);
    this.router.navigateByUrl('/unauthorized');
  }
}
