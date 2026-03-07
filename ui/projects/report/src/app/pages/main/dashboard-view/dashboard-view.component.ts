import { Component, inject, signal, OnInit, computed, effect, untracked, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/api/api.service';
import { environment } from '@environments/environment';
import type { DashboardDetail, DashboardChartItem, GetChartListResponse } from '@core/api/model';
import { ChartRendererComponent, ChartQueryResult } from '@app/shared/chart-renderer/chart-renderer.component';
import { Button, OverlayStore, httpQuery, httpMutation } from '@projects/shared-lib';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, FormsModule, Button, ChartRendererComponent],
  template: `
    <div class="w-full p-4 flex flex-col gap-4">
      <!-- Header -->
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 class="text-xl font-semibold text-neutral-800">{{ dashboard()?.name }}</h1>
          <p *ngIf="dashboard()?.description" class="text-sm text-neutral-500">{{ dashboard()?.description }}</p>
        </div>
        <div class="flex gap-2">
          <ui-button type="button" (click)="onAddChart()">+ Add Chart</ui-button>
          <ui-button type="button" (click)="onEdit()">Edit</ui-button>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="dashboardQuery.isLoading" class="text-neutral-500 text-sm">Loading...</div>
      <div *ngIf="dashboardQuery.error()" class="text-red-600 text-sm">Failed to load dashboard.</div>

      <!-- Add chart panel -->
      <div *ngIf="showAddChart()" class="p-4 border border-neutral-200 rounded-lg bg-neutral-50 flex flex-col gap-3">
        <h2 class="font-medium text-neutral-800">Add Chart</h2>
        <select
          [(ngModel)]="selectedChartId"
          class="border border-neutral-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">Select a chart...</option>
          <option *ngFor="let c of chartList.value()?.data ?? []" [value]="c.id">{{ c.name }}</option>
        </select>
        <div class="flex gap-2">
          <ui-button type="button" (click)="confirmAddChart()" [disabled]="!selectedChartId">Add</ui-button>
          <ui-button type="button" (click)="showAddChart.set(false)">Cancel</ui-button>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div
          *ngFor="let dc of dashboard()?.dashboardCharts ?? []"
          class="bg-white border border-neutral-200 rounded-lg p-4 flex flex-col gap-2 h-80 overflow-hidden"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium text-sm text-neutral-700">{{ dc.chart?.name }}</span>
            <button
              (click)="removeChart(dc)"
              class="text-red-500 hover:text-red-700 text-xs"
            >Remove</button>
          </div>
          <div class="flex-1 min-h-0">
            <app-chart-renderer
              [chartItem]="dc.chart"
              [queryResult]="chartData()[dc.chartId] ?? null"
            />
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div *ngIf="!dashboardQuery.isLoading && !(dashboard()?.dashboardCharts?.length)" class="text-center text-neutral-500 py-12">
        No charts added yet. Click "+ Add Chart" to get started.
      </div>
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
    dashboard.dashboardCharts?.forEach((dc) => {
      if (!this.chartData()[dc.chartId]) {
        this.api.executeChartQuery(dc.chartId).subscribe({
          next: (res) => {
            this.chartData.update(data => ({ ...data, [dc.chartId]: res }));
          },
        });
      }
    });
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

