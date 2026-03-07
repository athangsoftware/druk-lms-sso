import {
  Component,
  inject,
  signal,
  OnInit,
  OnDestroy,
  computed,
  effect,
  untracked,
  ChangeDetectionStrategy,
  NgZone,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDropList,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ApiService } from '@core/api/api.service';
import { environment } from '@environments/environment';
import type { DashboardDetail, DashboardChartItem, DashboardFilterItem, ChartItem, GetChartListResponse } from '@core/api/model';
import { ChartRendererComponent, ChartQueryResult } from '@app/shared/chart-renderer/chart-renderer.component';
import { DashboardFilterBarComponent } from '@app/shared/dashboard-filter-bar/dashboard-filter-bar.component';
import { Button, OverlayStore, httpQuery, httpMutation } from '@projects/shared-lib';

interface CardLayout {
  cols: 1 | 2 | 3;
  rows: 1 | 2;
}

const ROW_HEIGHT = 288; // px per grid row (auto-rows value)
const GRID_GAP = 16;   // px (gap-4)
const NUM_COLS = 3;

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, Button, ChartRendererComponent, DashboardFilterBarComponent, CdkDrag, CdkDropList, CdkDragHandle, CdkDragPlaceholder],
  template: `
<div class="w-full p-4 flex flex-col gap-4">

  <!-- ── Header ─────────────────────────────────────────────────── -->
  <div class="flex items-center justify-between flex-wrap gap-2">
    <div>
      <h1 class="text-xl font-semibold text-neutral-800">{{ dashboard()?.name }}</h1>
      @if (dashboard()?.description) {
        <p class="text-sm text-neutral-500">{{ dashboard()?.description }}</p>
      }
    </div>
    <div class="flex gap-2 flex-wrap">
      <ui-button type="button" (click)="onAddChart()">+ Add Chart</ui-button>
      <ui-button type="button" (click)="toggleEditMode()">
        {{ editMode() ? '✓ Done Editing' : '⊞ Edit Layout' }}
      </ui-button>
      <ui-button type="button" (click)="onEdit()">Settings</ui-button>
    </div>
  </div>

  <!-- Edit mode hint -->
  @if (editMode()) {
    <div class="flex items-center justify-between gap-3 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3 py-2 rounded-md">
      <span>Drag cards by their header to reorder · Use <strong>↘</strong> corner handle to resize · Column buttons <strong>1 / 2 / 3</strong> set width · <strong>↕</strong> toggles height</span>
      <button
        type="button"
        (click)="resetLayout()"
        class="shrink-0 underline underline-offset-2 hover:text-blue-900"
      >Reset layout</button>
    </div>
  }

  <!-- Loading / Error -->
  @if (dashboardQuery.isLoading()) {
    <div class="text-neutral-500 text-sm">Loading…</div>
  }
  @if (dashboardQuery.error()) {
    <div class="text-red-600 text-sm">Failed to load dashboard.</div>
  }

  <!-- ── Filter Bar ──────────────────────────────────────────────── -->
  @if (dashboardFilters().length) {
    <app-dashboard-filter-bar
      [dashboardId]="dashboardId()"
      [filters]="dashboardFilters()"
      (filterApplied)="onFilterApplied($event)"
    />
  }

  <!-- ── Add Chart Panel ────────────────────────────────────────── -->
  @if (showAddChart()) {
    <div class="p-4 border border-neutral-200 rounded-lg bg-neutral-50 flex flex-col gap-3">
      <h2 class="font-medium text-neutral-800">Add Chart</h2>
      <select
        [(ngModel)]="selectedChartId"
        class="border border-neutral-300 rounded-md px-3 py-2 text-sm"
      >
        <option value="">Select a chart…</option>
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

  <!-- ── Charts Grid ────────────────────────────────────────────── -->
  @if (orderedCharts().length) {
    <div
      #gridContainer
      cdkDropList
      cdkDropListOrientation="mixed"
      (cdkDropListDropped)="onDrop($event)"
      class="grid gap-4"
      style="grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-rows: 288px;"
    >
      @for (dc of orderedCharts(); track dc.chartId) {
        <div
          cdkDrag
          [cdkDragDisabled]="!editMode()"
          class="bg-white border border-neutral-200 rounded-lg flex flex-col overflow-hidden relative transition-shadow"
          [class.ring-2]="editMode()"
          [class.ring-blue-300]="editMode()"
          [class.shadow-md]="editMode()"
          [style.grid-column]="'span ' + getLayout(dc.chartId).cols"
          [style.grid-row]="'span ' + getLayout(dc.chartId).rows"
        >
          <!-- Drag placeholder -->
          <div
            *cdkDragPlaceholder
            class="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50"
            [style.grid-column]="'span ' + getLayout(dc.chartId).cols"
            [style.grid-row]="'span ' + getLayout(dc.chartId).rows"
          ></div>

          <!-- ── Card Header ──────────────────────────────────── -->
          <div
            cdkDragHandle
            class="flex items-center gap-1.5 px-3 py-2 border-b border-neutral-100 bg-neutral-50 rounded-t-lg shrink-0"
            [class.cursor-grab]="editMode()"
            [class.cursor-default]="!editMode()"
          >
            @if (editMode()) {
              <!-- Grip dots -->
              <svg class="w-3 h-3.5 text-neutral-400 shrink-0" viewBox="0 0 8 14" fill="currentColor">
                <circle cx="2" cy="2"  r="1.3"/><circle cx="6" cy="2"  r="1.3"/>
                <circle cx="2" cy="7"  r="1.3"/><circle cx="6" cy="7"  r="1.3"/>
                <circle cx="2" cy="12" r="1.3"/><circle cx="6" cy="12" r="1.3"/>
              </svg>
            }
            <span class="font-medium text-sm text-neutral-700 truncate flex-1 min-w-0">{{ dc.chartName }}</span>

            @if (editMode()) {
              <!-- Width selector -->
              <div class="flex gap-0.5 shrink-0">
                @for (n of widthOptions; track n) {
                  <button
                    type="button"
                    (click)="setLayout(dc.chartId, 'cols', n); $event.stopPropagation()"
                    class="w-5 h-5 text-[10px] rounded border font-semibold transition-colors"
                    [class.bg-blue-500]="getLayout(dc.chartId).cols === n"
                    [class.text-white]="getLayout(dc.chartId).cols === n"
                    [class.border-blue-500]="getLayout(dc.chartId).cols === n"
                    [class.bg-white]="getLayout(dc.chartId).cols !== n"
                    [class.text-neutral-500]="getLayout(dc.chartId).cols !== n"
                    [class.border-neutral-300]="getLayout(dc.chartId).cols !== n"
                  >{{ n }}</button>
                }
              </div>
              <!-- Height toggle -->
              <button
                type="button"
                (click)="toggleHeight(dc.chartId); $event.stopPropagation()"
                title="{{ getLayout(dc.chartId).rows === 1 ? 'Expand height' : 'Reduce height' }}"
                class="w-5 h-5 text-[10px] rounded border font-semibold ml-0.5 transition-colors"
                [class.bg-blue-500]="getLayout(dc.chartId).rows === 2"
                [class.text-white]="getLayout(dc.chartId).rows === 2"
                [class.border-blue-500]="getLayout(dc.chartId).rows === 2"
                [class.bg-white]="getLayout(dc.chartId).rows === 1"
                [class.text-neutral-500]="getLayout(dc.chartId).rows === 1"
                [class.border-neutral-300]="getLayout(dc.chartId).rows === 1"
              >↕</button>
              <!-- Remove -->
              <button
                type="button"
                (click)="removeChart(dc); $event.stopPropagation()"
                title="Remove chart"
                class="w-5 h-5 text-[10px] rounded border bg-white border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600 shrink-0 ml-0.5 transition-colors"
              >✕</button>

            } @else {
              <!-- Refresh -->
              <button
                type="button"
                (click)="refreshChart(dc.chartId)"
                title="Refresh"
                class="p-1 rounded text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors shrink-0"
              >
                <svg
                  class="w-3.5 h-3.5 transition-transform"
                  [class.animate-spin]="refreshing()[dc.chartId]"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round"
                >
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
              </button>
              <!-- Fullscreen -->
              <button
                type="button"
                (click)="openFullscreen(dc)"
                title="Fullscreen"
                class="p-1 rounded text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors shrink-0"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </button>
            }
          </div>

          <!-- ── Chart Body ──────────────────────────────────── -->
          <div class="flex-1 min-h-0 overflow-hidden p-2">
            <app-chart-renderer
              [chartItem]="toChartItem(dc)"
              [queryResult]="chartData()[dc.chartId] ?? null"
            />
          </div>

          <!-- ── Resize Handle ─────────────────────────────────── -->
          @if (editMode()) {
            <div
              class="absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center cursor-se-resize text-neutral-300 hover:text-blue-400 z-10 transition-colors"
              (mousedown)="startResize($event, dc.chartId)"
              title="Drag to resize"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                <line x1="9" y1="3" x2="3" y2="9"/>
                <line x1="12" y1="6" x2="6" y2="12"/>
                <line x1="12" y1="2" x2="2" y2="12"/>
              </svg>
            </div>
          }
        </div>
      }
    </div>
  }

  <!-- Empty state -->
  @if (!dashboardQuery.isLoading() && !(dashboard()?.charts?.length)) {
    <div class="text-center text-neutral-500 py-12">
      No charts added yet. Click "+ Add Chart" to get started.
    </div>
  }
</div>

<!-- ── Fullscreen Modal ──────────────────────────────────────────── -->
@if (fullscreenItem()) {
  <div
    class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
    (click)="fullscreenItem.set(null)"
  >
    <div
      class="bg-white rounded-xl shadow-2xl flex flex-col"
      style="width: min(1280px, 95vw); height: 88vh;"
      (click)="$event.stopPropagation()"
    >
      <!-- Modal header -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-neutral-200 shrink-0">
        <h3 class="font-semibold text-neutral-800 text-base">{{ fullscreenItem()?.chartName }}</h3>
        <div class="flex items-center gap-1">
          <button
            type="button"
            (click)="refreshChart(fullscreenItem()!.chartId)"
            title="Refresh"
            class="p-1.5 rounded text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <svg
              class="w-4 h-4"
              [class.animate-spin]="refreshing()[fullscreenItem()!.chartId]"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round"
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
          </button>
          <button
            type="button"
            (click)="fullscreenItem.set(null)"
            class="p-1.5 rounded text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <!-- Modal body -->
      <div class="flex-1 min-h-0 p-4">
        <app-chart-renderer
          [chartItem]="toChartItem(fullscreenItem()!)"
          [queryResult]="chartData()[fullscreenItem()!.chartId] ?? null"
        />
      </div>
    </div>
  </div>
}
  `,
})
export class DashboardViewComponent implements OnInit, OnDestroy {
  private api = inject(ApiService);
  private overlay = inject(OverlayStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private doc = inject(DOCUMENT);
  private ngZone = inject(NgZone);

  @ViewChild('gridContainer') gridContainer?: ElementRef<HTMLElement>;

  readonly widthOptions = [1, 2, 3] as const;

  dashboardId = signal<string>('');
  chartData = signal<Record<string, ChartQueryResult>>({});
  showAddChart = signal(false);
  selectedChartId = '';

  editMode = signal(false);
  fullscreenItem = signal<DashboardChartItem | null>(null);
  refreshing = signal<Record<string, boolean>>({});

  dashboardFilters = signal<DashboardFilterItem[]>([]);
  filterValues = signal<Record<string, unknown>>({});

  private _layouts = signal<Record<string, CardLayout>>({});
  private _orderedChartIds = signal<string[]>([]);
  private removeTargetChartId = signal<string>('');

  private activeResize: {
    chartId: string;
    startX: number;
    startY: number;
    startCols: number;
    startRows: number;
  } | null = null;

  private readonly onMouseMoveBound = (e: MouseEvent) => this.onMouseMove(e);
  private readonly onMouseUpBound = () => this.onMouseUp();

  // ── Queries ──────────────────────────────────────────────────────

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

  // ── Computed ─────────────────────────────────────────────────────

  dashboard = computed(() => (this.dashboardQuery.value() as any)?.data as DashboardDetail ?? null);

  orderedCharts = computed(() => {
    const d = this.dashboard();
    if (!d) return [];
    const charts = d.charts ?? [];
    const ids = this._orderedChartIds();
    if (!ids.length) return charts;
    const map = new Map(charts.map(c => [c.chartId, c]));
    const ordered = ids.filter(id => map.has(id)).map(id => map.get(id)!);
    const extra = charts.filter(c => !ids.includes(c.chartId));
    return [...ordered, ...extra];
  });

  availableCharts = computed(() => {
    const existing = new Set((this.dashboard()?.charts ?? []).map(dc => dc.chartId));
    return (this.chartList.value()?.data ?? []).filter(c => !existing.has(c.id));
  });

  // ── Mutations ────────────────────────────────────────────────────

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
        untracked(() => {
          this.dashboardFilters.set(d.filters ?? []);
          this.loadChartData(d, this.filterValues());
          this.loadLayoutFromStorage();
        });
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.dashboardId.set(id);
  }

