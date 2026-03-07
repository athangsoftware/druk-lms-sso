import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  signal,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/api/api.service';
import type { DashboardFilterItem, FilterValueItem } from '@core/api/model';

export interface FilterState {
  [filterId: string]: unknown;
}

interface SelectFilterMeta {
  options: string[];
  loading: boolean;
}

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    @if (filters.length) {
      <div class="w-full p-3 bg-white border border-neutral-200 rounded-lg flex flex-col gap-3">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Filters</span>
          <button
            type="button"
            (click)="onClearAll()"
            class="text-xs text-blue-600 hover:text-blue-800 hover:underline"
          >Clear all</button>
        </div>
        <div class="flex flex-wrap gap-3">
          @for (f of filters; track f.id) {
            <div class="flex flex-col gap-1 min-w-[160px]">
              <label class="text-xs font-medium text-neutral-600">{{ f.name }}</label>

              <!-- MULTI_SELECT -->
              @if (f.filterType === 'MULTI_SELECT') {
                <div class="relative">
                  <div
                    class="border border-neutral-300 rounded-md px-2 py-1.5 text-sm bg-white min-h-[32px] cursor-pointer flex flex-wrap gap-1 items-center"
                    (click)="toggleMultiSelectDropdown(f.id)"
                  >
                    @if (getMultiValues(f.id).length === 0) {
                      <span class="text-neutral-400 text-xs">Select…</span>
                    }
                    @for (val of getMultiValues(f.id); track val) {
                      <span class="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                        {{ val }}
                        <button type="button" (click)="removeMultiValue(f.id, val); $event.stopPropagation()" class="hover:text-blue-900">✕</button>
                      </span>
                    }
                  </div>
                  @if (openDropdownId() === f.id) {
                    <div class="absolute z-20 top-full left-0 mt-1 bg-white border border-neutral-200 rounded-md shadow-lg min-w-full max-h-48 overflow-y-auto">
                      @if (selectMeta()[f.id]?.loading) {
                        <div class="px-3 py-2 text-xs text-neutral-400">Loading…</div>
                      }
                      @for (opt of selectMeta()[f.id]?.options ?? []; track opt) {
                        <label class="flex items-center gap-2 px-3 py-1.5 hover:bg-neutral-50 cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            [checked]="getMultiValues(f.id).includes(opt)"
                            (change)="toggleMultiValue(f.id, opt)"
                            class="accent-blue-500"
                          />
                          {{ opt }}
                        </label>
                      }
                      @if (!selectMeta()[f.id]?.loading && !(selectMeta()[f.id]?.options?.length)) {
                        <div class="px-3 py-2 text-xs text-neutral-400">No options found.</div>
                      }
                    </div>
                  }
                </div>
              }

              <!-- SINGLE_SELECT -->
              @if (f.filterType === 'SINGLE_SELECT') {
                <select
                  class="border border-neutral-300 rounded-md px-2 py-1.5 text-sm bg-white"
                  [ngModel]="getStringValue(f.id)"
                  (ngModelChange)="setValue(f.id, $event); emitChange()"
                  (focus)="loadSelectOptions(f)"
                >
                  <option value="">All</option>
                  @if (selectMeta()[f.id]?.loading) {
                    <option disabled>Loading…</option>
                  }
                  @for (opt of selectMeta()[f.id]?.options ?? []; track opt) {
                    <option [value]="opt">{{ opt }}</option>
                  }
                </select>
              }

              <!-- DATE_RANGE -->
              @if (f.filterType === 'DATE_RANGE') {
                <div class="flex items-center gap-1">
                  <input
                    type="date"
                    class="border border-neutral-300 rounded-md px-2 py-1.5 text-sm"
                    [ngModel]="getDateRange(f.id).startDate"
                    (ngModelChange)="setDateRange(f.id, 'startDate', $event)"
                    placeholder="Start"
                  />
                  <span class="text-neutral-400 text-xs">–</span>
                  <input
                    type="date"
                    class="border border-neutral-300 rounded-md px-2 py-1.5 text-sm"
                    [ngModel]="getDateRange(f.id).endDate"
                    (ngModelChange)="setDateRange(f.id, 'endDate', $event)"
                    placeholder="End"
                  />
                </div>
              }

              <!-- TEXT -->
              @if (f.filterType === 'TEXT') {
                <input
                  type="text"
                  class="border border-neutral-300 rounded-md px-2 py-1.5 text-sm"
                  [ngModel]="getStringValue(f.id)"
                  (ngModelChange)="setValue(f.id, $event)"
                  (keyup.enter)="emitChange()"
                  placeholder="Search…"
                />
              }

              <!-- NUMBER -->
              @if (f.filterType === 'NUMBER') {
                <div class="flex items-center gap-1">
                  <select
                    class="border border-neutral-300 rounded-md px-1 py-1.5 text-xs bg-white w-16"
                    [ngModel]="getNumberOp(f.id)"
                    (ngModelChange)="setNumberOp(f.id, $event); emitChange()"
                  >
                    <option value="=">=</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value=">=">&gt;=</option>
                    <option value="<=">&lt;=</option>
                  </select>
                  <input
                    type="number"
                    class="border border-neutral-300 rounded-md px-2 py-1.5 text-sm w-24"
                    [ngModel]="getNumberVal(f.id)"
                    (ngModelChange)="setNumberVal(f.id, $event)"
                    (keyup.enter)="emitChange()"
                    placeholder="Value"
                  />
                </div>
              }
            </div>
          }
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            (click)="emitChange()"
            class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md transition-colors"
          >Apply Filters</button>
        </div>
      </div>
    }
  `,
})
export class DashboardFiltersComponent implements OnChanges {
  @Input() filters: DashboardFilterItem[] = [];
  @Input() dashboardId = '';
  @Output() filtersChanged = new EventEmitter<FilterValueItem[]>();

  private api = inject(ApiService);

  private _state = signal<FilterState>({});
  selectMeta = signal<Record<string, SelectFilterMeta>>({});
  openDropdownId = signal<string | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      // Seed defaults
      const state: FilterState = {};
      for (const f of this.filters) {
        if (f.defaultValue !== null && f.defaultValue !== undefined) {
          if (f.filterType === 'MULTI_SELECT') {
            state[f.id] = f.defaultValue
              .split(',')
              .map((v) => v.trim())
              .filter(Boolean);
          } else if (f.filterType === 'DATE_RANGE') {
            try {
              state[f.id] = JSON.parse(f.defaultValue);
            } catch {
              state[f.id] = { startDate: '', endDate: '' };
            }
          } else {
            state[f.id] = f.defaultValue;
          }
        }
      }
      this._state.set(state);
    }
  }

  // ── State accessors ──────────────────────────────────────────────

  getMultiValues(filterId: string): string[] {
    return (this._state()[filterId] as string[]) ?? [];
  }

  getStringValue(filterId: string): string {
    return (this._state()[filterId] as string) ?? '';
  }

  getDateRange(filterId: string): { startDate: string; endDate: string } {
    return (
      (this._state()[filterId] as { startDate: string; endDate: string }) ?? {
        startDate: '',
        endDate: '',
      }
    );
  }

  getNumberOp(filterId: string): string {
    const num = this._state()[filterId] as { operator?: string; value?: number } | undefined;
    return num?.operator ?? '=';
  }

  getNumberVal(filterId: string): number | string {
    const num = this._state()[filterId] as { operator?: string; value?: number } | undefined;
    return num?.value ?? '';
  }

  setValue(filterId: string, value: unknown): void {
    this._state.update((s) => ({ ...s, [filterId]: value }));
  }

  // ── Multi-select ─────────────────────────────────────────────────

  toggleMultiSelectDropdown(filterId: string): void {
    if (this.openDropdownId() === filterId) {
      this.openDropdownId.set(null);
    } else {
      this.openDropdownId.set(filterId);
      const filter = this.filters.find((f) => f.id === filterId);
      if (filter) this.loadSelectOptions(filter);
    }
  }

  toggleMultiValue(filterId: string, value: string): void {
    const current = this.getMultiValues(filterId);
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    this._state.update((s) => ({ ...s, [filterId]: updated }));
    this.emitChange();
  }

  removeMultiValue(filterId: string, value: string): void {
    const updated = this.getMultiValues(filterId).filter((v) => v !== value);
    this._state.update((s) => ({ ...s, [filterId]: updated }));
    this.emitChange();
  }

  // ── Select options ────────────────────────────────────────────────

  loadSelectOptions(filter: DashboardFilterItem): void {
    const existing = this.selectMeta()[filter.id];
    if (existing?.options?.length || existing?.loading) return;

    this.selectMeta.update((m) => ({
      ...m,
      [filter.id]: { options: [], loading: true },
    }));

    this.api.getFilterOptions(this.dashboardId, filter.id).subscribe({
      next: (res) => {
        this.selectMeta.update((m) => ({
          ...m,
          [filter.id]: { options: res.options, loading: false },
        }));
      },
      error: () => {
        this.selectMeta.update((m) => ({
          ...m,
          [filter.id]: { options: [], loading: false },
        }));
      },
    });
  }

  // ── Date range ───────────────────────────────────────────────────

  setDateRange(filterId: string, key: 'startDate' | 'endDate', value: string): void {
    const current = this.getDateRange(filterId);
    this._state.update((s) => ({
      ...s,
      [filterId]: { ...current, [key]: value },
    }));
  }

  // ── Number ───────────────────────────────────────────────────────

  setNumberOp(filterId: string, operator: string): void {
    const current = this._state()[filterId] as { operator?: string; value?: number } | undefined;
    this._state.update((s) => ({
      ...s,
      [filterId]: { ...(current ?? {}), operator },
    }));
  }

  setNumberVal(filterId: string, value: number): void {
    const current = this._state()[filterId] as { operator?: string; value?: number } | undefined;
    this._state.update((s) => ({
      ...s,
      [filterId]: { ...(current ?? {}), value },
    }));
  }

  // ── Emit ─────────────────────────────────────────────────────────

  emitChange(): void {
    this.openDropdownId.set(null);
    const items: FilterValueItem[] = [];
    for (const f of this.filters) {
      const v = this._state()[f.id];
      if (v !== undefined && v !== null && v !== '') {
        items.push({ filterId: f.id, value: v });
      }
    }
    this.filtersChanged.emit(items);
  }

  onClearAll(): void {
    this._state.set({});
    this.filtersChanged.emit([]);
  }
}
