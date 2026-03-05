import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Breadcrumb, OverlayStore } from '@projects/shared-lib';
import { AccountSettingComponent } from './account-setting/account-setting.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, Breadcrumb],
  templateUrl: './main.component.html',
})
export class MainComponent {
  overlayService = inject(OverlayStore);

  @ViewChild('accountSetting', { static: true }) accountSetting!: ElementRef;

  toggleDropdown() {
    this.overlayService.openNearElement(AccountSettingComponent, this.accountSetting.nativeElement, {
      positionPreference: 'bottomCenter',
      scrollStrategy: 'reposition',
    });
  }
}
