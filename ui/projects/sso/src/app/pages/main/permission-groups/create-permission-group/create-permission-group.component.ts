import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { CreatePermissionGroupResponse } from '@core/api/model';

interface CreatePermissionGroupData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-create-permission-group',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, FormField],
  templateUrl: './create-permission-group.component.html',
})
export class CreatePermissionGroupComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);

  groupModel = signal<CreatePermissionGroupData>({
    name: '',
    description: '',
  });

  groupForm = form(this.groupModel, (s) => {
    required(s.name);
  });

  createGroupMutation = httpMutation<CreatePermissionGroupResponse>({
    request: () => this.apiService.createPermissionGroup({
      name: this.groupModel().name,
      description: this.groupModel().description || undefined,
    }),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return this.groupForm.name().valid();
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.createGroupMutation.trigger();
  }
}
