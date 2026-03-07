import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav, OverlayStore, SideMenuItem } from '@projects/shared-lib';
import { AccountSettingComponent } from './account-setting/account-setting.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, Nav],
  templateUrl: './main.component.html',
})
export class MainComponent {
  overlayService = inject(OverlayStore);

  @ViewChild('accountSetting', { static: true }) accountSetting!: ElementRef;

  navMenus: SideMenuItem[] = [
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
  ];

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
