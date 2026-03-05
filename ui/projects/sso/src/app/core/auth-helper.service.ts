import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

const accessTokenKey = 'access_token';
const userKey = 'user';
const redirectUrlKey = 'redirectUrl';

@Injectable({ providedIn: 'root' })
export class AuthHelperService {
  isUserLogged$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.isUserLogged$.next(!!sessionStorage.getItem(accessTokenKey));
  }

  async storePreference(accessToken: string, userDetail?: { username: string; name: string }): Promise<void> {
    sessionStorage.setItem(accessTokenKey, accessToken);
    sessionStorage.setItem(userKey, JSON.stringify(userDetail));
    this.isUserLogged$.next(true);

    const redirectUrl = sessionStorage.getItem(redirectUrlKey);
    sessionStorage.removeItem(redirectUrlKey);

    if (redirectUrl) {
      try {
        const url = new URL(redirectUrl);
        const relativePath = url.pathname + url.search;
        if (relativePath === '/' || relativePath === '/callback' || relativePath.startsWith('/callback?')) {
          await this.router.navigateByUrl('/main');
        } else {
          await this.router.navigateByUrl(relativePath);
        }
      } catch {
        await this.router.navigateByUrl('/main');
      }
    } else {
      await this.router.navigateByUrl('/main');
    }
  }

  storeRedirectUrl(url: string): void {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.pathname !== '/' && parsedUrl.pathname !== '/callback') {
        sessionStorage.setItem(redirectUrlKey, url);
      }
    } catch {}
  }

  isUserLogged(): boolean {
    return !!sessionStorage.getItem(accessTokenKey);
  }

  getAccessToken(): string {
    return sessionStorage.getItem(accessTokenKey) ?? '';
  }

  getUserDetail(): { username?: string; name?: string } {
    return JSON.parse(sessionStorage.getItem(userKey) || '{}');
  }

  public decodeToken(token: string): { role?: string } | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  isMember(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    const decoded = this.decodeToken(token);
    return decoded?.role?.toLowerCase() === 'member';
  }

  isModerator(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    const decoded = this.decodeToken(token);
    return decoded?.role?.toLowerCase() === 'modrator';
  }

  removePreference(): void {
    sessionStorage.removeItem(accessTokenKey);
    sessionStorage.removeItem(userKey);
    sessionStorage.removeItem(redirectUrlKey);
    this.isUserLogged$.next(false);
  }
}
