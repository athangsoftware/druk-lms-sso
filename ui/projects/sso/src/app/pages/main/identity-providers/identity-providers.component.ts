import { Component, inject, signal } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import {
  GetIdentityProviderListItem,
  GetIdentityProviderListParams,
  GetIdentityProviderListResponse,
  ToggleIdentityProviderResponse,
} from '@core/api/model';
import {
  ColumnGroup,
  TableActionEvent,
  TableStateEvent,
  DataTable,
  ContextMenuActionConfig,
  OverlayStore,
  Button,
  httpQuery,
  httpMutation,
} from '@projects/shared-lib';
import { environment } from '@environments/environment';
import { CreateIdentityProviderComponent } from './create-identity-provider/create-identity-provider.component';
import { UpdateIdentityProviderComponent } from './update-identity-provider/update-identity-provider.component';
import { IdentityProviderListStore } from './identity-providers.store';

@Component({
  selector: 'app-identity-providers',
  standalone: true,
  imports: [DataTable, Button],
  templateUrl: './identity-providers.component.html',
  providers: [IdentityProviderListStore],
})
export class IdentityProvidersComponent {
  store = inject(IdentityProviderListStore);
  private apiService = inject(ApiService);
  overlayService = inject(OverlayStore);
  private targetId = signal<string>('');

  deleteMutation = httpMutation({
    request: () => this.apiService.deleteIdentityProvider(this.targetId()),
    handleSuccess: true,
    onSuccess: () => this.providerList.refetch(),
  });

  toggleMutation = httpMutation<ToggleIdentityProviderResponse>({
    request: () => this.apiService.toggleIdentityProvider(this.targetId()),
    handleSuccess: true,
    onSuccess: () => this.providerList.refetch(),
  });

  providerList = httpQuery<GetIdentityProviderListResponse>({
    request: () => {
      const event = this.store.tableState();

      const typeRaw = Array.isArray(event.columnFilters?.['type']?.value)
        ? event.columnFilters!['type'].value[0]
        : event.columnFilters?.['type']?.value;

      const isEnabledRaw = Array.isArray(event.columnFilters?.['isEnabled']?.value)
        ? event.columnFilters!['isEnabled'].value[0]
        : event.columnFilters?.['isEnabled']?.value;

      const rawParams: Record<string, any> = {
        pageNumber: event.paginationEvent?.pageNumber ?? 1,
        pageSize: event.paginationEvent?.pageSize ?? 20,
        search: event.searchText ?? '',
        sortingDirection: event.tableSortEvent?.direction ?? 'asc',
        orderByPropertyName: event.tableSortEvent?.key ?? 'displayOrder',
        nameValue: event.columnFilters?.['name']?.value || undefined,
        nameOperation: event.columnFilters?.['name']?.operation || undefined,
        slugValue: event.columnFilters?.['slug']?.value || undefined,
        slugOperation: event.columnFilters?.['slug']?.operation || undefined,
        typeValue: typeRaw || undefined,
        isEnabledValue: isEnabledRaw || undefined,
      };

      const params = Object.fromEntries(
        Object.entries(rawParams).filter(([, v]) => v !== undefined),
      ) as GetIdentityProviderListParams;

      return { url: `${environment.apiUrl}/identity-providers`, params: params as Record<string, any> };
    },
    handleSuccess: false,
    handleError: true,
  });

  onCreate() {
    this.overlayService.openModal(CreateIdentityProviderComponent, {
      disableClose: true,
      onClose: () => this.providerList.refetch(),
    });
  }

  columnGroups: ColumnGroup[] = [
    {
      title: 'Manage External Identity Providers',
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
          title: 'Slug',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$slug',
          sortKey: 'slug',
          filterConfig: { type: 'text', placeholder: '' },
        },
        {
          title: 'Type',
          type: 'badge',
          alignment: 'left',
          displayTemplate: '$type',
          sortKey: 'type',
          badgeConfig: {
            properties: [
              { data: 'OIDC', displayText: 'OIDC', backgroundColorClass: 'bg-blue-50', borderColorClass: 'border-blue-200', textColorClass: 'text-blue-700', indicatorColorClass: 'bg-blue-500' },
              { data: 'CUSTOM', displayText: 'Custom', backgroundColorClass: 'bg-purple-50', borderColorClass: 'border-purple-200', textColorClass: 'text-purple-700', indicatorColorClass: 'bg-purple-500' },
            ],
          },
          filterConfig: {
            type: 'select',
            options: [
              { value: 'OIDC', label: 'OIDC' },
              { value: 'CUSTOM', label: 'Custom' },
            ],
          },
        },
        {
          title: 'Enabled',
          type: 'badge',
          alignment: 'center',
          displayTemplate: '$isEnabled',
          badgeConfig: {
            properties: [
              { data: 'true', displayText: 'Enabled', backgroundColorClass: 'bg-green-50', borderColorClass: 'border-green-200', textColorClass: 'text-green-700', indicatorColorClass: 'bg-green-500' },
              { data: 'false', displayText: 'Disabled', backgroundColorClass: 'bg-red-50', borderColorClass: 'border-red-200', textColorClass: 'text-red-700', indicatorColorClass: 'bg-red-500' },
            ],
          },
          filterConfig: {
            type: 'select',
            options: [
              { value: 'true', label: 'Enabled' },
              { value: 'false', label: 'Disabled' },
            ],
          },
        },
        {
          title: 'Actions',
          type: 'actions',
          alignment: 'center',
          actionsConfig: {
            threeDotMenuActions: (item: GetIdentityProviderListItem): ContextMenuActionConfig[] => [
              { label: item.isEnabled ? 'Disable' : 'Enable', iconPath: item.isEnabled ? 'icons/delete.svg' : 'icons/edit.svg', actionKey: 'toggle' },
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
    const item: GetIdentityProviderListItem = event.item;
    switch (event.actionKey) {
      case 'edit':
        this.overlayService.openModal(UpdateIdentityProviderComponent, {
          disableClose: true,
          data: item,
          onClose: () => this.providerList.refetch(),
        });
        break;
      case 'toggle':
        this.targetId.set(item.id);
        this.toggleMutation.trigger();
        break;
      case 'delete':
        this.overlayService
          .openAlert('Delete Identity Provider', `Are you sure you want to delete "${item.name}"? This action cannot be undone.`)
          .then((confirmed) => {
            if (confirmed) {
              this.targetId.set(item.id);
              this.deleteMutation.trigger();
            }
          });
        break;
    }
  }
}