  onFilterApplied(newValues: Record<string, unknown>) {
    this.filterValues.set(newValues);
    // clear existing data so next effect reloads or manually reload now
    this.chartData.set({});
    const d = this.dashboard();
    if (d) {
      this.loadChartData(d, newValues);
    }
  }

  ngOnDestroy() {
    this.doc.removeEventListener('mousemove', this.onMouseMoveBound);
    this.doc.removeEventListener('mouseup', this.onMouseUpBound);
  }

  // ── Layout ───────────────────────────────────────────────────────

  getLayout(chartId: string): CardLayout {
    return this._layouts()[chartId] ?? { cols: 1, rows: 1 };
  }

  setLayout(chartId: string, key: 'cols' | 'rows', value: number) {
    this._layouts.update(ls => ({
      ...ls,
      [chartId]: { ...(ls[chartId] ?? { cols: 1, rows: 1 }), [key]: value },
    }));
    this.saveLayoutToStorage();
  }

  toggleHeight(chartId: string) {
    const rows = this.getLayout(chartId).rows;
    this.setLayout(chartId, 'rows', rows === 1 ? 2 : 1);
  }

  toggleEditMode() {
    this.editMode.update(v => !v);
  }

  resetLayout() {
    this._layouts.set({});
    this._orderedChartIds.set([]);
    this.saveLayoutToStorage();
  }

