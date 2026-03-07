import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/api/api.service';
import type { DashboardFilterItem } from '@core/api/model';
import {
  SelectDropdownField,
  MultiSelectDropdownField,
  SearchField,
  NumberField,
  TextInputComponent,
  Button,
} from '@projects/shared-lib';

const NUMBER_OPERATORS = [
  { value: 'eq', label: '= Equal' },
  { value: 'gt', label: '> Greater' },
  { value: 'lt', label: '< Less' },
  { value: 'range', label: 'Range' },
];

@Component({
  selector: 'app-dashboard-filter-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    SelectDropdownField,
    MultiSelectDropdownField,
    SearchField,
    NumberField,
    TextInputComponent,
    Button,
  ],
  template: `
    @if (filters.length) {
      <div class="flex flex-wrap items-end gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
        @for (f of filters; track f.id) {
          @switch (f.filterType) {
            @case ('MULTI_SELECT') {
              <ui-multi-select-dropdown
                [label]="f.name"
                [options]="optionsMap()[f.id] ?? []"
                [value]="getMultiValue(f.id)"
                [enableSearch]="true"
                [showErrorSpace]="false"
                [placeholder]="'Select ' + f.name"
                width="lg"
                size="sm"
                (valueChange)="onMultiChange(f.id, $event)"
              />
            }
            @case ('SINGLE_SELECT') {
              <ui-select-dropdown-field
                [label]="f.name"
                [options]="getSingleSelectOptions(f.id)"
                [value]="values[f.id] ?? null"
                [enableSearch]="true"
                [showErrorSpace]="false"
                [placeholder]="'All'"
                width="lg"
                size="sm"
                (valueChange)="onSingleSelectChange(f.id, $event)"
              />
            }
            @case ('DATE_RANGE') {
              <div class="flex gap-2 items-end">
                <app-text-input
                  type="date"
                  [label]="f.name + ' (From)'"
                  [ngModel]="getDateRange(f.id).startDate"
                  (ngModelChange)="onDateRangeChange(f.id, 'startDate', $event)"
                />
                <app-text-input
                  type="date"
                  [label]="f.name + ' (To)'"
                  [ngModel]="getDateRange(f.id).endDate"
                  (ngModelChange)="onDateRangeChange(f.id, 'endDate', $event)"
                />
              </div>
            }
            @case ('TEXT') {
              <ui-search-field
                [label]="f.name"
                [placeholder]="'Search ' + f.name + '…'"
                [showErrorSpace]="false"
                [debounceTimeMs]="400"
                width="lg"
                size="sm"
                (valueChange)="onTextChange(f.id, $event)"
              />
            }
            @case ('NUMBER') {
              <div class="flex gap-2 items-end">
                <ui-select-dropdown-field
                  [label]="f.name"
                  [options]="numberOperators"
                  [value]="getNumberFilter(f.id).operator"
                  displayProperty="label"
                  valueProperty="value"
                  [enableSearch]="false"
                  [showErrorSpace]="false"
                  placeholder="Operator"
                  width="sm"
                  size="sm"
                  (valueChange)="onNumberChange(f.id, 'operator', $event)"
                />
                @if (getNumberFilter(f.id).operator !== 'range') {
                  <ui-number-field
                    [value]="getNumberFilter(f.id).value ?? null"
                    [showErrorSpace]="false"
                    placeholder="Value"
                    width="sm"
                    size="sm"
                    (valueChange)="onNumberChange(f.id, 'value', $event)"
                  />
                } @else {
                  <ui-number-field
                    [value]="getNumberFilter(f.id).min ?? null"
                    [showErrorSpace]="false"
                    placeholder="Min"
                    width="sm"
                    size="sm"
                    (valueChange)="onNumberChange(f.id, 'min', $event)"
                  />
                  <span class="text-xs text-neutral-400 pb-2">–</span>
                  <ui-number-field
                    [value]="getNumberFilter(f.id).max ?? null"
                    [showErrorSpace]="false"
                    placeholder="Max"
                    width="sm"
                    size="sm"
                    (valueChange)="onNumberChange(f.id, 'max', $event)"
                  />
                }
              </div>
            }
          }
        }

        <div class="flex gap-2 self-end pb-0.5">
          <ui-button size="sm" (click)="onApply()">Apply</ui-button>
          <ui-button size="sm" appearance="outline" (click)="onClear()">Clear</ui-button>
        </div>
      </div>
    }
  `,
})
export class DashboardFilterBarComponent implements OnChanges {
  private api = inject(ApiService);

