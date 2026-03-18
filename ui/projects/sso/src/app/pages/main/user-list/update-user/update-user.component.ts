import { Component, inject, signal } from '@angular/core';
import { email as emailValidator, form, FormField, required } from '@angular/forms/signals';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, SingleSelectionFieldComponent, httpMutation, httpQuery } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { GetUserListItem, GetUserResponse, UpdateUserResponse, UserType, UserTypeType } from '@core/api/model';
import { environment } from '@environments/environment';

interface UpdateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: UserTypeType;
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
    userType: UserType.InternalUser,
  });

  userForm = form(this.userModel, (s) => {
    required(s.firstName);
    required(s.lastName);
    emailValidator(s.email);
    required(s.userType);
  });

  userTypeOptions: Array<{ id: UserTypeType; name: string }> = [
    { id: UserType.InternalUser, name: 'Internal User' },
    { id: UserType.OrganizationUser, name: 'Organization User' },
  ];

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
        userType: (response.data?.userType as UserTypeType) ?? UserType.InternalUser,
      });
    },
  });

  updateUserMutation = httpMutation<UpdateUserResponse>({
    request: () => this.apiService.updateUser(this.data.id, this.userModel()),
    handleSuccess: true,
    onSuccess: (response: UpdateUserResponse) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return (
      this.userForm.firstName().valid() &&
      this.userForm.lastName().valid() &&
      this.userForm.userType().valid()
    );
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.updateUserMutation.trigger();
  }
}
