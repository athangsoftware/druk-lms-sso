import { Component, inject, signal, OnInit, effect, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/api/api.service';
import { environment } from '@environments/environment';
import type { ChartItem } from '@core/api/model';
import { ChartRendererComponent, ChartQueryResult } from '@app/shared/chart-renderer/chart-renderer.component';
import { Button, httpQuery, httpMutation } from '@projects/shared-lib';

@Component({
  selector: 'app-chart-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, Button, ChartRendererComponent],
  template: `
    <div class="w-full p-6 flex flex-col gap-4">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 class="text-xl font-semibold text-neutral-800">{{ chart?.name }}</h1>
          @if (chart?.description) {
            <p class="text-sm text-neutral-500">{{ chart?.description }}</p>
          }
        </div>
        <div class="flex gap-2">
          <ui-button type="button" (click)="reload()">Refresh</ui-button>
          <ui-button type="button" (click)="onEdit()">Edit</ui-button>
        </div>
      </div>

      @if (chartQuery.isLoading()) {
        <div class="text-neutral-500 text-sm">Loading chart...</div>
      }
      @if (chartQuery.error()) {
        <div class="text-red-600 text-sm">Failed to load chart.</div>
      }

      <!-- AI modify inline -->
      <div class="flex gap-2 items-center">
        <input
          [(ngModel)]="aiPrompt"
          type="text"
          placeholder="Modify with AI... (e.g. 'make it a pie chart')"
          class="flex-1 border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ui-button
          type="button"
          (click)="onAiModify()"
          [disabled]="!aiPrompt.trim() || modifyMutation.isLoading()"
        >
          {{ modifyMutation.isLoading() ? '...' : 'Modify' }}
        </ui-button>
      </div>

      <!-- Chart preview -->
      @if (chart) {
        <div class="h-96 border border-neutral-200 rounded-lg p-4 overflow-hidden">
          <app-chart-renderer
            [chartItem]="chart"
            [queryResult]="queryResult"
          />
        </div>
      }

      <!-- SQL preview -->
      @if (chart) {
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-neutral-500 uppercase tracking-wide">SQL Query</label>
          <pre class="bg-neutral-100 rounded p-3 text-xs overflow-auto max-h-40 text-neutral-700">{{ chart.sqlQuery }}</pre>
        </div>
      }
    </div>
  `,
})
export class ChartViewComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  chartId = signal<string>('');
  chart: ChartItem | null = null;
  queryResult: ChartQueryResult | null = null;
  aiPrompt = '';

  constructor() {
    effect(() => {
      const res = this.chartQuery.value() as any;
      if (res?.data) {
        this.chart = res.data as ChartItem;
        this.loadQueryData();
      }
    });
  }

  chartQuery = httpQuery({
    request: () => {
      const id = this.chartId();
      if (!id) return undefined;
      return `${environment.apiUrl}/charts/${id}`;
    },
    handleError: true,
  });

  modifyMutation = httpMutation({
    request: () =>
      this.api.aiModifyChart(this.chartId(), { prompt: this.aiPrompt }),
    handleSuccess: true,
    onSuccess: (res: any) => {
      this.chart = res.data;
      this.aiPrompt = '';
      this.loadQueryData();
    },
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.chartId.set(id);
  }

  private loadQueryData() {
    if (!this.chart) return;
    this.api.executeChartQuery(this.chart.id).subscribe({
      next: (res) => {
        this.queryResult = res;
        this.cdr.markForCheck();
      },
    });
  }

  reload() {
    this.chartQuery.refetch();
  }

  onAiModify() {
    if (this.aiPrompt.trim()) {
      this.modifyMutation.trigger();
    }
  }

  onEdit() {
    this.router.navigate(['/main/charts', this.chartId(), 'edit']);
  }
}
