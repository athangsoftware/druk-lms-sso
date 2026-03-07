import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav, SideMenuItem } from '@projects/shared-lib';
import { AuthHelperService } from '@core/auth-helper.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, Nav],
  template: `
    <ui-nav [menus]="navMenus" navMode="horizontal">
      <div logo>
        <span class="text-white font-bold text-lg">Report</span>
      </div>
      <router-outlet />
    </ui-nav>
  `,
})
export class MainComponent {
  private authHelper = inject(AuthHelperService);

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
  ];
}
