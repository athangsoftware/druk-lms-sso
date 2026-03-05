import { Component, inject, signal } from '@angular/core';
import { email as emailValidator, form, FormField, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, httpQuery, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { GetUserSelfResponse, UpdateUserSelfResponse } from '@core/api/model';
import { environment } from '@environments/environment';

interface UpdateProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, FormField],
  templateUrl: './update-profile.component.html',
})
export class UpdateProfileComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);

  profileModel = signal<UpdateProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  profileForm = form(this.profileModel, (s) => {
    required(s.firstName);
    required(s.lastName);
    emailValidator(s.email);
  });

  userQuery = httpQuery<GetUserSelfResponse>({
    request: () => `${environment.apiUrl}/users/me`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.profileModel.set({
        firstName: response.data?.firstName ?? '',
        lastName: response.data?.lastName ?? '',
        email: response.data?.email ?? '',
        phoneNumber: response.data?.phoneNumber ?? '',
      });
    },
  });

  updateProfileMutation = httpMutation<UpdateUserSelfResponse>({
    request: () => this.apiService.updateUserSelf(this.profileModel()),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return (
      this.profileForm.firstName().valid() &&
      this.profileForm.lastName().valid()
    );
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.updateProfileMutation.trigger();
  }
}
