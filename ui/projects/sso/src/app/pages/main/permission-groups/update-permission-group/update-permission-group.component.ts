import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, httpQuery, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { PermissionGroupItem, GetPermissionGroupResponse, UpdatePermissionGroupResponse } from '@core/api/model';
import { environment } from '@environments/environment';

interface UpdatePermissionGroupData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-update-permission-group',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, FormField],
  templateUrl: './update-permission-group.component.html',
})
export class UpdatePermissionGroupComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);
  data: PermissionGroupItem = inject(DIALOG_DATA);

  groupModel = signal<UpdatePermissionGroupData>({
    name: '',
    description: '',
  });

  groupForm = form(this.groupModel, (s) => {
    required(s.name);
  });

  groupQuery = httpQuery<GetPermissionGroupResponse>({
    request: () => `${environment.apiUrl}/rbac/permission-groups/${this.data.id}`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.groupModel.set({
        name: response.data?.name ?? '',
        description: response.data?.description ?? '',
      });
    },
  });

  updateGroupMutation = httpMutation<UpdatePermissionGroupResponse>({
    request: () => this.apiService.updatePermissionGroup(this.data.id, {
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
    await this.updateGroupMutation.trigger();
  }
}
