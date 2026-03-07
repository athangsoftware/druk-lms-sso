import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from '@core/oauth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: `
    <div class="flex items-center justify-center h-screen">
      <div class="text-center">
        <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-neutral-600">Authenticating...</p>
      </div>
    </div>
  `,
})
export class CallbackComponent {
  private oauthService = inject(OAuthService);
  private router = inject(Router);

  async ngOnInit(): Promise<void> {
    const hasCode = window.location.search.includes('code=');
    if (hasCode) {
      try {
        await this.oauthService.processOAuthCallback();
        this.router.navigate(['/main']);
      } catch {
        this.router.navigate(['/unauthorized']);
      }
    } else {
      this.router.navigate(['/main']);
    }
  }
}
