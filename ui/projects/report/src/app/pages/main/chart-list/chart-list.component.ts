import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@core/api/api.service';
import type { ChartItem, GetChartListResponse, GetChartListParams } from '@core/api/model';
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
  selector: 'app-chart-list',
  standalone: true,
  imports: [DataTable, Button],
  host: { class: 'flex-1 flex flex-col min-h-0' },
  template: `
    <div class="w-full sm:px-4 h-full flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-neutral-800">Charts</h1>
        <ui-button (click)="onCreate()" type="button">+ Create Chart</ui-button>
      </div>
      <div class="flex-1 min-h-0">
        <ui-data-table
          class="block h-full"
          [columnGroups]="columnGroups"
          [data]="chartList.value()?.data ?? []"
          [totalCount]="chartList.value()?.totalCount ?? 0"
          [hasError]="!!chartList.error()"
          (action)="onAction($event)"
          (stateChange)="onTableStateChanged($event)"
          (rowClick)="onRowClick($event)"
        />
      </div>
    </div>
  `,
})
export class ChartListComponent {
  private api = inject(ApiService);
  private overlay = inject(OverlayStore);
  private router = inject(Router);

  private tableParams = signal<GetChartListParams>({ pageNumber: 1, pageSize: 20 });
  private targetId = signal<string>('');

  chartList = httpQuery<GetChartListResponse>({
    request: () => ({
      url: `${environment.apiUrl}/charts`,
      params: this.tableParams() as Record<string, any>,
    }),
    handleError: true,
  });

  deleteMutation = httpMutation({
    request: () => this.api.deleteChart(this.targetId()),
    handleSuccess: true,
    onSuccess: () => this.chartList.refetch(),
  });

  columnGroups: ColumnGroup[] = [
    {
      title: 'Charts',
      children: [
        { title: 'Title', type: 'text', alignment: 'left', displayTemplate: '$name', sortKey: 'name' },
        { title: 'Type', type: 'text', alignment: 'left', displayTemplate: '$chartType', sortKey: 'chartType' },
        { title: 'Connection', type: 'text', alignment: 'left', displayTemplate: '$connectionName' },
        { title: 'Created At', type: 'text', alignment: 'left', displayTemplate: '$createdAt', sortKey: 'createdAt' },
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
      orderByPropertyName: event.tableSortEvent?.key ?? 'title',
    });
  }

  async onAction(event: TableActionEvent) {
    const item: ChartItem = event.item;
    switch (event.actionKey) {
      case 'view':
        this.router.navigate(['/main/charts', item.id]);
        break;
      case 'edit':
        this.router.navigate(['/main/charts', item.id, 'edit']);
        break;
      case 'delete':
        this.overlay
          .openAlert('Delete Chart', `Are you sure you want to delete "${item.name}"?`)
          .then((confirmed) => {
            if (confirmed) {
              this.targetId.set(item.id);
              this.deleteMutation.trigger();
            }
          });
        break;
    }
  }

  onRowClick(item: ChartItem) {
    this.router.navigate(['/main/charts', item.id]);
  }

  onCreate() {
    this.router.navigate(['/main/charts/create']);
  }
}
