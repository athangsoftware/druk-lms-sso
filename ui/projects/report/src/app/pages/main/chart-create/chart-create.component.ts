import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/api/api.service';
import { environment } from '@environments/environment';
import type { DbConnectionItem, GenerateChartResponse, GetDbConnectionListResponse } from '@core/api/model';
import { ChartRendererComponent } from '@app/shared/chart-renderer/chart-renderer.component';
import { Button, httpQuery, httpMutation } from '@projects/shared-lib';

type WizardStep = 1 | 2 | 3;

@Component({
  selector: 'app-chart-create',
  standalone: true,
  imports: [FormsModule, Button, ChartRendererComponent],
  template: `
    <div class="w-full max-w-2xl mx-auto p-6 flex flex-col gap-6">
      <!-- Steps indicator -->
      <div class="flex items-center gap-2">
        @for (s of [1, 2, 3]; track s; let i = $index) {
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
              [class]="step() >= s ? 'bg-blue-600 text-white' : 'bg-neutral-200 text-neutral-600'"
            >{{ s }}</div>
            <span class="text-sm text-neutral-600 hidden sm:inline">{{ stepLabels[i] }}</span>
            @if (i < 2) {
              <div class="w-8 h-px bg-neutral-300"></div>
            }
          </div>
        }
      </div>

      <!-- Step 1: Select DB Connection -->
      @if (step() === 1) {
        <div class="flex flex-col gap-4">
          <h2 class="text-lg font-semibold text-neutral-800">Select Database Connection</h2>
          @if (connectionList.isLoading()) {
            <div class="text-neutral-500 text-sm">Loading connections...</div>
          }
          <div class="grid grid-cols-1 gap-3">
            @for (conn of connectionList.value()?.data ?? []; track conn.id) {
              <div
                (click)="selectConnection(conn)"
                class="p-4 border rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                [class]="selectedConnection?.id === conn.id ? 'border-blue-500 bg-blue-50' : 'border-neutral-200'"
              >
                <div class="font-medium text-neutral-800">{{ conn.name }}</div>
                <div class="text-sm text-neutral-500">{{ conn.host }}:{{ conn.port }} / {{ conn.databaseName }}</div>
              </div>
            }
          </div>
          @if (!connectionList.isLoading() && !(connectionList.value()?.data?.length)) {
            <div class="text-neutral-500 text-sm">
              No database connections found. <a class="text-blue-600 underline" (click)="goToConnections()">Add one first.</a>
            </div>
          }
          <div class="flex justify-end">
            <ui-button type="button" (click)="goToStep2()" [disabled]="!selectedConnection">Next</ui-button>
          </div>
        </div>
      }

      <!-- Step 2: Enter prompt -->
      @if (step() === 2) {
        <div class="flex flex-col gap-4">
          <h2 class="text-lg font-semibold text-neutral-800">Describe Your Chart</h2>
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-neutral-700">Connection</label>
            <div class="text-sm text-neutral-600 bg-neutral-100 rounded px-3 py-2">{{ selectedConnection?.name }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-neutral-700">Prompt *</label>
            <textarea
              [(ngModel)]="prompt"
              rows="4"
              placeholder="e.g. Show me total sales by month for the last year as a bar chart"
              class="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-neutral-700">Description (optional)</label>
            <input
              [(ngModel)]="description"
              type="text"
              placeholder="A short description for this chart"
              class="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          @if (generateMutation.error()) {
            <div class="text-red-600 text-sm">
              {{ generateMutation.error()?.message ?? 'An error occurred' }}
            </div>
          }
          <div class="flex justify-between">
            <ui-button type="button" (click)="step.set(1)">Back</ui-button>
            <ui-button
              type="button"
              (click)="generateChart()"
              [disabled]="!prompt.trim() || generateMutation.isLoading()"
            >
              {{ generateMutation.isLoading() ? 'Generating...' : 'Generate' }}
            </ui-button>
          </div>
        </div>
      }

      <!-- Step 3: Review & Save -->
      @if (step() === 3) {
        <div class="flex flex-col gap-4">
          <h2 class="text-lg font-semibold text-neutral-800">Review Chart</h2>

          @if (generatedChart) {
            <div class="flex flex-col gap-4">
              <!-- Chart preview -->
              <div class="h-64 border border-neutral-200 rounded-lg p-3 overflow-hidden">
                <app-chart-renderer
                  [chartItem]="generatedChart"
                  [queryResult]="previewData"
                />
              </div>

              <!-- Editable fields -->
              <div class="flex flex-col gap-1">
                <label class="text-sm font-medium text-neutral-700">Title</label>
                <input
                  [(ngModel)]="generatedChart.name"
                  type="text"
                  class="border border-neutral-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-sm font-medium text-neutral-700">SQL Query</label>
                <textarea
                  [(ngModel)]="generatedChart.sqlQuery"
                  rows="5"
                  class="border border-neutral-300 rounded-md px-3 py-2 text-sm font-mono"
                ></textarea>
              </div>

              <!-- Re-generate prompt -->
              <div class="flex flex-col gap-1">
                <label class="text-sm font-medium text-neutral-700">Modify with AI (optional)</label>
                <div class="flex gap-2">
                  <input
                    [(ngModel)]="modifyPrompt"
                    type="text"
                    placeholder="e.g. Change to a line chart"
                    class="flex-1 border border-neutral-300 rounded-md px-3 py-2 text-sm"
                  />
                  <ui-button
                    type="button"
                    (click)="modifyChart()"
                    [disabled]="!modifyPrompt.trim() || modifyMutation.isLoading()"
                  >
                    {{ modifyMutation.isLoading() ? '...' : 'Modify' }}
                  </ui-button>
                </div>
              </div>
            </div>
          }

          @if (saveMutation.error()) {
            <div class="text-red-600 text-sm">
              {{ saveMutation.error()?.message ?? 'An error occurred' }}
            </div>
          }
          <div class="flex justify-between">
            <ui-button type="button" (click)="step.set(2)">Back</ui-button>
            <ui-button
              type="button"
              (click)="saveChart()"
              [disabled]="saveMutation.isLoading()"
            >
              {{ saveMutation.isLoading() ? 'Saving...' : 'Save Chart' }}
            </ui-button>
          </div>
        </div>
      }
    </div>
  `,
})
export class ChartCreateComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  step = signal<WizardStep>(1);
  stepLabels = ['Select DB', 'Describe', 'Review'];

  selectedConnection: DbConnectionItem | null = null;
  prompt = '';
  description = '';
  modifyPrompt = '';
  generatedChart: any = null;
  previewData: any = null;
  private savedChartId = signal<string>('');

  connectionList = httpQuery<GetDbConnectionListResponse>({
    request: () => ({
      url: `${environment.apiUrl}/db-connections`,
      params: { pageNumber: 1, pageSize: 100 },
    }),
    handleError: true,
  });

  generateMutation = httpMutation<GenerateChartResponse>({
    request: () =>
      this.api.generateChart({
        connectionId: this.selectedConnection!.id,
        prompt: this.prompt,
        description: this.description || undefined,
      }),
    onSuccess: (res) => {
      this.generatedChart = res.data;
      this.loadPreview(res.data.id);
      this.step.set(3);
    },
  });

  modifyMutation = httpMutation({
    request: () =>
      this.api.aiModifyChart(this.generatedChart.id, { prompt: this.modifyPrompt }),
    onSuccess: (res: any) => {
      this.generatedChart = res.data;
      this.modifyPrompt = '';
      this.loadPreview(res.data.id);
    },
  });

  saveMutation = httpMutation({
    request: () =>
      this.api.updateChart(this.generatedChart.id, {
        name: this.generatedChart.name,
        sqlQuery: this.generatedChart.sqlQuery,
      }),
    handleSuccess: true,
    onSuccess: () => {
      this.router.navigate(['/main/charts', this.generatedChart.id]);
    },
  });

  ngOnInit() {}

  selectConnection(conn: DbConnectionItem) {
    this.selectedConnection = conn;
  }

  goToStep2() {
    if (this.selectedConnection) this.step.set(2);
  }

  goToConnections() {
    this.router.navigate(['/main/db-connections']);
  }

  generateChart() {
    this.generateMutation.trigger();
  }

  modifyChart() {
    if (this.generatedChart && this.modifyPrompt.trim()) {
      this.modifyMutation.trigger();
    }
  }

  saveChart() {
    this.saveMutation.trigger();
  }

  private loadPreview(chartId: string) {
    this.api.executeChartQuery(chartId).subscribe({
      next: (res) => (this.previewData = res),
    });
  }
}
