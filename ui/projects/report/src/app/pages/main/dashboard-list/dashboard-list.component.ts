import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@core/api/api.service';
import type { DashboardItem, GetDashboardListResponse, ListParams } from '@core/api/model';
import { environment } from '@environments/environment';
import {
  DataTable,
  Button,
  ColumnGroup,
  TableActionEvent,
  TableStateEvent,
  OverlayStore,
  httpQuery,
  httpMutation,
} from '@projects/shared-lib';

@Component({
  selector: 'app-dashboard-list',
  standalone: true,
  imports: [DataTable, Button],
  host: { class: 'flex-1 flex flex-col min-h-0' },
  template: `
    <div class="w-full sm:px-4 h-full flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-neutral-800">Dashboards</h1>
        <ui-button (click)="onCreate()" type="button">+ Create Dashboard</ui-button>
      </div>
      <div class="flex-1 min-h-0">
        <ui-data-table
          class="block h-full"
          [columnGroups]="columnGroups"
          [data]="dashboardList.value()?.data ?? []"
          [totalCount]="dashboardList.value()?.totalCount ?? 0"
          [hasError]="!!dashboardList.error()"
          (action)="onAction($event)"
          (stateChange)="onTableStateChanged($event)"
          (rowClick)="onRowClick($event)"
        />
      </div>
    </div>
  `,
})
export class DashboardListComponent {
  private api = inject(ApiService);
  private overlay = inject(OverlayStore);
  private router = inject(Router);

  private tableParams = signal<ListParams>({ pageNumber: 1, pageSize: 20 });
  private targetId = signal<string>('');

  dashboardList = httpQuery<GetDashboardListResponse>({
    request: () => ({
      url: `${environment.apiUrl}/dashboards`,
      params: this.tableParams() as Record<string, any>,
    }),
    handleError: true,
  });

  deleteMutation = httpMutation({
    request: () => this.api.deleteDashboard(this.targetId()),
    handleSuccess: true,
    onSuccess: () => this.dashboardList.refetch(),
  });

  columnGroups: ColumnGroup[] = [
    {
      title: 'Dashboards',
      children: [
        { title: 'Name', type: 'text', alignment: 'left', displayTemplate: '$name', sortKey: 'name' },
        { title: 'Description', type: 'text', alignment: 'left', displayTemplate: '$description' },
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
            threeDotMenuActions: () => [
              { label: 'View', iconPath: 'icons/application.svg', actionKey: 'view' },
              { label: 'Edit', iconPath: 'icons/edit.svg', actionKey: 'edit' },
              { label: 'Delete', iconPath: 'icons/delete.svg', actionKey: 'delete' },
            ],
          },
        },
      ],
    },
  ];

  onTableStateChanged(event: TableStateEvent) {
    this.tableParams.set({
      pageNumber: event.paginationEvent?.pageNumber ?? 1,
      pageSize: event.paginationEvent?.pageSize ?? 20,
      search: event.searchText ?? '',
      sortingDirection: event.tableSortEvent?.direction ?? 'asc',
      orderByPropertyName: event.tableSortEvent?.key ?? 'name',
    });
  }

  async onAction(event: TableActionEvent) {
    const item: DashboardItem = event.item;
    switch (event.actionKey) {
      case 'view':
        this.router.navigate(['/main/dashboards', item.id]);
        break;
      case 'edit':
        this.router.navigate(['/main/dashboards', item.id, 'edit']);
        break;
      case 'delete':
        this.overlay
          .openAlert('Delete Dashboard', `Are you sure you want to delete "${item.name}"?`)
          .then((confirmed) => {
            if (confirmed) {
              this.targetId.set(item.id);
              this.deleteMutation.trigger();
            }
          });
        break;
    }
  }

  onRowClick(item: DashboardItem) {
    this.router.navigate(['/main/dashboards', item.id]);
  }

  onCreate() {
    this.router.navigate(['/main/dashboards/create']);
  }
}

