import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav, OverlayStore, SideMenuItem } from '@projects/shared-lib';
import { OAuthService } from '@core/oauth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, Nav],
  template: `
    <ui-nav [menus]="navMenus" navMode="horizontal">
      <div logo>
        <img src="logo/ra_logo.png" alt="GovTech" class="h-8 w-auto brightness-0 invert opacity-90" />
      </div>
      <div top-actions>
        <button
          class="flex items-center space-x-2 text-white hover:text-yellow-300 transition focus:outline-none"
          (click)="logout()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
          </svg>
          <span class="text-sm hidden sm:inline">Logout</span>
        </button>
      </div>
      <router-outlet />
    </ui-nav>
  `,
})
export class MainComponent {
  private overlayService = inject(OverlayStore);
  private oauthService = inject(OAuthService);

  navMenus: SideMenuItem[] = [
    {
      id: 'dashboards',
      label: 'Dashboards',
      link: '/main/dashboards',
      iconPath: 'icons/dashboard.svg',
      isEnabled: true,
    },
    {
      id: 'charts',
      label: 'Charts',
      link: '/main/charts',
      iconPath: 'icons/application.svg',
      isEnabled: true,
    },
    {
      id: 'db-connections',
      label: 'DB Connections',
      link: '/main/db-connections',
      iconPath: 'icons/account.svg',
      isEnabled: true,
    },
    {
      id: 'ai-providers',
      label: 'AI Providers',
      link: '/main/ai-providers',
      iconPath: 'icons/application.svg',
      isEnabled: true,
    },
    {
      id: 'global-filters',
      label: 'Global Filters',
      link: '/main/global-filters',
      iconPath: 'icons/application.svg',
      isEnabled: true,
    },
  ];

  logout() {
    this.overlayService.openAlert('Logout!', 'Are you sure you want to Logout?').then((confirmed) => {
      if (confirmed) {
        this.oauthService.logout();
      }
    });
  }
}
