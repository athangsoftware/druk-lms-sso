import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthHelperService } from './auth-helper.service';
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
  private router = inject(Router);
  private authHelper = inject(AuthHelperService);
  private oidcConfig = signal<OIDCConfiguration | null>(null);

  async initOAuthFlow(): Promise<void> {
    await this.loadOIDCConfig();
    const state = this.generateRandomString();
    const codeVerifier = this.generateCodeVerifier();
    sessionStorage.setItem('code_verifier', codeVerifier);
    sessionStorage.setItem('oauth_state', state);

    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    const authUrl = this.buildAuthorizationUrl(state, codeChallenge);
    window.location.href = authUrl;
  }

  async processOAuthCallback(): Promise<void> {
    const { code, state } = this.parseCallbackParams();
    const storedVerifier = sessionStorage.getItem('code_verifier');
    const storedState = sessionStorage.getItem('oauth_state');

    if (!code || !storedVerifier || !state || state !== storedState) {
      throw new Error('Invalid authorization code or state mismatch');
    }

    const tokenResponse = await this.exchangeCodeForToken(code, storedVerifier);
    this.storeTokens(tokenResponse);
    this.cleanupCallback();
  }

  async logout(): Promise<void> {
    const idToken = sessionStorage.getItem('id_token');
    try {
      await this.loadOIDCConfig();
      const config = this.oidcConfig();
      if (config?.end_session_endpoint) {
        const params = new URLSearchParams({
          post_logout_redirect_uri: environment.oidc.postLogoutRedirectUri,
        });
        if (idToken) {
          params.append('id_token_hint', idToken);
        }
        this.authHelper.removePreference();
        window.location.href = `${config.end_session_endpoint}?${params.toString()}`;
        return;
      }
    } catch {
      // fall through to local logout
    }
    this.authHelper.removePreference();
  }

  private async loadOIDCConfig(): Promise<void> {
    if (this.oidcConfig()) return;
    const response = await fetch(
      `${environment.oidc.issuer}/.well-known/openid-configuration`,
    );
    if (!response.ok) {
      throw new Error('Failed to load OIDC configuration');
    }
    const config = await response.json();
    this.oidcConfig.set(config);
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
    const tokenEndpoint = this.oidcConfig()?.token_endpoint;
    if (!tokenEndpoint) throw new Error('Token endpoint not available');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: environment.oidc.clientId,
      code,
      redirect_uri: environment.oidc.redirectUri,
      code_verifier: codeVerifier,
    });

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange authorization code for token');
    }

    return response.json();
  }

  private storeTokens(tokenResponse: TokenResponse): void {
    if (tokenResponse.id_token) {
      sessionStorage.setItem('id_token', tokenResponse.id_token);
    }
    if (tokenResponse.refresh_token) {
      sessionStorage.setItem('refresh_token', tokenResponse.refresh_token);
    }

    const decoded = this.authHelper.decodeToken(tokenResponse.access_token) as Record<string, unknown> | null;
    this.authHelper.storeToken(tokenResponse.access_token, {
      username: (decoded?.['sub'] as string) ?? '',
      name: (decoded?.['name'] as string) ?? (decoded?.['sub'] as string) ?? '',
    });
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
    let result = '';
    for (let i = 0; i < 43; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private generateRandomString(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
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
}
