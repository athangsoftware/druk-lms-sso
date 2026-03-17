import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, SingleSelectionFieldComponent, httpQuery, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { RbacRoleItem, GetRbacRoleResponse, UpdateRbacRoleResponse, GetRbacRoleListResponse } from '@core/api/model';
import { environment } from '@environments/environment';

interface UpdateRoleData {
  name: string;
  parentRoleId: string;
  isActive: boolean;
}

@Component({
  selector: 'app-update-role',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, SingleSelectionFieldComponent, FormField],
  templateUrl: './update-role.component.html',
})
export class UpdateRoleComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);
  data: RbacRoleItem = inject(DIALOG_DATA);

  roleModel = signal<UpdateRoleData>({
    name: '',
    parentRoleId: '',
    isActive: true,
  });

  roleForm = form(this.roleModel, (s) => {
    required(s.name);
  });

  parentRoleOptions: { id: string; name: string }[] = [];

  statusOptions = [
    { id: 'true', name: 'Active' },
    { id: 'false', name: 'Inactive' },
  ];

  roleListQuery = httpQuery<GetRbacRoleListResponse>({
    request: () => `${environment.apiUrl}/rbac/roles`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.parentRoleOptions = response.data
        .filter((r: RbacRoleItem) => r.id !== this.data.id)
        .map((r: RbacRoleItem) => ({ id: r.id, name: r.name }));
    },
  });

  roleQuery = httpQuery<GetRbacRoleResponse>({
    request: () => `${environment.apiUrl}/rbac/roles/${this.data.id}`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.roleModel.set({
        name: response.data?.name ?? '',
        parentRoleId: response.data?.parentRoleId ?? '',
        isActive: response.data?.isActive ?? true,
      });
    },
  });

  updateRoleMutation = httpMutation<UpdateRbacRoleResponse>({
    request: () => this.apiService.updateRbacRole(this.data.id, {
      name: this.roleModel().name,
      parentRoleId: this.roleModel().parentRoleId || undefined,
      isActive: this.roleModel().isActive,
    }),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return this.roleForm.name().valid();
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.updateRoleMutation.trigger();
  }
}
