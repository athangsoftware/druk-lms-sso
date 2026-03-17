import { Component, inject } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import {
  GetPermissionGroupListResponse,
  PermissionGroupItem,
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
import { CreatePermissionGroupComponent } from './create-permission-group/create-permission-group.component';
import { UpdatePermissionGroupComponent } from './update-permission-group/update-permission-group.component';

@Component({
  selector: 'app-permission-groups',
  standalone: true,
  imports: [DataTable, Button],
  templateUrl: './permission-groups.component.html',
})
export class PermissionGroupsComponent {
  private apiService = inject(ApiService);
  overlayService = inject(OverlayStore);

  permissionGroupList = httpQuery<GetPermissionGroupListResponse>({
    request: () => ({ url: `${environment.apiUrl}/rbac/permission-groups` }),
    handleSuccess: false,
    handleError: true,
  });

  onCreate() {
    this.overlayService.openModal(CreatePermissionGroupComponent, {
      disableClose: true,
      onClose: () => this.permissionGroupList.refetch(),
    });
  }

  columnGroups: ColumnGroup[] = [
    {
      title: 'Manage Permission Groups',
      children: [
        {
          title: 'Name',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$name',
          sortKey: 'name',
        },
        {
          title: 'Description',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$description',
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
            threeDotMenuActions: (_item: PermissionGroupItem): ContextMenuActionConfig[] => [
              { label: 'Edit', iconPath: 'icons/edit.svg', actionKey: 'edit' },
            ],
          },
        },
      ],
    },
  ];

  onRowClicked(_item: any) {}

  async onAction(event: TableActionEvent) {
    const item: PermissionGroupItem = event.item;
    switch (event.actionKey) {
      case 'edit':
        this.overlayService.openModal(UpdatePermissionGroupComponent, {
          disableClose: true,
          data: item,
          onClose: () => this.permissionGroupList.refetch(),
        });
        break;
    }
  }
}
