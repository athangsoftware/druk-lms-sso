import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/api/api.service';
import type {
  GlobalFilterItem,
  CreateGlobalFilterRequest,
  UpdateGlobalFilterRequest,
  MissingColumnBehavior,
  ListGlobalFiltersResponse,
} from '@core/api/model';
import {
  Button,
  OverlayStore,
  httpQuery,
  httpMutation,
} from '@projects/shared-lib';

@Component({
  selector: 'app-global-filter-settings',
  standalone: true,
  imports: [FormsModule, Button],
  host: { class: 'flex-1 flex flex-col min-h-0' },
  template: `
    <div class="w-full sm:px-4 h-full flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-neutral-800">Global Filters</h1>
        <ui-button (click)="openCreatePanel()" type="button">+ Add Global Filter</ui-button>
      </div>

      <p class="text-sm text-neutral-500">
        Global filters auto-apply to every chart query. For example, set <code>tenant_id = "a"</code> to restrict all dashboards to that tenant. Dashboards can override these per-dashboard.
      </p>

      @if (showPanel) {
        <div class="p-4 border border-neutral-200 rounded-lg bg-neutral-50 flex flex-col gap-3">
          <h2 class="font-medium text-neutral-800">{{ editingId ? 'Edit Global Filter' : 'New Global Filter' }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              [(ngModel)]="form.columnName"
              placeholder="Column name (e.g. tenant_id) *"
              class="input-field"
            />
            <input
              [(ngModel)]="form.columnValue"
              placeholder="Value (e.g. a or a,b for multiple) *"
              class="input-field"
            />
            <select
              [(ngModel)]="form.missingColumnBehavior"
              class="input-field bg-white"
            >
              <option [ngValue]="null">Missing column behavior (default: ignore)</option>
              <option value="SHOW_ALL">SHOW_ALL — ignore filter if column missing</option>
              <option value="HIDE_DATA">HIDE_DATA — block data if column missing</option>
            </select>
            <label class="flex items-center gap-2 text-sm text-neutral-700">
              <input type="checkbox" [(ngModel)]="form.isEnabled" class="w-4 h-4" />
              Enabled
            </label>
          </div>
          @if (saveMutation.error()) {
            <div class="text-red-600 text-sm">{{ saveMutation.error()?.message ?? 'An error occurred' }}</div>
          }
          <div class="flex gap-2">
            <ui-button type="button" (click)="submitForm()" [disabled]="saveMutation.isLoading()">
              {{ saveMutation.isLoading() ? 'Saving...' : 'Save' }}
            </ui-button>
            <ui-button type="button" (click)="showPanel = false">Cancel</ui-button>
          </div>
        </div>
      }

      <div class="flex flex-col gap-2 overflow-auto">
        @if (list.isLoading()) {
          <p class="text-neutral-500 text-sm">Loading…</p>
        }
        @if (list.error()) {
          <p class="text-red-600 text-sm">Failed to load global filters.</p>
        }
        @for (f of list.value()?.data ?? []; track f.id) {
          <div class="flex items-center justify-between p-3 border border-neutral-200 rounded-lg bg-white">
            <div class="flex flex-col gap-0.5">
              <div class="flex items-center gap-2">
                <code class="px-1.5 py-0.5 bg-neutral-100 rounded text-sm font-mono">{{ f.columnName }}</code>
                <span class="text-neutral-400">=</span>
                <code class="px-1.5 py-0.5 bg-blue-50 rounded text-sm font-mono text-blue-700">{{ f.columnValue }}</code>
                @if (!f.isEnabled) {
                  <span class="text-xs px-1.5 py-0.5 bg-neutral-200 text-neutral-600 rounded">disabled</span>
                }
              </div>
              @if (f.missingColumnBehavior) {
                <span class="text-xs text-neutral-500">
                  Missing column: {{ f.missingColumnBehavior === 'HIDE_DATA' ? 'Block data' : 'Show all' }}
                </span>
              } @else {
                <span class="text-xs text-neutral-400">Missing column: ignore (default)</span>
              }
            </div>
            <div class="flex gap-2">
              <button type="button" class="text-blue-600 text-sm hover:underline" (click)="editFilter(f)">Edit</button>
              <button type="button" class="text-red-600 text-sm hover:underline" (click)="deleteFilter(f)">Delete</button>
            </div>
          </div>
        }
        @if (!list.isLoading() && (list.value()?.data?.length ?? 0) === 0) {
          <p class="text-neutral-400 text-sm">No global filters configured yet.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    @reference "../../../../styles.css";
    .input-field {
      @apply border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full;
    }
  `],
})
export class GlobalFilterSettingsComponent {
  private api = inject(ApiService);
  private overlay = inject(OverlayStore);

  showPanel = false;
  editingId: string | null = null;
  form: {
    columnName: string;
    columnValue: string;
    missingColumnBehavior: MissingColumnBehavior | null;
    isEnabled: boolean;
  } = { columnName: '', columnValue: '', missingColumnBehavior: null, isEnabled: true };

  list = httpQuery<ListGlobalFiltersResponse>({
    request: () => `${this.api['apiUrl']}/global-filters`,
    handleError: true,
  });

  saveMutation = httpMutation({
    request: () => {
      if (this.editingId) {
        const req: UpdateGlobalFilterRequest = {
          columnName: this.form.columnName || undefined,
          columnValue: this.form.columnValue || undefined,
          missingColumnBehavior: this.form.missingColumnBehavior,
          isEnabled: this.form.isEnabled,
        };
        return this.api.updateGlobalFilter(this.editingId, req);
      } else {
        const req: CreateGlobalFilterRequest = {
          columnName: this.form.columnName,
          columnValue: this.form.columnValue,
          missingColumnBehavior: this.form.missingColumnBehavior ?? undefined,
          isEnabled: this.form.isEnabled,
        };
        return this.api.createGlobalFilter(req);
      }
    },
    handleSuccess: true,
    onSuccess: () => {
      this.showPanel = false;
      this.editingId = null;
      this.list.refetch();
    },
  });

  openCreatePanel() {
    this.editingId = null;
    this.form = { columnName: '', columnValue: '', missingColumnBehavior: null, isEnabled: true };
    this.showPanel = true;
  }

  editFilter(f: GlobalFilterItem) {
    this.editingId = f.id;
    this.form = {
      columnName: f.columnName,
      columnValue: f.columnValue,
      missingColumnBehavior: f.missingColumnBehavior ?? null,
      isEnabled: f.isEnabled,
    };
    this.showPanel = true;
  }

  deleteFilter(f: GlobalFilterItem) {
    this.overlay.openAlert(
      'Delete Global Filter',
      `Delete global filter "${f.columnName} = ${f.columnValue}"? This will affect all dashboards.`,
    ).then((ok) => {
      if (ok) {
        this.api.deleteGlobalFilter(f.id).subscribe({
          next: () => this.list.refetch(),
        });
      }
    });
  }

  submitForm() {
    if (!this.form.columnName?.trim() || !this.form.columnValue?.trim()) return;
    this.saveMutation.trigger();
  }
}
