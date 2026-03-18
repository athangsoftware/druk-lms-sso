import { Component, inject, signal } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import {
  GetRbacRoleListResponse,
  RbacRoleItem,
} from '@core/api/model';
import {
  ColumnGroup,
  TableActionEvent,
  DataTable,
  ContextMenuActionConfig,
  OverlayStore,
  Button,
  httpQuery,
} from '@projects/shared-lib';
import { environment } from '@environments/environment';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { AssignPermissionsComponent } from './assign-permissions/assign-permissions.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [DataTable, Button],
  templateUrl: './roles.component.html',
})
export class RolesComponent {
  private apiService = inject(ApiService);
  overlayService = inject(OverlayStore);

  roleList = httpQuery<GetRbacRoleListResponse>({
    request: () => ({ url: `${environment.apiUrl}/rbac/roles` }),
    handleSuccess: false,
    handleError: true,
  });

  onCreate() {
    this.overlayService.openModal(CreateRoleComponent, {
      disableClose: true,
      onClose: () => this.roleList.refetch(),
    });
  }

  columnGroups: ColumnGroup[] = [
    {
      title: 'Manage RBAC Roles',
      children: [
        {
          title: 'Name',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$name',
          sortKey: 'name',
        },
        {
          title: 'Parent Role',
          type: 'text',
          alignment: 'left',
          key: 'parentRoleName',
          formatter: (value) => value ?? '-',
        },
        {
          title: 'Status',
          type: 'badge',
          alignment: 'left',
          displayTemplate: '$isActive',
          badgeConfig: {
            properties: [
              { data: 'true', displayText: 'Active', backgroundColorClass: 'bg-green-50', borderColorClass: 'border-green-200', textColorClass: 'text-green-700', indicatorColorClass: 'bg-green-500' },
              { data: 'false', displayText: 'Inactive', backgroundColorClass: 'bg-red-50', borderColorClass: 'border-red-200', textColorClass: 'text-red-700', indicatorColorClass: 'bg-red-500' },
            ],
          },
        },
        {
          title: 'Permissions',
          type: 'text',
          alignment: 'center',
          displayTemplate: '$permissions.length',
        },
        {
          title: 'Actions',
          type: 'actions',
          alignment: 'center',
          actionsConfig: {
            threeDotMenuActions: (_item: RbacRoleItem): ContextMenuActionConfig[] => [
              { label: 'Edit', iconPath: 'icons/edit.svg', actionKey: 'edit' },
              { label: 'Assign Permissions', iconPath: 'icons/edit.svg', actionKey: 'assign-permissions' },
            ],
          },
        },
      ],
    },
  ];

  onRowClicked(_item: any) {}

  async onAction(event: TableActionEvent) {
    const item: RbacRoleItem = event.item;
    switch (event.actionKey) {
      case 'edit':
        this.overlayService.openModal(UpdateRoleComponent, {
          disableClose: true,
          data: item,
          onClose: () => this.roleList.refetch(),
        });
        break;
      case 'assign-permissions':
        this.overlayService.openModal(AssignPermissionsComponent, {
          disableClose: true,
          data: item,
          onClose: () => this.roleList.refetch(),
        });
        break;
    }
  }
}
