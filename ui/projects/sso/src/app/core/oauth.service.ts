import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { tap, firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { sha256 } from 'js-sha256';

interface TokenResponse {
  access_token: string;
  id_token?: string;
  refresh_token?: string;
}

interface OIDCConfiguration {
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint?: string;
  issuer: string;
}

@Injectable({ providedIn: 'root' })
export class OAuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private accessToken = signal<string | null>(null);
  private authError = signal<string | null>(null);
  private oidcConfig = signal<OIDCConfiguration | null>(null);

  private apiUrl = environment.apiUrl;

  constructor() {
    this.checkAuthStatus();
  }

  async initiateProviderLogin(slug: string): Promise<void> {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const clientId = urlParams.get('client_id');
      const redirectUri = urlParams.get('redirect_uri');
      const state = urlParams.get('state') ?? '';
      const codeChallenge = urlParams.get('code_challenge') ?? '';

      if (!clientId || !redirectUri) {
        throw new Error('Missing client_id or redirect_uri in query parameters');
      }

      const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: 'openid profile email',
        state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
      });
      window.location.href = `${this.apiUrl}/auth/${slug}?${queryParams.toString()}`;
    } catch (error) {
      console.error(`Failed to initiate ${slug} login:`, error);
      this.authError.set(`Unable to start ${slug} authentication`);
    }
  }

  async initiateGoogleLogin(): Promise<void> {
    return this.initiateProviderLogin('google');
  }

  async initiateNdiLogin(): Promise<any> {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const state = urlParams.get('state') ?? '';
      const codeChallenge = urlParams.get('code_challenge') ?? '';

      const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: environment.oidc.clientId,
        redirect_uri: environment.oidc.redirectUri,
        scope: 'openid profile',
        state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
      });

      const response = await firstValueFrom(
        this.http.get<any>(`${this.apiUrl}/auth/ndi?${queryParams.toString()}`).pipe(
          tap((res) => console.log('NDI auth response:', res)),
        ),
      );

      if (response.statusCode !== 201 || !response.data?.deepLinkURL) {
        throw new Error('Failed to obtain NDI deepLinkURL');
      }

      return response;
    } catch (error) {
      console.error('Failed to initiate NDI login:', error);
      this.authError.set('Unable to start NDI authentication');
      throw error;
    }
  }

  async initOAuthFlow(): Promise<void> {
    try {
      await this.loadOIDCConfig();
      const state = uuidv4();
      const codeVerifier = this.generateCodeVerifier();
      sessionStorage.setItem('code_verifier', codeVerifier);
      sessionStorage.setItem('oauth_state', state);

      const codeChallenge = await this.generateCodeChallenge(codeVerifier);
      const authUrl = this.buildAuthorizationUrl(state, codeChallenge);
      window.location.href = authUrl;
    } catch (error) {
      console.error('Failed to initiate OAuth flow:', error);
      this.authError.set('Unable to start authentication process');
    }
  }

  async processOAuthCallback(): Promise<void> {
    try {
      const { code, state } = this.parseCallbackParams();
      const storedVerifier = sessionStorage.getItem('code_verifier');
      const storedState = sessionStorage.getItem('oauth_state');

      if (!code || !storedVerifier || !state || state !== storedState) {
        throw new Error('Invalid authorization code or state');
      }

      const tokenResponse = await this.exchangeCodeForToken(code, storedVerifier);
      this.storeTokens(tokenResponse);
      this.cleanupCallback();
      await this.router.navigate(['/main']);
    } catch (error) {
      console.error('Failed to process OAuth callback:', error);
      this.authError.set('Authentication failed');
      await this.router.navigate(['/login']);
    }
  }

  async refreshToken(): Promise<void> {
    try {
      const refreshToken = sessionStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error('No refresh token');

      const response = await fetch(`${this.apiUrl}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
        credentials: 'include',
      });
      const result: TokenResponse = await response.json();
      if (result.access_token) {
        this.storeTokens(result);
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Refresh error:', error);
      this.logout();
    }
  }

  getAccessToken(): string | null {
    return this.accessToken();
  }

  isLoggedIn(): boolean {
    return !!this.accessToken();
  }

  getRedirectUrl(): string | null {
    return sessionStorage.getItem('redirectUrl');
  }

  async logout(): Promise<void> {
    try {
      const idToken = sessionStorage.getItem('id_token');
      await this.loadOIDCConfig();
      const config = this.oidcConfig();
      if (config?.end_session_endpoint) {
        const params = new URLSearchParams({
          post_logout_redirect_uri: environment.oidc.logoutUri,
        });
        if (idToken) {
          params.append('id_token_hint', idToken);
        }
        window.location.href = `${config.end_session_endpoint}?${params.toString()}`;
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      this.accessToken.set(null);
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('id_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('code_verifier');
      sessionStorage.removeItem('oauth_state');
      sessionStorage.removeItem('redirectUrl');
    }
  }

  private async loadOIDCConfig(): Promise<void> {
    if (this.oidcConfig()) return;
    try {
      const response = await fetch(`${environment.oidc.issuer}/.well-known/openid-configuration`);
      const config = await response.json();
      this.oidcConfig.set(config);
    } catch (error) {
      console.error('Failed to load OIDC config:', error);
      throw error;
    }
  }

  private buildAuthorizationUrl(state: string, codeChallenge: string): string {
    const config = this.oidcConfig();
    if (!config) throw new Error('OIDC config not loaded');

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: environment.oidc.clientId,
      redirect_uri: environment.oidc.redirectUri,
      scope: 'openid profile email',
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    return `${config.authorization_endpoint}?${params.toString()}`;
  }

  private async exchangeCodeForToken(code: string, codeVerifier: string): Promise<TokenResponse> {
    await this.loadOIDCConfig();

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: environment.oidc.clientId,
      code,
      redirect_uri: environment.oidc.redirectUri,
      code_verifier: codeVerifier,
    });

    const response = await fetch(this.oidcConfig()?.token_endpoint ?? '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    return response.json();
  }

  private storeTokens(tokenResponse: TokenResponse): void {
    sessionStorage.setItem('access_token', tokenResponse.access_token);
    if (tokenResponse.id_token) sessionStorage.setItem('id_token', tokenResponse.id_token);
    if (tokenResponse.refresh_token) sessionStorage.setItem('refresh_token', tokenResponse.refresh_token);
    this.accessToken.set(tokenResponse.access_token);
  }

  private cleanupCallback(): void {
    sessionStorage.removeItem('code_verifier');
    sessionStorage.removeItem('oauth_state');
    history.replaceState(null, '', environment.oidc.redirectUri);
  }

  private parseCallbackParams(): { code: string | null; state: string | null } {
    const params = new URLSearchParams(window.location.search);
    return { code: params.get('code'), state: params.get('state') };
  }

  private generateCodeVerifier(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let randomString = '';
    for (let i = 0; i < 43; i++) {
      randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomString;
  }

  private async generateCodeChallenge(verifier: string): Promise<string> {
    const hashBuffer = sha256.arrayBuffer(verifier);
    const hashArray = new Uint8Array(hashBuffer);
    return this.base64urlEncode(hashArray);
  }

  private base64urlEncode(buffer: Uint8Array): string {
    let str = '';
    for (const byte of buffer) {
      str += String.fromCharCode(byte);
    }
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  private checkAuthStatus() {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      this.accessToken.set(token);
      this.router.navigate(['/main']);
    }
  }
}
