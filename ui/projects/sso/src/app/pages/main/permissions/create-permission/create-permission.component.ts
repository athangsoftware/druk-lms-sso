import { Component, inject, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, SelectDropdownField, httpMutation, httpQuery } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import {
  CreateRbacPermissionResponse,
  GetRbacResourceListResponse,
  GetRbacActionListResponse,
  GetPermissionGroupListResponse,
  RbacResourceItem,
  RbacActionItem,
  PermissionGroupItem,
} from '@core/api/model';
import { environment } from '@environments/environment';

interface CreatePermissionData {
  resourceId: string;
  actionId: string;
  groupId: string;
}

@Component({
  selector: 'app-create-permission',
  standalone: true,
  imports: [BaseOverlay, Button, SelectDropdownField],
  templateUrl: './create-permission.component.html',
})
export class CreatePermissionComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);

  permissionModel = signal<CreatePermissionData>({
    resourceId: '',
    actionId: '',
    groupId: '',
  });

  permissionForm = form(this.permissionModel, (s) => {
    required(s.resourceId);
    required(s.actionId);
  });

  resourceOptions: { id: string; name: string }[] = [];
  actionOptions: { id: string; name: string }[] = [];
  groupOptions: { id: string; name: string }[] = [];

  resourceListQuery = httpQuery<GetRbacResourceListResponse>({
    request: () => `${environment.apiUrl}/rbac/resources`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      setTimeout(() => {
        this.resourceOptions = response.data.map((r: RbacResourceItem) => ({ id: r.id, name: r.name }));
      });
    },
  });

  actionListQuery = httpQuery<GetRbacActionListResponse>({
    request: () => `${environment.apiUrl}/rbac/actions`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      setTimeout(() => {
        this.actionOptions = response.data.map((a: RbacActionItem) => ({ id: a.id, name: a.name }));
      });
    },
  });

  groupListQuery = httpQuery<GetPermissionGroupListResponse>({
    request: () => `${environment.apiUrl}/rbac/permission-groups`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      setTimeout(() => {
        this.groupOptions = response.data.map((g: PermissionGroupItem) => ({ id: g.id, name: g.name }));
      });
    },
  });

  createPermissionMutation = httpMutation<CreateRbacPermissionResponse>({
    request: () => this.apiService.createRbacPermission({
      resourceId: this.permissionModel().resourceId,
      actionId: this.permissionModel().actionId,
      groupId: this.permissionModel().groupId || undefined,
    }),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return (
      this.permissionForm.resourceId().valid() &&
      this.permissionForm.actionId().valid()
    );
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.createPermissionMutation.trigger();
  }
}
