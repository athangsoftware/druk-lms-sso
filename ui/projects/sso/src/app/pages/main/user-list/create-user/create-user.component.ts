import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { email as emailValidator, form, FormField, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, SelectDropdownField, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { CreateUserResponse, UserType, UserTypeType } from '@core/api/model';
import { environment } from '@environments/environment';

interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  userType: UserTypeType;
}

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, SelectDropdownField, FormField],
  templateUrl: './create-user.component.html',
})
export class CreateUserComponent implements OnInit {
  @Input() isOrganizationUser = false;
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);

  userModel = signal<CreateUserData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    userType: UserType.InternalUser,
  });

  ngOnInit() {
    if (this.isOrganizationUser) {
      this.userModel.update((model) => ({ ...model, userType: UserType.OrganizationUser }));
    }
  }

  userForm = form(this.userModel, (s) => {
    required(s.firstName);
    required(s.lastName);
    emailValidator(s.email);
    required(s.password);
    required(s.userType);
  });

  userTypeOptions: Array<{ id: UserTypeType; name: string }> = [
    { id: UserType.InternalUser, name: 'Internal User' },
    { id: UserType.OrganizationUser, name: 'Organization User' },
  ];

  createUserMutation = httpMutation<CreateUserResponse>({
    request: () =>
      this.apiService.createUser({
        ...this.userModel(),
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
      this.userForm.userType().valid()
    );
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.createUserMutation.trigger();
  }
}
