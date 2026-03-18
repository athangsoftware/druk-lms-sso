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

interface ClientGroup {
  clientName: string;
  clientId: string | null;
  groups: PermissionGroup[];
  allPermissions: RbacPermissionItem[];
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
  selectedClientFilter = signal('');

  clientNames = computed<{ id: string | null; name: string }[]>(() => {
    const seen = new Map<string, string | null>();
    for (const p of this.allPermissions()) {
      const name = p.clientName ?? 'Ungrouped';
      if (!seen.has(name)) seen.set(name, p.clientId);
    }
    return Array.from(seen.entries())
      .map(([name, id]) => ({ id, name }))
      .sort((a, b) => {
        if (a.name === 'Ungrouped') return 1;
        if (b.name === 'Ungrouped') return -1;
        return a.name.localeCompare(b.name);
      });
  });

  clientGroupedPermissions = computed<ClientGroup[]>(() => {
    const term = this.searchTerm().toLowerCase();
    const clientFilter = this.selectedClientFilter();
    let permissions = this.allPermissions();

    if (term) {
      permissions = permissions.filter((p) =>
        `${p.resourceName}:${p.actionName}`.toLowerCase().includes(term) ||
        (p.groupName?.toLowerCase().includes(term) ?? false) ||
        (p.clientName?.toLowerCase().includes(term) ?? false)
      );
    }

    if (clientFilter) {
      permissions = permissions.filter((p) => (p.clientId ?? '') === clientFilter);
    }

    // Group by client, then by permission group
    const clientMap = new Map<string, { clientId: string | null; groupMap: Map<string, RbacPermissionItem[]> }>();

    for (const p of permissions) {
      const clientKey = p.clientName ?? 'Ungrouped';
      if (!clientMap.has(clientKey)) {
        clientMap.set(clientKey, { clientId: p.clientId, groupMap: new Map() });
      }
      const groupKey = p.groupName ?? 'Ungrouped';
      const entry = clientMap.get(clientKey)!;
      if (!entry.groupMap.has(groupKey)) entry.groupMap.set(groupKey, []);
      entry.groupMap.get(groupKey)!.push(p);
    }

    const result: ClientGroup[] = [];
    for (const [clientName, { clientId, groupMap }] of clientMap) {
      if (clientName === 'Ungrouped') continue;
      const groups: PermissionGroup[] = [];
      const allPerms: RbacPermissionItem[] = [];
      for (const [gName, perms] of groupMap) {
        groups.push({ name: gName, permissions: perms });
        allPerms.push(...perms);
      }
      groups.sort((a, b) => a.name.localeCompare(b.name));
      result.push({ clientName, clientId, groups, allPermissions: allPerms });
    }
    result.sort((a, b) => a.clientName.localeCompare(b.clientName));

    const ungroupedClient = clientMap.get('Ungrouped');
    if (ungroupedClient) {
      const groups: PermissionGroup[] = [];
      const allPerms: RbacPermissionItem[] = [];
      for (const [gName, perms] of ungroupedClient.groupMap) {
        groups.push({ name: gName, permissions: perms });
        allPerms.push(...perms);
      }
      groups.sort((a, b) => a.name.localeCompare(b.name));
      result.push({ clientName: 'Ungrouped', clientId: null, groups, allPermissions: allPerms });
    }

    return result;
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
      this.selectedPermissionIds.set(new Set(response.data?.permissionIds ?? []));
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

  // Group-level toggles
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

  // Client-level toggles
  isClientAllSelected(clientGroup: ClientGroup): boolean {
    return clientGroup.allPermissions.every((p) => this.selectedPermissionIds().has(p.id));
  }

  isClientPartiallySelected(clientGroup: ClientGroup): boolean {
    const selected = clientGroup.allPermissions.filter((p) => this.selectedPermissionIds().has(p.id));
    return selected.length > 0 && selected.length < clientGroup.allPermissions.length;
  }

  toggleClient(clientGroup: ClientGroup) {
    const allSelected = this.isClientAllSelected(clientGroup);
    this.selectedPermissionIds.update((current) => {
      const next = new Set(current);
      for (const p of clientGroup.allPermissions) {
        if (allSelected) {
          next.delete(p.id);
        } else {
          next.add(p.id);
        }
      }
      return next;
    });
  }

  clientSelectedCount(clientGroup: ClientGroup): number {
    return clientGroup.allPermissions.filter((p) => this.selectedPermissionIds().has(p.id)).length;
  }

  // Access All (*) — wildcard permissions only
  allWildcardPermissions = computed(() => {
    return this.allPermissions().filter((p) => p.actionName === '*');
  });

  isAccessAllSelected = computed(() => {
    const wildcards = this.allWildcardPermissions();
    return wildcards.length > 0 && wildcards.every((p) => this.selectedPermissionIds().has(p.id));
  });

  isAccessAllPartial = computed(() => {
    const wildcards = this.allWildcardPermissions();
    const selected = wildcards.filter((p) => this.selectedPermissionIds().has(p.id));
    return selected.length > 0 && selected.length < wildcards.length;
  });

  toggleAccessAll() {
    const allSelected = this.isAccessAllSelected();
    const wildcards = this.allWildcardPermissions();
    this.selectedPermissionIds.update((current) => {
      const next = new Set(current);
      for (const p of wildcards) {
        if (allSelected) {
          next.delete(p.id);
        } else {
          next.add(p.id);
        }
      }
      return next;
    });
  }

  async onSubmit() {
    await this.assignMutation.trigger();
  }
}
