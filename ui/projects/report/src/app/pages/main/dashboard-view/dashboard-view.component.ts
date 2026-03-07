import { Component, inject, signal, OnInit, computed, effect, untracked, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/api/api.service';
import { environment } from '@environments/environment';
import type { DashboardDetail, DashboardChartItem, ChartItem, GetChartListResponse } from '@core/api/model';
import { ChartRendererComponent, ChartQueryResult } from '@app/shared/chart-renderer/chart-renderer.component';
import { Button, OverlayStore, httpQuery, httpMutation } from '@projects/shared-lib';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, Button, ChartRendererComponent],
  template: `
    <div class="w-full p-4 flex flex-col gap-4">
      <!-- Header -->
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 class="text-xl font-semibold text-neutral-800">{{ dashboard()?.name }}</h1>
          @if (dashboard()?.description) {
            <p class="text-sm text-neutral-500">{{ dashboard()?.description }}</p>
          }
        </div>
        <div class="flex gap-2">
          <ui-button type="button" (click)="onAddChart()">+ Add Chart</ui-button>
          <ui-button type="button" (click)="onEdit()">Edit</ui-button>
        </div>
      </div>

      <!-- Loading -->
      @if (dashboardQuery.isLoading()) {
        <div class="text-neutral-500 text-sm">Loading...</div>
      }
      @if (dashboardQuery.error()) {
        <div class="text-red-600 text-sm">Failed to load dashboard.</div>
      }

      <!-- Add chart panel -->
      @if (showAddChart()) {
        <div class="p-4 border border-neutral-200 rounded-lg bg-neutral-50 flex flex-col gap-3">
          <h2 class="font-medium text-neutral-800">Add Chart</h2>
          <select
            [(ngModel)]="selectedChartId"
            class="border border-neutral-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select a chart...</option>
            @for (c of availableCharts(); track c.id) {
              <option [value]="c.id">{{ c.name }}</option>
            }
          </select>
          <div class="flex gap-2">
            <ui-button type="button" (click)="confirmAddChart()" [disabled]="!selectedChartId">Add</ui-button>
            <ui-button type="button" (click)="showAddChart.set(false)">Cancel</ui-button>
          </div>
        </div>
      }

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        @for (dc of dashboard()?.charts ?? []; track dc.chartId) {
          <div class="bg-white border border-neutral-200 rounded-lg p-4 flex flex-col gap-2 h-80 overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="font-medium text-sm text-neutral-700">{{ dc.chartName }}</span>
              <button
                (click)="removeChart(dc)"
                class="text-red-500 hover:text-red-700 text-xs"
              >Remove</button>
            </div>
            <div class="flex-1 min-h-0">
              <app-chart-renderer
                [chartItem]="toChartItem(dc)"
                [queryResult]="chartData()[dc.chartId] ?? null"
              />
            </div>
          </div>
        }
      </div>

      <!-- Empty state -->
      @if (!dashboardQuery.isLoading() && !(dashboard()?.charts?.length)) {
        <div class="text-center text-neutral-500 py-12">
          No charts added yet. Click "+ Add Chart" to get started.
        </div>
      }
    </div>
  `,
})
export class DashboardViewComponent implements OnInit {
  private api = inject(ApiService);
  private overlay = inject(OverlayStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  dashboardId = signal<string>('');
  chartData = signal<Record<string, ChartQueryResult>>({});
  showAddChart = signal(false);
  selectedChartId = '';
  private removeTargetChartId = signal<string>('');

  dashboardQuery = httpQuery({
    request: () => {
      const id = this.dashboardId();
      if (!id) return undefined;
      return `${environment.apiUrl}/dashboards/${id}`;
    },
    handleError: true,
  });

  chartList = httpQuery<GetChartListResponse>({
    request: () => ({
      url: `${environment.apiUrl}/charts`,
      params: { pageNumber: 1, pageSize: 100 },
    }),
    handleError: true,
  });

  dashboard = computed(() => (this.dashboardQuery.value() as any)?.data as DashboardDetail ?? null);

  availableCharts = computed(() => {
    const existing = new Set((this.dashboard()?.charts ?? []).map(dc => dc.chartId));
    return (this.chartList.value()?.data ?? []).filter(c => !existing.has(c.id));
  });

  addChartMutation = httpMutation({
    request: () =>
      this.api.addChartToDashboard(this.dashboardId(), { chartId: this.selectedChartId }),
    handleSuccess: true,
    onSuccess: () => {
      this.showAddChart.set(false);
      this.selectedChartId = '';
      this.dashboardQuery.refetch();
    },
  });

  removeChartMutation = httpMutation({
    request: () =>
      this.api.removeChartFromDashboard(this.dashboardId(), this.removeTargetChartId()),
    handleSuccess: true,
    onSuccess: () => this.dashboardQuery.refetch(),
  });

  constructor() {
    effect(() => {
      const d = this.dashboard();
      if (d) {
        untracked(() => this.loadChartData(d));
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.dashboardId.set(id);
  }

  private loadChartData(dashboard: DashboardDetail) {
    dashboard.charts?.forEach((dc) => {
      if (!this.chartData()[dc.chartId]) {
        this.api.executeChartQuery(dc.chartId).subscribe({
          next: (res) => {
            this.chartData.update(data => ({ ...data, [dc.chartId]: res }));
          },
        });
      }
    });
  }

  toChartItem(dc: DashboardChartItem): ChartItem {
    return {
      id: dc.chartId,
      name: dc.chartName,
      chartType: dc.chartType,
      chartConfig: dc.chartConfig,
      sqlQuery: dc.sqlQuery,
      connectionId: dc.connectionId,
      connectionName: dc.connectionName,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    };
  }

  onAddChart() {
    this.showAddChart.set(true);
  }

  confirmAddChart() {
    if (this.selectedChartId) {
      this.addChartMutation.trigger();
    }
  }

  removeChart(dc: DashboardChartItem) {
    this.overlay.openAlert('Remove Chart', 'Remove this chart from the dashboard?').then((ok) => {
      if (ok) {
        this.removeTargetChartId.set(dc.chartId);
        this.removeChartMutation.trigger();
      }
    });
  }

  onEdit() {
    this.router.navigate(['/main/dashboards', this.dashboardId(), 'edit']);
  }
}

