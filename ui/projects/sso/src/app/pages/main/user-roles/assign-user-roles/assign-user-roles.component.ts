import { Component, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, httpQuery, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import {
  GetUserListItem,
  GetRbacRoleListResponse,
  RbacRoleItem,
  AssignUserRolesResponse,
  GetUserRoleListResponse,
} from '@core/api/model';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-assign-user-roles',
  standalone: true,
  imports: [BaseOverlay, Button],
  templateUrl: './assign-user-roles.component.html',
})
export class AssignUserRolesComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);
  data: GetUserListItem = inject(DIALOG_DATA);

  allRoles = signal<RbacRoleItem[]>([]);
  selectedRoleIds = signal<Set<string>>(new Set());

  roleListQuery = httpQuery<GetRbacRoleListResponse>({
    request: () => `${environment.apiUrl}/rbac/roles`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.allRoles.set(response.data);
    },
  });

  userRoleQuery = httpQuery<GetUserRoleListResponse>({
    request: () => `${environment.apiUrl}/rbac/users/${this.data.id}/roles`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.selectedRoleIds.set(new Set(response.data?.roles ?? []));
    },
  });

  assignMutation = httpMutation<AssignUserRolesResponse>({
    request: () => this.apiService.assignUserRoles(this.data.id, {
      roleIds: Array.from(this.selectedRoleIds()),
    }),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  toggleRole(roleId: string) {
    this.selectedRoleIds.update((current) => {
      const next = new Set(current);
      if (next.has(roleId)) {
        next.delete(roleId);
      } else {
        next.add(roleId);
      }
      return next;
    });
  }

  isSelected(roleId: string): boolean {
    return this.selectedRoleIds().has(roleId);
  }

  async onSubmit() {
    await this.assignMutation.trigger();
  }
}
