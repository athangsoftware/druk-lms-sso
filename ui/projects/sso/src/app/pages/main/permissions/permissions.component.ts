import { Component, inject } from '@angular/core';
import {
  GetRbacPermissionListResponse,
} from '@core/api/model';
import {
  ColumnGroup,
  TableAction,
  TableActionEvent,
  DataTable,
  OverlayStore,
  httpQuery,
} from '@projects/shared-lib';
import { environment } from '@environments/environment';
import { CreatePermissionComponent } from './create-permission/create-permission.component';
import { PermissionSettingsComponent } from './permission-settings/permission-settings.component';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [DataTable],
  templateUrl: './permissions.component.html',
})
export class PermissionsComponent {
  overlayService = inject(OverlayStore);

  permissionList = httpQuery<GetRbacPermissionListResponse>({
    request: () => ({ url: `${environment.apiUrl}/rbac/permissions` }),
    handleSuccess: false,
    handleError: true,
  });

  tableActions: TableAction[] = [
    {
      label: 'Configure',
      actionKey: 'configure',
      type: 'outline',
      icon: 'icons/settings.svg',
      position: 'default',
    },
    {
      label: 'Create Permission',
      actionKey: 'create',
      type: 'primary',
      icon: 'icons/plus.svg',
      position: 'default',
    },
  ];

  onTableAction(event: TableActionEvent) {
    if (event.actionKey === 'configure') {
      this.onOpenSettings();
      return;
    }

    if (event.actionKey === 'create') {
      this.onCreate();
    }
  }

  onCreate() {
    this.overlayService.openModal(CreatePermissionComponent, {
      disableClose: true,
      onClose: () => this.permissionList.refetch(),
    });
  }

  onOpenSettings() {
    this.overlayService.openBackdrop(PermissionSettingsComponent, {
      disableClose: false,
      onClose: () => this.permissionList.refetch(),
    });
  }

  columnGroups: ColumnGroup[] = [
    {
      title: '',
      children: [
        {
          title: 'Resource',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$resourceName',
          sortKey: 'resourceName',
        },
        {
          title: 'Action',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$actionName',
          sortKey: 'actionName',
        },
        {
          title: 'Client',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$clientName',
        },
        {
          title: 'Group',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$groupName',
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
      ],
    },
  ];

  onRowClicked(_item: any) {}
}
