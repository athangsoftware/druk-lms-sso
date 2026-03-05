import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OAuthService } from '@core/oauth.service';
import { OverlayStore } from '@projects/shared-lib';
import { BaseComponent } from '@core/base-component';

@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './account-setting.component.html',
})
export class AccountSettingComponent extends BaseComponent {
  private auth = inject(OAuthService);
  overlayService = inject(OverlayStore);
  dialogRef = inject(DialogRef);

  logout() {
    this.overlayService.openAlert('Logout!', 'Are you sure you want to Logout?').then((confirmed) => {
      if (confirmed) {
        this.auth.logout();
        this.dialogRef.close();
      }
    });
  }

  goToMyProfile() {
    this.router.navigate(['/main/my-profile']);
    this.dialogRef.close();
  }
}
