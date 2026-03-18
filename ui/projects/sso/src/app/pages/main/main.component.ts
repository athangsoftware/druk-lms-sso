import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav, OverlayStore, SideMenuItem, NavMode } from '@projects/shared-lib';
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
  navMode: NavMode = this.navMenus.filter(m => !m.isSeparator && !m.groupHeading).length > 5 ? 'vertical' : 'horizontal';

  private buildNavMenus(): SideMenuItem[] {
    const allMenus: SideMenuItem[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        link: '/main/dashboard',
        iconPath: 'icons/dashboard.svg',
        isEnabled: true,
      },
      // ── User Management ──
      {
        id: 'sep-users',
        label: 'Users',
        isSeparator: true,
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
        iconPath: 'icons/card-account-details.svg',
        isEnabled: true,
      },
      {
        id: 'identity-providers',
        label: 'Identity Providers',
        link: '/main/identity-providers',
        iconPath: 'icons/link.svg',
        isEnabled: true,
      },
      // ── Access Control ──
      {
        id: 'sep-rbac',
        label: 'Access',
        isSeparator: true,
        isEnabled: true,
      },
      {
        id: 'roles',
        label: 'Roles',
        link: '/main/roles',
        iconPath: 'icons/security.svg',
        isEnabled: true,
      },
      {
        id: 'permissions',
        label: 'Permissions',
        link: '/main/permissions',
        iconPath: 'icons/license.svg',
        isEnabled: true,
      },
    ];

    // if (!this.authService.hasPermission('user.create')) {
    //   return [
    //     {
    //       id: 'my-profile',
    //       label: 'My Profile',
    //       link: '/main/my-profile',
    //       iconPath: 'icons/account.svg',
    //       isEnabled: true,
    //     },
    //   ];
    // }

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
