import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav, OverlayStore, SideMenuItem } from '@projects/shared-lib';
import { AuthHelperService } from '@core/auth-helper.service';
import { AccountSettingComponent } from './account-setting/account-setting.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, Nav],
  templateUrl: './main.component.html',
})
export class MainComponent {
  overlayService = inject(OverlayStore);
  private authService = inject(AuthHelperService);

  @ViewChild('accountSetting', { static: true }) accountSetting!: ElementRef;

  navMenus: SideMenuItem[] = this.buildNavMenus();

  private buildNavMenus(): SideMenuItem[] {
    const allMenus: SideMenuItem[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        link: '/main/dashboard',
        iconPath: 'icons/dashboard.svg',
        isEnabled: true,
      },
      {
        id: 'users',
        label: 'Users',
        link: '/main/users',
        iconPath: 'icons/account.svg',
        isEnabled: true,
      },
      {
        id: 'clients',
        label: 'Clients',
        link: '/main/clients',
        iconPath: 'icons/application.svg',
        isEnabled: true,
      },
      {
        id: 'identity-providers',
        label: 'Identity Providers',
        link: '/main/identity-providers',
        iconPath: 'icons/application.svg',
        isEnabled: true,
      },
      {
        id: 'roles',
        label: 'Roles',
        link: '/main/roles',
        iconPath: 'icons/application.svg',
        isEnabled: true,
      },
      {
        id: 'permissions',
        label: 'Permissions',
        link: '/main/permissions',
        iconPath: 'icons/application.svg',
        isEnabled: true,
      },
      {
        id: 'permission-groups',
        label: 'Permission Groups',
        link: '/main/permission-groups',
        iconPath: 'icons/application.svg',
        isEnabled: true,
      },
      {
        id: 'resources',
        label: 'Resources',
        link: '/main/resources',
        iconPath: 'icons/application.svg',
        isEnabled: true,
      },
      {
        id: 'actions',
        label: 'Actions',
        link: '/main/actions',
        iconPath: 'icons/application.svg',
        isEnabled: true,
      },
    ];

    if (this.authService.isMember()) {
      return [
        {
          id: 'my-profile',
          label: 'My Profile',
          link: '/main/my-profile',
          iconPath: 'icons/account.svg',
          isEnabled: true,
        },
      ];
    }

    return allMenus;
  }

  onNavMenuClick(menu: SideMenuItem) {
    // navigation is handled by routerLink inside ui-side-nav-menu
  }

  toggleDropdown() {
    this.overlayService.openNearElement(AccountSettingComponent, this.accountSetting.nativeElement, {
      positionPreference: 'bottomCenter',
      scrollStrategy: 'reposition',
    });
  }
}
