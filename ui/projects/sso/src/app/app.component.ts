import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader, ToasterComponent } from '@projects/shared-lib';
import { OAuthService } from '@core/oauth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Loader, ToasterComponent],
  template: `
    <app-toaster></app-toaster>
    <app-loader></app-loader>
    <router-outlet />
  `,
})
export class AppComponent {
  protected readonly title = signal('sso-web');
  private auth = inject(OAuthService);
}
