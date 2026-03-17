import { Component, inject } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import {
  GetRbacPermissionListResponse,
  RbacPermissionItem,
} from '@core/api/model';
import {
  ColumnGroup,
  DataTable,
  OverlayStore,
  Button,
  httpQuery,
} from '@projects/shared-lib';
import { environment } from '@environments/environment';
import { CreatePermissionComponent } from './create-permission/create-permission.component';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [DataTable, Button],
  templateUrl: './permissions.component.html',
})
export class PermissionsComponent {
  private apiService = inject(ApiService);
  overlayService = inject(OverlayStore);

  permissionList = httpQuery<GetRbacPermissionListResponse>({
    request: () => ({ url: `${environment.apiUrl}/rbac/permissions` }),
    handleSuccess: false,
    handleError: true,
  });

  onCreate() {
    this.overlayService.openModal(CreatePermissionComponent, {
      disableClose: true,
      onClose: () => this.permissionList.refetch(),
    });
  }

  columnGroups: ColumnGroup[] = [
    {
      title: 'Manage Permissions',
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
