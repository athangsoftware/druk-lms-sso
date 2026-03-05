import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHelperService } from '@core/auth-helper.service';
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
  private auth = inject(OAuthService);
  private router = inject(Router);
  private authHelperService = inject(AuthHelperService);

  async ngOnInit() {
    const hasCode = window.location.search.includes('code=');
    if (hasCode) {
      try {
        await this.auth.processOAuthCallback();
        const token = this.auth.getAccessToken();
        if (!token) {
          await this.router.navigateByUrl('/');
        }
        this.router.navigate(['/main']);
      } catch {
        await this.router.navigateByUrl('/');
      }
    } else {
      await this.auth.initOAuthFlow();
    }
  }
}
