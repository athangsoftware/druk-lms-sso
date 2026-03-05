import { Component, inject, signal } from '@angular/core';
import { email as emailValidator, form, FormField, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, SingleSelectionFieldComponent, httpQuery, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { CreateUserResponse, GetRoleListResponse, UserRoleType } from '@core/api/model';
import { environment } from '@environments/environment';

interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, SingleSelectionFieldComponent, FormField],
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);

  userModel = signal<CreateUserData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
  });

  userForm = form(this.userModel, (s) => {
    required(s.firstName);
    required(s.lastName);
    emailValidator(s.email);
    required(s.password);
    required(s.role);
  });

  roleList = httpQuery<GetRoleListResponse>({
    request: () => `${environment.apiUrl}/roles`,
    handleSuccess: false,
    handleError: true,
  });

  createUserMutation = httpMutation<CreateUserResponse>({
    request: () => this.apiService.createUser({
      ...this.userModel(),
      role: this.userModel().role as UserRoleType,
    }),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return (
      this.userForm.firstName().valid() &&
      this.userForm.lastName().valid() &&
      this.userForm.password().valid() &&
      this.userForm.role().valid()
    );
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.createUserMutation.trigger();
  }
}
