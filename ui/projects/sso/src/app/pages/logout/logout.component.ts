import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `
    <div style="text-align: center; padding: 20px;">
      <h3>Logging out...</h3>
      <p>Please wait while we sign you out.</p>
    </div>
  `,
})
export class LogoutComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.performLogout();
  }

  private performLogout() {
    if (typeof window === 'undefined') return;

    const params = this.route.snapshot.queryParams;
    const isFrontChannelLogout = params['frontchannel'] === 'true';
    const issuer = params['iss'];
    const isInIframe = window.self !== window.top;

    const validIssuers = environment.oidc.validIssuers;
    if (isFrontChannelLogout && issuer && !validIssuers.includes(issuer)) {
      return;
    }

    this.clearAuthenticationData();

    if (isFrontChannelLogout || isInIframe) {
      if (window.parent && window.parent !== window) {
        try {
          window.parent.postMessage(
            { type: 'logout-complete', source: 'sso-web', timestamp: Date.now() },
            '*',
          );
        } catch {}
      }
    } else {
      setTimeout(() => {
        const ssoLogoutUrl = `${environment.oidc.logoutEndpoint}?post_logout_redirect_uri=${encodeURIComponent(environment.oidc.postLogoutRedirectUri)}`;
        window.location.href = ssoLogoutUrl;
      }, 1000);
    }
  }

  private clearAuthenticationData() {
    try {
      const keysToRemove = ['access_token', 'id_token', 'refresh_token', 'user', 'code_verifier', 'oauth_state', 'redirectUrl'];
      keysToRemove.forEach((key) => sessionStorage.removeItem(key));
      sessionStorage.clear();
    } catch {}
  }
}
