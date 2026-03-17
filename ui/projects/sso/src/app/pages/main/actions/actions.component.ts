import { Component, inject } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import {
  GetRbacActionListResponse,
  RbacActionItem,
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
import { CreateActionComponent } from './create-action/create-action.component';
import { UpdateActionComponent } from './update-action/update-action.component';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [DataTable, Button],
  templateUrl: './actions.component.html',
})
export class ActionsComponent {
  private apiService = inject(ApiService);
  overlayService = inject(OverlayStore);

  actionList = httpQuery<GetRbacActionListResponse>({
    request: () => ({ url: `${environment.apiUrl}/rbac/actions` }),
    handleSuccess: false,
    handleError: true,
  });

  onCreate() {
    this.overlayService.openModal(CreateActionComponent, {
      disableClose: true,
      onClose: () => this.actionList.refetch(),
    });
  }

  columnGroups: ColumnGroup[] = [
    {
      title: 'Manage Actions',
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
            threeDotMenuActions: (_item: RbacActionItem): ContextMenuActionConfig[] => [
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
    const item: RbacActionItem = event.item;
    switch (event.actionKey) {
      case 'edit':
        this.overlayService.openModal(UpdateActionComponent, {
          disableClose: true,
          data: item,
          onClose: () => this.actionList.refetch(),
        });
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete action "${item.name}"?`)) {
          this.apiService.deleteRbacAction(item.id).subscribe({
            next: () => this.actionList.refetch(),
          });
        }
        break;
    }
  }
}
