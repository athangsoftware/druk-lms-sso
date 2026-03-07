import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { NgIf, NgFor, NgClass, KeyValuePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import type { ChartType, ChartItem } from '@core/api/model';

Chart.register(...registerables);

export interface ChartQueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
}

@Component({
  selector: 'app-chart-renderer',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, KeyValuePipe],
  template: `
    <div class="w-full h-full flex flex-col">
      <ng-container *ngIf="chartType === 'TABLE'; else canvasChart">
        <div class="overflow-auto h-full">
          <table class="min-w-full text-sm border-collapse">
            <thead class="bg-neutral-100 sticky top-0">
              <tr>
                <th
                  *ngFor="let col of queryResult?.columns"
                  class="px-3 py-2 text-left font-medium text-neutral-700 border-b border-neutral-200"
                >{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of queryResult?.rows; let i = index"
                  [class]="i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'">
                <td
                  *ngFor="let col of queryResult?.columns"
                  class="px-3 py-2 text-neutral-700 border-b border-neutral-100"
                >{{ row[col] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>
      <ng-template #canvasChart>
        <canvas #chartCanvas class="w-full h-full"></canvas>
      </ng-template>
    </div>
  `,
})
export class ChartRendererComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() chartItem!: ChartItem;
  @Input() queryResult: ChartQueryResult | null = null;
  @ViewChild('chartCanvas') chartCanvas?: ElementRef<HTMLCanvasElement>;

  protected chartType: ChartType = 'BAR';
  private chartInstance: Chart | null = null;
  private viewInitialized = false;

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.viewInitialized && (changes['chartItem'] || changes['queryResult'])) {
      this.renderChart();
    }
  }

  ngOnDestroy() {
    this.destroyChart();
  }

  private renderChart() {
    if (!this.chartItem) return;
    this.chartType = this.chartItem.chartType;

    if (this.chartType === 'TABLE') {
      this.destroyChart();
      return;
    }

    if (!this.chartCanvas) return;
    this.destroyChart();

    const config = this.chartItem.chartConfig as any;
    const data = this.buildChartData(config);
    if (!data) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const chartJsType = this.mapChartType(this.chartType);

    this.chartInstance = new Chart(ctx, {
      type: chartJsType as any,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...(config?.options ?? {}),
      },
    });
  }

  private readonly PALETTE = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#C9CBCF', '#E7E9ED', '#71B37C', '#F7464A',
    '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD',
  ];

  private buildChartData(config: any): any {
    const staticData = config?.data;
    const hasStaticData = staticData &&
      Array.isArray(staticData.labels) && staticData.labels.length > 0 &&
      Array.isArray(staticData.datasets) && staticData.datasets[0]?.data?.length > 0;
    if (hasStaticData) return staticData;
    if (!this.queryResult || this.queryResult.rows.length === 0) return null;

    const { columns, rows } = this.queryResult;
    const labelCol = columns[0];
    const valueCol = columns[1] ?? columns[0];

    const labels = rows.map((r) => String(r[labelCol] ?? ''));
    const values = rows.map((r) => Number(r[valueCol] ?? 0));

    const isMultiColor = this.chartType === 'PIE' || this.chartType === 'DOUGHNUT';
    const backgroundColor = isMultiColor
      ? labels.map((_, i) => this.PALETTE[i % this.PALETTE.length])
      : 'rgba(59, 130, 246, 0.7)';
    const borderColor = isMultiColor
      ? labels.map((_, i) => this.PALETTE[i % this.PALETTE.length])
      : 'rgba(59, 130, 246, 1)';

    return {
      labels,
      datasets: [
        {
          label: valueCol,
          data: values,
          backgroundColor,
          borderColor,
          borderWidth: 1,
          fill: this.chartType === 'AREA',
        },
      ],
    };
  }

  private mapChartType(type: ChartType): string {
    const map: Record<ChartType, string> = {
      BAR: 'bar',
      LINE: 'line',
      PIE: 'pie',
      DOUGHNUT: 'doughnut',
      SCATTER: 'scatter',
      AREA: 'line',
      TABLE: 'bar',
    };
    return map[type] ?? 'bar';
  }

  private destroyChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}
