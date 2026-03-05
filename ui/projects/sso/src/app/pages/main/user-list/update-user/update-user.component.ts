import { Component, inject, signal } from '@angular/core';
import { email as emailValidator, form, FormField, required } from '@angular/forms/signals';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, SingleSelectionFieldComponent, httpQuery, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { GetRoleListResponse, GetUserListItem, GetUserResponse, UpdateUserResponse } from '@core/api/model';
import { environment } from '@environments/environment';

interface UpdateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, SingleSelectionFieldComponent, FormField],
  templateUrl: './update-user.component.html',
})
export class UpdateUserComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);
  data: GetUserListItem = inject(DIALOG_DATA);

  userModel = signal<UpdateUserData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
  });

  userForm = form(this.userModel, (s) => {
    required(s.firstName);
    required(s.lastName);
    emailValidator(s.email);
    required(s.role);
  });

  roleList = httpQuery<GetRoleListResponse>({
    request: () => `${environment.apiUrl}/roles`,
    handleSuccess: false,
    handleError: true,
  });

  userQuery = httpQuery<GetUserResponse>({
    request: () => `${environment.apiUrl}/users/${this.data.id}`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.userModel.set({
        firstName: response.data?.firstName ?? '',
        lastName: response.data?.lastName ?? '',
        email: response.data?.email ?? '',
        phoneNumber: response.data?.phoneNumber ?? '',
        role: response.data?.role ?? '',
      });
    },
  });

  updateUserMutation = httpMutation<UpdateUserResponse>({
    request: () => this.apiService.updateUser(this.data.id, this.userModel()),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return (
      this.userForm.firstName().valid() &&
      this.userForm.lastName().valid() &&
      this.userForm.role().valid()
    );
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.updateUserMutation.trigger();
  }
}
