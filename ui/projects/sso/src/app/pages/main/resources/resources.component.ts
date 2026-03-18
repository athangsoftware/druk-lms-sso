import { Component, inject, signal } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import {
  GetRbacResourceListResponse,
  RbacResourceItem,
} from '@core/api/model';
import {
  ColumnGroup,
  TableAction,
  TableActionEvent,
  DataTable,
  ContextMenuActionConfig,
  OverlayStore,
  httpQuery,
  httpMutation,
} from '@projects/shared-lib';
import { environment } from '@environments/environment';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { UpdateResourceComponent } from './update-resource/update-resource.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [DataTable],
  templateUrl: './resources.component.html',
})
export class ResourcesComponent {
  private apiService = inject(ApiService);
  overlayService = inject(OverlayStore);
  private targetResourceId = signal<string>('');

  resourceList = httpQuery<GetRbacResourceListResponse>({
    request: () => ({ url: `${environment.apiUrl}/rbac/resources` }),
    handleSuccess: false,
    handleError: true,
  });

  deleteMutation = httpMutation({
    request: () => this.apiService.deleteRbacResource(this.targetResourceId()),
    handleSuccess: true,
    onSuccess: () => this.resourceList.refetch(),
  });

  tableActions: TableAction[] = [
    {
      label: 'Create Resource',
      actionKey: 'create',
      type: 'primary',
      icon: 'icons/plus.svg',
      position: 'default',
    },
  ];

  onTableAction(event: TableActionEvent) {
    if (event.actionKey === 'create') {
      this.onCreate();
    }
  }

  onCreate() {
    this.overlayService.openModal(CreateResourceComponent, {
      disableClose: true,
      onClose: () => this.resourceList.refetch(),
    });
  }

  columnGroups: ColumnGroup[] = [
    {
      title: 'Manage Resources',
      children: [
        {
          title: 'Name',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$name',
          sortKey: 'name',
        },
        {
          title: 'Created At',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$createdAt',
          sortKey: 'createdAt',
        },
        {
          title: 'Actions',
          type: 'actions',
          alignment: 'center',
          actionsConfig: {
            threeDotMenuActions: (_item: RbacResourceItem): ContextMenuActionConfig[] => [
              { label: 'Edit', iconPath: 'icons/edit.svg', actionKey: 'edit' },
              { label: 'Delete', iconPath: 'icons/delete.svg', actionKey: 'delete' },
            ],
          },
        },
      ],
    },
  ];

  onRowClicked(_item: any) {}

  async onAction(event: TableActionEvent) {
    const item: RbacResourceItem = event.item;
    switch (event.actionKey) {
      case 'edit':
        this.overlayService.openModal(UpdateResourceComponent, {
          disableClose: true,
          data: item,
          onClose: () => this.resourceList.refetch(),
        });
        break;
      case 'delete':
        this.overlayService
          .openAlert('Delete Resource', `Are you sure you want to delete "${item.name}"? This action cannot be undone.`)
          .then((confirmed) => {
            if (confirmed) {
              this.targetResourceId.set(item.id);
              this.deleteMutation.trigger();
            }
          });
        break;
    }
  }
}
