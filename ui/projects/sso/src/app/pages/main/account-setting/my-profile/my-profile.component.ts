import { Component, inject } from '@angular/core';
import { Button, OverlayStore, httpQuery } from '@projects/shared-lib';
import { Router } from '@angular/router';
import { GetUserSelfResponse } from '@core/api/model';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AuthHelperService } from '@core/auth-helper.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [Button],
  templateUrl: './my-profile.component.html',
})
export class MyProfileComponent {
  overlayService = inject(OverlayStore);
  authHelperService = inject(AuthHelperService);
  private router = inject(Router);

  userQuery = httpQuery<GetUserSelfResponse>({
    request: () => `${environment.apiUrl}/users/me`,
    handleSuccess: false,
    handleError: true,
  });

  get initials(): string {
    const firstName = this.userQuery.value()?.data?.firstName ?? '';
    const lastName = this.userQuery.value()?.data?.lastName ?? '';
    return `${firstName[0] ?? ''}${lastName[0] ?? ''}`;
  }

  editProfile() {
    this.overlayService.openModal(UpdateProfileComponent, {
      disableClose: true,
      onClose: () => this.userQuery.refetch(),
    });
  }

  goBack() {
    this.router.navigate(['main/users']);
  }
}
