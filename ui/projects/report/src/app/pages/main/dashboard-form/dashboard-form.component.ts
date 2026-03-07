import { Component, inject, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ApiService } from '@core/api/api.service';
import { environment } from '@environments/environment';
import type {
  CreateDashboardRequest,
  UpdateDashboardRequest,
  DashboardFilterItem,
  CreateDashboardFilterRequest,
  GenerateDashboardFilterRequest,
  GenerateDashboardFilterResponse,
  UpdateDashboardFilterRequest,
  GetDbConnectionListResponse,
  DbConnectionItem,
  SchemaTableInfo,
  GlobalFilterItem,
  GlobalFilterOverrideItem,
  GlobalFilterOverrideRequest,
  MissingColumnBehavior,
} from '@core/api/model';
import { Button, SelectDropdownField, httpQuery, httpMutation } from '@projects/shared-lib';

@Component({
  selector: 'app-dashboard-form',
  standalone: true,
  imports: [FormsModule, Button, SelectDropdownField],
  template: `
    <div class="w-full max-w-lg mx-auto p-6 flex flex-col gap-6">
      <h1 class="text-xl font-semibold text-neutral-800">
        {{ isEditMode ? 'Edit Dashboard' : 'Create Dashboard' }}
      </h1>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-neutral-700">Name *</label>
          <input
            [(ngModel)]="form.name"
            type="text"
            placeholder="Dashboard name"
            class="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-neutral-700">Description</label>
          <textarea
            [(ngModel)]="form.description"
            placeholder="Optional description"
            rows="3"
            class="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      @if (isEditMode) {
        <div class="mt-6">
          <h2 class="text-lg font-semibold">Filters</h2>
          <div class="flex flex-col gap-2">
            <button
              type="button"
              class="w-fit px-3 py-1 bg-green-500 text-white rounded-md"
              (click)="startAddFilter()"
            >+ Add Filter</button>

            @if (isAddingFilter()) {
              <div class="p-3 border border-neutral-200 rounded-md bg-neutral-50">
                <!-- simple inline form -->
                <div class="flex flex-col gap-2">
                  <select
                    [(ngModel)]="newFilterForm.connectionId"
                    (ngModelChange)="onNewFilterConnectionChange($event)"
                    class="border border-neutral-300 rounded px-2 py-1 bg-white"
                  >
                    <option value="">Select connection</option>
                    @for (c of connectionList.value()?.data ?? []; track c.id) {
                      <option [value]="c.id">{{ c.name }}</option>
                    }
                  </select>
                  <textarea
                    [(ngModel)]="newFilterPrompt"
                    placeholder="Describe filter with natural language (AI will generate)"
                    rows="2"
                    class="border border-neutral-300 rounded px-2 py-1 bg-white"
                  ></textarea>
                  <ui-button
                    type="button"
                    (click)="generateFilterMutation.trigger()"
                    [disabled]="!newFilterPrompt.trim() || !newFilterForm.connectionId || generateFilterMutation.isLoading()"
                  >{{ generateFilterMutation.isLoading() ? 'Generating…' : 'AI Generate' }}</ui-button>

                  <input
                    [(ngModel)]="newFilterForm.name"
                    placeholder="Name"
                    class="border border-neutral-300 rounded px-2 py-1 bg-white"
                  />
                  <select
                    [(ngModel)]="newFilterForm.filterType"
                    class="border border-neutral-300 rounded px-2 py-1 bg-white"
                  >
                    <option value="">Select type</option>
                    @for (t of filterTypes; track t) {
                      <option [value]="t">{{ t }}</option>
                    }
                  </select>
                  <ui-select-dropdown-field
                    label="Target column"
                    [options]="availableColumns()"
                    [value]="newFilterForm.targetColumn ?? null"
                    [enableSearch]="true"
                    [showErrorSpace]="false"
                    placeholder="Select column"
                    width="full"
                    size="sm"
                    [noDataMessage]="newFilterForm.connectionId ? (schemaLoading() ? 'Loading columns…' : 'No columns found') : 'Select a connection first'"
                    (valueChange)="newFilterForm.targetColumn = $event"
                  />
                  <input
                    [(ngModel)]="newFilterForm.sourceQuery"
                    placeholder="Source query (optional)"
                    class="border border-neutral-300 rounded px-2 py-1"
                  />
                  <input
                    [(ngModel)]="newFilterForm.defaultValue"
                    placeholder="Default value (optional)"
                    class="border border-neutral-300 rounded px-2 py-1"
                  />
                  <div class="flex gap-2">
                    <ui-button type="button" (click)="saveNewFilter()">Save</ui-button>
                    <ui-button type="button" (click)="isAddingFilter.set(false)">Cancel</ui-button>
                  </div>
                </div>
              </div>
            }

            <ul class="mt-2 space-y-1">
              @for (f of filters(); track f.id) {
                <li class="flex items-center justify-between">
                  <span>{{ f.name }} ({{ f.filterType }})</span>
                  <div class="flex gap-1">
                    <button type="button" class="text-blue-600" (click)="editFilter(f)">Edit</button>
                    <button type="button" class="text-red-600" (click)="deleteFilter(f)">Delete</button>
                  </div>
                </li>
              }
            </ul>

            @if (editingFilter()) {
              <div class="p-3 border border-neutral-200 rounded-md bg-neutral-50">
                <div class="flex flex-col gap-2">
                  <input
                    [(ngModel)]="editFilterForm.name"
                    placeholder="Name"
                    class="border border-neutral-300 rounded px-2 py-1"
                  />
                  <select
                    [(ngModel)]="editFilterForm.filterType"
                    class="border border-neutral-300 rounded px-2 py-1 bg-white"
                  >
                    <option value="">Select type</option>
                    @for (t of filterTypes; track t) {
                      <option [value]="t">{{ t }}</option>
                    }
                  </select>
                  <select
                    [(ngModel)]="editFilterForm.connectionId"
                    (ngModelChange)="onEditFilterConnectionChange($event)"
                    class="border border-neutral-300 rounded px-2 py-1 bg-white"
                  >
                    <option value="">Select connection</option>
                    @for (c of connectionList.value()?.data ?? []; track c.id) {
                      <option [value]="c.id">{{ c.name }}</option>
                    }
                  </select>
                  <ui-select-dropdown-field
                    label="Target column"
                    [options]="availableColumns()"
                    [value]="editFilterForm.targetColumn ?? null"
                    [enableSearch]="true"
                    [showErrorSpace]="false"
                    placeholder="Select column"
                    width="full"
                    size="sm"
                    [noDataMessage]="editFilterForm.connectionId ? (schemaLoading() ? 'Loading columns…' : 'No columns found') : 'Select a connection first'"
                    (valueChange)="editFilterForm.targetColumn = $event"
                  />
                  <input
                    [(ngModel)]="editFilterForm.sourceQuery"
                    placeholder="Source query (optional)"
                    class="border border-neutral-300 rounded px-2 py-1"
                  />
                  <input
                    [(ngModel)]="editFilterForm.defaultValue"
                    placeholder="Default value (optional)"
                    class="border border-neutral-300 rounded px-2 py-1"
                  />
                  <div class="flex gap-2">
                    <ui-button type="button" (click)="saveEditedFilter()">Save</ui-button>
                    <ui-button type="button" (click)="editingFilter.set(null)">Cancel</ui-button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Global Filter Overrides -->
        @if (globalFilters().length) {
          <div class="mt-6">
            <h2 class="text-lg font-semibold">Global Filter Overrides</h2>
            <p class="text-sm text-neutral-500 mb-2">Override global filter settings for this dashboard.</p>
            <div class="flex flex-col gap-2">
              @for (gf of globalFilters(); track gf.id) {
                <div class="p-3 border border-neutral-200 rounded-md bg-neutral-50 flex flex-col gap-2">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <code class="px-1.5 py-0.5 bg-neutral-100 rounded text-sm font-mono">{{ gf.columnName }}</code>
                      <span class="text-neutral-400">=</span>
                      <code class="px-1.5 py-0.5 bg-blue-50 rounded text-sm font-mono text-blue-700">{{ gf.columnValue }}</code>
                    </div>
                    <label class="flex items-center gap-1.5 text-sm">
                      <input
                        type="checkbox"
                        [checked]="!getOverride(gf.id).isDisabled"
                        (change)="toggleOverrideEnabled(gf.id, $event)"
                        class="w-4 h-4"
                      />
                      Enabled
                    </label>
                  </div>
                  @if (!getOverride(gf.id).isDisabled) {
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        [value]="getOverride(gf.id).columnValue ?? ''"
                        (input)="setOverrideValue(gf.id, $event)"
                        placeholder="Override value (leave blank for global)"
                        class="border border-neutral-300 rounded px-2 py-1 text-sm"
                      />
                      <select
                        [value]="getOverride(gf.id).missingColumnBehavior ?? ''"
                        (change)="setOverrideBehavior(gf.id, $event)"
                        class="border border-neutral-300 rounded px-2 py-1 text-sm bg-white"
                      >
                        <option value="">Use global default</option>
                        <option value="SHOW_ALL">SHOW_ALL</option>
                        <option value="HIDE_DATA">HIDE_DATA</option>
                      </select>
                    </div>
                  }
                </div>
              }
              <ui-button
                type="button"
                (click)="saveOverrides()"
                [disabled]="overrideSaveMutation.isLoading()"
              >
                {{ overrideSaveMutation.isLoading() ? 'Saving…' : 'Save Overrides' }}
              </ui-button>
            </div>
          </div>
        }
      }

      @if (errorMessage()) {
        <div class="text-red-600 text-sm">{{ errorMessage() }}</div>
      }
      @if (aiWarnings().length) {
        <div class="rounded-md bg-amber-50 border border-amber-300 p-3 text-sm text-amber-800">
          <p class="font-medium">⚠ AI Validation Warnings:</p>
          <ul class="list-disc ml-4 mt-1">
            @for (w of aiWarnings(); track w) {
              <li>{{ w }}</li>
            }
          </ul>
          @if (aiSuggestions().length) {
            <p class="mt-1">Suggested columns: <strong>{{ aiSuggestions().join(', ') }}</strong></p>
          }
        </div>
      }
      @if (aiInfoMessage()) {
        <div class="text-blue-600 text-sm">{{ aiInfoMessage() }}</div>
      }

      <div class="flex gap-3">
        <ui-button type="button" (click)="onCancel()">Cancel</ui-button>
        <ui-button
          type="button"
          (click)="onSubmit()"
          [disabled]="saveMutation.isLoading() || !form.name"
        >
          {{ saveMutation.isLoading() ? 'Saving...' : 'Save' }}
        </ui-button>
      </div>
    </div>
  `,
})
export class DashboardFormComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  isEditMode = false;
  dashboardId = signal<string>('');
  errorMessage = signal<string | null>(null);
  aiInfoMessage = signal<string | null>(null);
  aiWarnings = signal<string[]>([]);
  aiSuggestions = signal<string[]>([]);
  private formLoaded = false;

  filterTypes = ['MULTI_SELECT', 'SINGLE_SELECT', 'DATE_RANGE', 'TEXT', 'NUMBER'];

  form = {
    name: '',
    description: '',
  };

  filters = signal<DashboardFilterItem[]>([]);
  editingFilter = signal<DashboardFilterItem | null>(null);
  isAddingFilter = signal(false);

  newFilterForm: Partial<CreateDashboardFilterRequest> = {};
  editFilterForm: Partial<UpdateDashboardFilterRequest> = {};
  newFilterPrompt = '';
  availableColumns = signal<string[]>([]);
  schemaLoading = signal(false);
  private schemaCache = new Map<string, string[]>();

  // Global filter overrides
  globalFilters = signal<GlobalFilterItem[]>([]);
  overrideMap = signal<Record<string, Partial<GlobalFilterOverrideRequest>>>({});

  generateFilterMutation = httpMutation<GenerateDashboardFilterResponse>({
    request: () => {
      const connId = this.newFilterForm.connectionId;
      if (!connId) {
        throw new Error('Connection is required for AI generation');
      }
      return this.api.generateDashboardFilter(this.dashboardId(), {
        connectionId: connId,
        prompt: this.newFilterPrompt,
      });
    },
    handleSuccess: true,
    onSuccess: (res: GenerateDashboardFilterResponse) => {
      // populate the inline form fields with AI suggestion
      const ai = res.data;
      this.newFilterForm = {
        ...this.newFilterForm,
        name: ai.name,
        // AI is not aware of our FilterType union so cast safely
        filterType: ai.filterType as any,
        targetColumn: ai.targetColumn,
        sourceQuery: ai.sourceQuery,
        defaultValue: ai.defaultValue,
      };
      this.newFilterPrompt = '';
      // show warnings if AI had to auto-correct
      if (res.warnings?.length) {
        this.aiWarnings.set(res.warnings);
        this.aiSuggestions.set(res.suggestions ?? []);
        this.aiInfoMessage.set(null);
      } else {
        this.aiWarnings.set([]);
        this.aiSuggestions.set([]);
        this.aiInfoMessage.set('AI suggestion applied — review details and click Save.');
      }
    },
  });

  connectionList = httpQuery<GetDbConnectionListResponse>({
    request: () => ({
      url: `${environment.apiUrl}/db-connections`,
      params: { pageNumber: 1, pageSize: 100 },
    }),
    handleError: true,
  });

  existingDashboard = httpQuery({
    request: () => {
      const id = this.dashboardId();
      if (!id) return undefined;
      return `${environment.apiUrl}/dashboards/${id}`;
    },
    handleError: true,
    onSuccess: (res: any) => {
      if (!this.formLoaded && res?.data) {
        this.form.name = res.data.name;
        this.form.description = res.data.description ?? '';
        this.filters.set(res.data.filters ?? []);
        this.formLoaded = true;
        this.loadGlobalFilters();
        this.cdr.detectChanges();
      }
    },
  });

  saveMutation = httpMutation({
    request: () => {
      const id = this.dashboardId();
      if (id) {
        const req: UpdateDashboardRequest = { name: this.form.name, description: this.form.description };
        return this.api.updateDashboard(id, req);
      } else {
        const req: CreateDashboardRequest = { name: this.form.name, description: this.form.description };
        return this.api.createDashboard(req);
      }
    },
    handleSuccess: true,
    onSuccess: (res: any) => {
      const id = this.dashboardId() || res?.data?.id;
      this.router.navigate(['/main/dashboards', id]);
    },
  });

  overrideSaveMutation = httpMutation({
    request: () => {
      const map = this.overrideMap();
      const overrides: GlobalFilterOverrideRequest[] = this.globalFilters().map((gf) => {
        const o = map[gf.id] ?? {};
        return {
          globalFilterId: gf.id,
          isDisabled: o.isDisabled ?? false,
          columnValue: o.columnValue || null,
          missingColumnBehavior: o.missingColumnBehavior || null,
        };
      });
      return this.api.upsertGlobalFilterOverrides(this.dashboardId(), overrides);
    },
    handleSuccess: true,
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.dashboardId.set(id);
    }
  }

  onSubmit() {
    if (!this.form.name.trim()) {
      this.errorMessage.set('Name is required.');
      return;
    }
    this.errorMessage.set(null);
    this.saveMutation.trigger();
  }

  onCancel() {
    this.router.navigate(['/main/dashboards']);
  }

  // --- filter operations ------------------------------------------------

  startAddFilter() {
    this.aiInfoMessage.set(null);
    this.aiWarnings.set([]);
    this.aiSuggestions.set([]);
    this.isAddingFilter.set(true);
    this.newFilterForm = { order: this.filters().length };
  }

  saveNewFilter() {
    const dto: CreateDashboardFilterRequest = {
      name: this.newFilterForm.name!,
      filterType: this.newFilterForm.filterType!,
      connectionId: this.newFilterForm.connectionId!,
      targetColumn: this.newFilterForm.targetColumn!,
      sourceQuery: this.newFilterForm.sourceQuery,
      defaultValue: this.newFilterForm.defaultValue,
      order: this.newFilterForm.order,
    };
    this.api.createDashboardFilter(this.dashboardId(), dto).subscribe({
      next: (res) => {
        this.filters.update(f => [...f, res.data]);
        this.isAddingFilter.set(false);
        this.aiInfoMessage.set(null);
        this.aiWarnings.set([]);
        this.aiSuggestions.set([]);
      },
    });
  }

  editFilter(f: DashboardFilterItem) {
    this.editingFilter.set(f);
    // cast because sourceQuery may be null but request type expects string|undefined
    this.editFilterForm = { ...f } as any;
    if (f.connectionId) {
      this.loadColumnsForConnection(f.connectionId);
    }
  }

  saveEditedFilter() {
    const f = this.editingFilter();
    if (!f) return;
    const dto: UpdateDashboardFilterRequest = {
      name: this.editFilterForm.name,
      filterType: this.editFilterForm.filterType,
      connectionId: this.editFilterForm.connectionId,
      targetColumn: this.editFilterForm.targetColumn,
      sourceQuery: this.editFilterForm.sourceQuery,
      defaultValue: this.editFilterForm.defaultValue,
      order: this.editFilterForm.order,
    };
    this.api.updateDashboardFilter(this.dashboardId(), f.id, dto).subscribe({
      next: () => {
        this.filters.update(fs => fs.map(x => (x.id === f.id ? { ...x, ...dto } as any : x)));
        this.editingFilter.set(null);
      },
    });
  }

  deleteFilter(f: DashboardFilterItem) {
    if (confirm('Delete filter "' + f.name + '"?')) {
      this.api.deleteDashboardFilter(this.dashboardId(), f.id).subscribe({
        next: () => {
          this.filters.update(fs => fs.filter(x => x.id !== f.id));
        },
      });
    }
  }

  // --- column loading ---------------------------------------------------

  onNewFilterConnectionChange(connectionId: string) {
    this.newFilterForm.connectionId = connectionId;
    this.newFilterForm.targetColumn = undefined;
    if (connectionId) {
      this.loadColumnsForConnection(connectionId);
    } else {
      this.availableColumns.set([]);
    }
  }

  onEditFilterConnectionChange(connectionId: string) {
    this.editFilterForm.connectionId = connectionId;
    this.editFilterForm.targetColumn = undefined;
    if (connectionId) {
      this.loadColumnsForConnection(connectionId);
    } else {
      this.availableColumns.set([]);
    }
  }

  private loadColumnsForConnection(connectionId: string) {
    const cached = this.schemaCache.get(connectionId);
    if (cached) {
      this.availableColumns.set(cached);
      return;
    }
    this.schemaLoading.set(true);
    this.availableColumns.set([]);
    this.api.getConnectionSchema(connectionId).subscribe({
      next: (res) => {
        const columns = res.data.flatMap((t) =>
          t.columns.map((c) => `${t.tableName}.${c.columnName}`)
        );
        this.schemaCache.set(connectionId, columns);
        this.availableColumns.set(columns);
        this.schemaLoading.set(false);
        this.cdr.detectChanges();
      },
      error: () => {
        this.schemaLoading.set(false);
      },
    });
  }

  // --- Global filter overrides ------------------------------------------

  private loadGlobalFilters() {
    this.api.listGlobalFilters().subscribe({
      next: (res) => {
        this.globalFilters.set(res.data ?? []);
        // Load existing overrides for this dashboard
        this.api.listGlobalFilterOverrides(this.dashboardId()).subscribe({
          next: (overRes) => {
            const map: Record<string, Partial<GlobalFilterOverrideRequest>> = {};
            for (const o of overRes.data ?? []) {
              map[o.globalFilterId] = {
                globalFilterId: o.globalFilterId,
                isDisabled: o.isDisabled,
                columnValue: o.columnValue,
                missingColumnBehavior: o.missingColumnBehavior,
              };
            }
            this.overrideMap.set(map);
            this.cdr.detectChanges();
          },
        });
      },
    });
  }

  getOverride(globalFilterId: string): Partial<GlobalFilterOverrideRequest> {
    return this.overrideMap()[globalFilterId] ?? {};
  }

  toggleOverrideEnabled(globalFilterId: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.overrideMap.update((map) => ({
      ...map,
      [globalFilterId]: { ...map[globalFilterId], globalFilterId, isDisabled: !checked },
    }));
  }

  setOverrideValue(globalFilterId: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.overrideMap.update((map) => ({
      ...map,
      [globalFilterId]: { ...map[globalFilterId], globalFilterId, columnValue: value || null },
    }));
  }

  setOverrideBehavior(globalFilterId: string, event: Event) {
    const value = (event.target as HTMLSelectElement).value as MissingColumnBehavior | '';
    this.overrideMap.update((map) => ({
      ...map,
      [globalFilterId]: {
        ...map[globalFilterId],
        globalFilterId,
        missingColumnBehavior: value || null,
      },
    }));
  }

  saveOverrides() {
    this.overrideSaveMutation.trigger();
  }
}