  @Input() dashboardId = '';
  @Input() filters: DashboardFilterItem[] = [];
  @Output() filterApplied = new EventEmitter<Record<string, unknown>>();

  values: Record<string, unknown> = {};
  optionsMap = signal<Record<string, string[]>>({});
  numberOperators = NUMBER_OPERATORS;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters'] && this.filters?.length) {
      this.initDefaults();
      this.loadSelectOptions();
    }
  }

  private initDefaults() {
    for (const f of this.filters) {
      if (f.defaultValue && this.values[f.id] === undefined) {
        try {
          this.values[f.id] = JSON.parse(f.defaultValue);
        } catch {
          this.values[f.id] = f.defaultValue;
        }
      }
    }
  }

  private loadSelectOptions() {
    for (const f of this.filters) {
      if ((f.filterType === 'MULTI_SELECT' || f.filterType === 'SINGLE_SELECT') && f.sourceQuery) {
        this.api.getFilterOptions(this.dashboardId, f.id).subscribe({
          next: (res) => {
            this.optionsMap.update((m) => ({ ...m, [f.id]: res.options }));
          },
        });
      }
    }
  }

  /** Returns the options with an empty "All" sentinel prepended for single-select */
  getSingleSelectOptions(id: string): string[] {
    return this.optionsMap()[id] ?? [];
  }

  getMultiValue(id: string): string[] {
    const v = this.values[id];
    return Array.isArray(v) ? v : [];
  }

  getDateRange(id: string): { startDate: string; endDate: string } {
    const v = this.values[id] as any;
    return { startDate: v?.startDate ?? '', endDate: v?.endDate ?? '' };
  }

  getNumberFilter(id: string): { operator: string; value?: number; min?: number; max?: number } {
    const v = this.values[id] as any;
    return { operator: v?.operator ?? 'eq', value: v?.value, min: v?.min, max: v?.max };
  }

  onMultiChange(id: string, selected: string[]) {
    this.values = { ...this.values, [id]: selected };
  }

  onSingleSelectChange(id: string, value: unknown) {
    this.values = { ...this.values, [id]: value ?? '' };
  }

  onTextChange(id: string, value: string | null) {
    this.values = { ...this.values, [id]: value ?? '' };
  }

  onDateRangeChange(id: string, key: 'startDate' | 'endDate', value: string) {
    const current = this.getDateRange(id);
    this.values = { ...this.values, [id]: { ...current, [key]: value } };
  }

  onNumberChange(id: string, key: string, value: unknown) {
    const current = this.getNumberFilter(id);
    this.values = { ...this.values, [id]: { ...current, [key]: value } };
  }

  onApply() {
    const cleaned: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(this.values)) {
      if (val === undefined || val === null || val === '') continue;
      if (Array.isArray(val) && val.length === 0) continue;
      if (typeof val === 'object' && !Array.isArray(val)) {
        const obj = val as Record<string, unknown>;
        const hasValue = Object.values(obj).some((v) => v !== undefined && v !== null && v !== '');
        if (!hasValue) continue;
      }
      cleaned[key] = val;
    }
    this.filterApplied.emit(cleaned);
  }

  onClear() {
    this.values = {};
    this.filterApplied.emit({});
  }
}
