import { Component, inject, signal, OnInit, effect, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/api/api.service';
import { environment } from '@environments/environment';
import type { ChartItem, UpdateChartRequest, ChartType } from '@core/api/model';
import { Button, httpQuery, httpMutation } from '@projects/shared-lib';

const CHART_TYPES: ChartType[] = ['BAR', 'LINE', 'PIE', 'DOUGHNUT', 'SCATTER', 'AREA', 'TABLE'];

@Component({
  selector: 'app-chart-edit',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, FormsModule, Button],
  template: `
    <div class="w-full max-w-2xl mx-auto p-6 flex flex-col gap-6">
      <h1 class="text-xl font-semibold text-neutral-800">Edit Chart</h1>

      <div *ngIf="chartQuery.isLoading" class="text-neutral-500 text-sm">Loading...</div>

      <div *ngIf="form" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-neutral-700">Title *</label>
          <input
            [(ngModel)]="form.name"
            type="text"
            class="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-neutral-700">Chart Type</label>
          <select
            [(ngModel)]="form.chartType"
            class="border border-neutral-300 rounded-md px-3 py-2 text-sm"
          >
            <option *ngFor="let t of chartTypes" [value]="t">{{ t }}</option>
          </select>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-neutral-700">SQL Query *</label>
          <textarea
            [(ngModel)]="form.sqlQuery"
            rows="8"
            class="border border-neutral-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      <div *ngIf="saveMutation.error()" class="text-red-600 text-sm">
        {{ saveMutation.error()?.message ?? 'An error occurred' }}
      </div>

      <div class="flex gap-3">
        <ui-button type="button" (click)="onCancel()">Cancel</ui-button>
        <ui-button
          type="button"
          (click)="onSubmit()"
          [disabled]="saveMutation.isLoading() || !form?.name"
        >
          {{ saveMutation.isLoading() ? 'Saving...' : 'Save' }}
        </ui-button>
      </div>
    </div>
  `,
})
export class ChartEditComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  chartId = signal<string>('');
  chartTypes = CHART_TYPES;
  form: { name: string; chartType: ChartType; sqlQuery: string } | null = null;

  constructor() {
    effect(() => {
      const res = this.chartQuery.value() as any;
      if (res?.data) {
        const c = res.data as ChartItem;
        this.form = {
          name: c.name,
          chartType: c.chartType,
          sqlQuery: c.sqlQuery,
        };
        this.cdr.markForCheck();
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

  saveMutation = httpMutation({
    request: () => {
      const req: UpdateChartRequest = {
        name: this.form!.name,
        chartType: this.form!.chartType,
        sqlQuery: this.form!.sqlQuery,
      };
      return this.api.updateChart(this.chartId(), req);
    },
    handleSuccess: true,
    onSuccess: () => this.router.navigate(['/main/charts', this.chartId()]),
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.chartId.set(id);
  }

  onSubmit() {
    if (this.form?.name?.trim()) {
      this.saveMutation.trigger();
    }
  }

  onCancel() {
    this.router.navigate(['/main/charts', this.chartId()]);
  }
}
