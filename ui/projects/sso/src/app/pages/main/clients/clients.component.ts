import { Component, inject, signal } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { GetClientListItem, GetClientListParams, GetClientListResponse } from '@core/api/model';
import {
  ColumnGroup,
  TableAction,
  TableActionEvent,
  TableStateEvent,
  DataTable,
  ContextMenuActionConfig,
  OverlayStore,
  httpQuery,
  httpMutation,
} from '@projects/shared-lib';
import { environment } from '@environments/environment';
import { CreateClientComponent } from './create-client/create-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { ClientListStore } from './clients.store';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [DataTable],
  templateUrl: './clients.component.html',
  providers: [ClientListStore],
})
export class ClientsComponent {
  store = inject(ClientListStore);
  private apiService = inject(ApiService);
  overlayService = inject(OverlayStore);
  private targetClientId = signal<string>('');

  deleteMutation = httpMutation({
    request: () => this.apiService.deleteClient(this.targetClientId()),
    handleSuccess: true,
    onSuccess: () => this.clientList.refetch(),
  });

  clientList = httpQuery<GetClientListResponse>({
    request: () => {
      const event = this.store.tableState();
      const clientTypeRaw = Array.isArray(event.columnFilters?.['clientType']?.value)
        ? event.columnFilters!['clientType'].value[0]
        : event.columnFilters?.['clientType']?.value;

      const rawParams: Record<string, any> = {
        pageNumber: event.paginationEvent?.pageNumber ?? 1,
        pageSize: event.paginationEvent?.pageSize ?? 20,
        search: event.searchText ?? '',
        sortingDirection: event.tableSortEvent?.direction ?? 'asc',
        orderByPropertyName: event.tableSortEvent?.key ?? 'name',
        nameValue: event.columnFilters?.['name']?.value || undefined,
        nameOperation: event.columnFilters?.['name']?.operation || undefined,
        clientIdValue: event.columnFilters?.['clientId']?.value || undefined,
        clientIdOperation: event.columnFilters?.['clientId']?.operation || undefined,
        clientTypeValue: clientTypeRaw || undefined,
      };

      const params = Object.fromEntries(
        Object.entries(rawParams).filter(([, v]) => v !== undefined),
      ) as GetClientListParams;

      return { url: `${environment.apiUrl}/clients`, params: params as Record<string, any> };
    },
    handleSuccess: false,
    handleError: true,
  });

  tableActions: TableAction[] = [
    {
      label: 'Create Client',
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
    this.overlayService.openModal(CreateClientComponent, {
      disableClose: true,
      onClose: () => this.clientList.refetch(),
    });
  }

  columnGroups: ColumnGroup[] = [
    {
      title: '',
      children: [
        {
          title: 'Name',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$name',
          sortKey: 'name',
          filterConfig: { type: 'text', placeholder: '' },
        },
        {
          title: 'Client ID',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$clientId',
          sortKey: 'clientId',
          filterConfig: { type: 'text', placeholder: '' },
        },
        {
          title: 'Type',
          type: 'badge',
          alignment: 'left',
          displayTemplate: '$clientType',
          sortKey: 'clientType',
          badgeConfig: {
            properties: [
              { data: 'PUBLIC', displayText: 'Public', backgroundColorClass: 'bg-blue-50', borderColorClass: 'border-blue-200', textColorClass: 'text-blue-700', indicatorColorClass: 'bg-blue-500' },
              { data: 'CONFIDENTIAL', displayText: 'Confidential', backgroundColorClass: 'bg-purple-50', borderColorClass: 'border-purple-200', textColorClass: 'text-purple-700', indicatorColorClass: 'bg-purple-500' },
            ],
          },
          filterConfig: {
            type: 'select',
            options: [
              { value: 'PUBLIC', label: 'Public' },
              { value: 'CONFIDENTIAL', label: 'Confidential' },
            ],
          },
        },
        {
          title: 'Actions',
          type: 'actions',
          alignment: 'center',
          actionsConfig: {
            threeDotMenuActions: (_item: GetClientListItem): ContextMenuActionConfig[] => [
              { label: 'Edit', iconPath: 'icons/edit.svg', actionKey: 'edit' },
              { label: 'Delete', iconPath: 'icons/delete.svg', actionKey: 'delete' },
            ],
          },
        },
      ],
    },
  ];

  onTableStateChanged(event: TableStateEvent) {
    this.store.updateFromTableState(event);
  }

  onRowClicked(_item: any) {}

  async onAction(event: TableActionEvent) {
    const item: GetClientListItem = event.item;
    switch (event.actionKey) {
      case 'edit':
        this.overlayService.openModal(UpdateClientComponent, {
          disableClose: true,
          data: item,
          onClose: () => this.clientList.refetch(),
        });
        break;
      case 'delete':
        this.overlayService
          .openAlert('Delete Client', `Are you sure you want to delete "${item.name}"? This action cannot be undone.`)
          .then((confirmed) => {
            if (confirmed) {
              this.targetClientId.set(item.id);
              this.deleteMutation.trigger();
            }
          });
        break;
    }
  }
}

