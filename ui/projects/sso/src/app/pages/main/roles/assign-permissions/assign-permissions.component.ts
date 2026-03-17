import { Component, computed, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, httpQuery, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import {
  RbacRoleItem,
  GetRbacPermissionListResponse,
  RbacPermissionItem,
  AssignRolePermissionsResponse,
  GetRbacRoleResponse,
} from '@core/api/model';
import { environment } from '@environments/environment';

interface PermissionGroup {
  name: string;
  permissions: RbacPermissionItem[];
}

@Component({
  selector: 'app-assign-permissions',
  standalone: true,
  imports: [BaseOverlay, Button],
  templateUrl: './assign-permissions.component.html',
})
export class AssignPermissionsComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);
  data: RbacRoleItem = inject(DIALOG_DATA);

  allPermissions = signal<RbacPermissionItem[]>([]);
  selectedPermissionIds = signal<Set<string>>(new Set());
  searchTerm = signal('');

  groupedPermissions = computed<PermissionGroup[]>(() => {
    const term = this.searchTerm().toLowerCase();
    const permissions = term
      ? this.allPermissions().filter((p) =>
          `${p.resourceName}:${p.actionName}`.toLowerCase().includes(term) ||
          (p.groupName?.toLowerCase().includes(term) ?? false)
        )
      : this.allPermissions();
    const groupMap = new Map<string, RbacPermissionItem[]>();

    for (const p of permissions) {
      const key = p.groupName ?? 'Ungrouped';
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key)!.push(p);
    }

    const groups: PermissionGroup[] = [];
    for (const [name, perms] of groupMap) {
      if (name !== 'Ungrouped') {
        groups.push({ name, permissions: perms });
      }
    }
    groups.sort((a, b) => a.name.localeCompare(b.name));

    const ungrouped = groupMap.get('Ungrouped');
    if (ungrouped?.length) {
      groups.push({ name: 'Ungrouped', permissions: ungrouped });
    }

    return groups;
  });

  permissionListQuery = httpQuery<GetRbacPermissionListResponse>({
    request: () => `${environment.apiUrl}/rbac/permissions`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.allPermissions.set(response.data);
    },
  });

  roleQuery = httpQuery<GetRbacRoleResponse>({
    request: () => `${environment.apiUrl}/rbac/roles/${this.data.id}`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.selectedPermissionIds.set(new Set(response.data?.permissions ?? []));
    },
  });

  assignMutation = httpMutation<AssignRolePermissionsResponse>({
    request: () => this.apiService.assignRolePermissions(this.data.id, {
      permissionIds: Array.from(this.selectedPermissionIds()),
    }),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  togglePermission(permissionId: string) {
    this.selectedPermissionIds.update((current) => {
      const next = new Set(current);
      if (next.has(permissionId)) {
        next.delete(permissionId);
      } else {
        next.add(permissionId);
      }
      return next;
    });
  }

  isSelected(permissionId: string): boolean {
    return this.selectedPermissionIds().has(permissionId);
  }

  isGroupAllSelected(group: PermissionGroup): boolean {
    return group.permissions.every((p) => this.selectedPermissionIds().has(p.id));
  }

  isGroupPartiallySelected(group: PermissionGroup): boolean {
    const selected = group.permissions.filter((p) => this.selectedPermissionIds().has(p.id));
    return selected.length > 0 && selected.length < group.permissions.length;
  }

  toggleGroup(group: PermissionGroup) {
    const allSelected = this.isGroupAllSelected(group);
    this.selectedPermissionIds.update((current) => {
      const next = new Set(current);
      for (const p of group.permissions) {
        if (allSelected) {
          next.delete(p.id);
        } else {
          next.add(p.id);
        }
      }
      return next;
    });
  }

  groupSelectedCount(group: PermissionGroup): number {
    return group.permissions.filter((p) => this.selectedPermissionIds().has(p.id)).length;
  }

  async onSubmit() {
    await this.assignMutation.trigger();
  }
}