  // ── Drag & Drop ──────────────────────────────────────────────────

  onDrop(event: CdkDragDrop<unknown[]>) {
    const ids = this.orderedCharts().map(c => c.chartId);
    moveItemInArray(ids, event.previousIndex, event.currentIndex);
    this._orderedChartIds.set([...ids]);
    this.saveLayoutToStorage();
  }

  // ── Resize via mouse drag ────────────────────────────────────────

  startResize(event: MouseEvent, chartId: string) {
    event.preventDefault();
    event.stopPropagation();
    const layout = this.getLayout(chartId);
    this.activeResize = {
      chartId,
      startX: event.clientX,
      startY: event.clientY,
      startCols: layout.cols,
      startRows: layout.rows,
    };
    this.doc.addEventListener('mousemove', this.onMouseMoveBound);
    this.doc.addEventListener('mouseup', this.onMouseUpBound);
  }

  private onMouseMove(event: MouseEvent) {
    if (!this.activeResize) return;
    const { chartId, startX, startY, startCols, startRows } = this.activeResize;
    const containerW = this.gridContainer?.nativeElement.clientWidth ?? 900;
    const cellWidth = (containerW - GRID_GAP * (NUM_COLS - 1)) / NUM_COLS;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    const newCols = Math.max(1, Math.min(NUM_COLS, Math.round(startCols + deltaX / cellWidth))) as 1 | 2 | 3;
    const newRows = Math.max(1, Math.min(2, Math.round(startRows + deltaY / ROW_HEIGHT))) as 1 | 2;
    const current = this.getLayout(chartId);
    if (newCols !== current.cols || newRows !== current.rows) {
      this.ngZone.run(() => {
        this._layouts.update(ls => ({ ...ls, [chartId]: { cols: newCols, rows: newRows } }));
      });
    }
  }

  private onMouseUp() {
    if (this.activeResize) {
      this.saveLayoutToStorage();
      this.activeResize = null;
    }
    this.doc.removeEventListener('mousemove', this.onMouseMoveBound);
    this.doc.removeEventListener('mouseup', this.onMouseUpBound);
  }

  // ── Fullscreen ───────────────────────────────────────────────────

  openFullscreen(dc: DashboardChartItem) {
    this.fullscreenItem.set(dc);
  }

  // ── Per-chart refresh ────────────────────────────────────────────

  refreshChart(chartId: string) {
    this.refreshing.update(r => ({ ...r, [chartId]: true }));
    this.api.executeChartQuery(chartId, {
      dashboardId: this.dashboardId(),
      filterValues: this.filterValues(),
    }).subscribe({
      next: (res) => {
        this.chartData.update(d => ({ ...d, [chartId]: res }));
        this.refreshing.update(r => ({ ...r, [chartId]: false }));
      },
      error: () => {
        this.refreshing.update(r => ({ ...r, [chartId]: false }));
      },
    });
  }

  // ── Persistence ──────────────────────────────────────────────────

  private storageKey() {
    return `dashboard-layout-${this.dashboardId()}`;
  }

  private loadLayoutFromStorage() {
    try {
      const raw = localStorage.getItem(this.storageKey());
      if (!raw) return;
      const { layouts, order } = JSON.parse(raw) as { layouts?: Record<string, CardLayout>; order?: string[] };
      if (layouts) this._layouts.set(layouts);
      if (order) this._orderedChartIds.set(order);
    } catch { /* ignore */ }
  }

  private saveLayoutToStorage() {
    try {
      localStorage.setItem(this.storageKey(), JSON.stringify({
        layouts: this._layouts(),
        order: this._orderedChartIds(),
      }));
    } catch { /* ignore */ }
  }

  // ── Chart data ───────────────────────────────────────────────────

  private loadChartData(dashboard: DashboardDetail, filters: Record<string, unknown>) {
    dashboard.charts?.forEach((dc) => {
      if (!this.chartData()[dc.chartId]) {
        this.api.executeChartQuery(dc.chartId, {
          dashboardId: dashboard.id,
          filterValues: filters,
        }).subscribe({
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

