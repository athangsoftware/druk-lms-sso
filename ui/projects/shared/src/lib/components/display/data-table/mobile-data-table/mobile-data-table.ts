import { AfterViewInit, Component, ContentChildren, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, TemplateRef, Type, ViewChild, ChangeDetectorRef, input, output, signal, computed, linkedSignal, model, effect, afterNextRender, Injector, inject } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { CdkPortal, DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Pagination, PaginationEvent } from '../../../display/pagination/pagination';
import { TableCellRenderer } from '../table-cell-renderer/table-cell-renderer';
import { DynamicRenderer } from '../dynamic-renderer';
import { ContextMenuButtonAction } from '../../../overlay/context-menu-button/context-menu-button';

import { TableSortEvent } from '../sortable-table';
import { SearchField } from '../../../forms/text/search-field/search-field';
import { CheckboxField } from '../../../forms/select/checkbox-field/checkbox-field';
import { OverlayStore } from '../../../overlay/overlay';

import { MobileColumnFiltersOverlay } from './column-filters/mobile-column-filters-overlay';
import { TableStateEvent, ColumnNode, TableActionEvent, ColumnDef, ContextMenuActionConfig, FilterEvent, TableAction } from '../data-table-model';

@Component({
  selector: 'ui-mobile-data-table',
  standalone: true,
  imports: [Pagination, TableCellRenderer, DynamicRenderer, SearchField, CheckboxField, CdkPortal],
  templateUrl: './mobile-data-table.html',
  host: { 'class': 'block relative overflow-x-hidden max-w-full w-full' }
})
export class MobileDataTable<T> implements OnInit, AfterViewInit, OnDestroy {
  // Inputs align with desktop DataTable for API parity
  columnGroups = input.required<ColumnNode[]>();
  data = input<T[]>([]);
  totalCount = input<number>(0);

  isLoading = input<boolean>(false);
  hasError = input<boolean>(false);
  errorMessage = input<string | null>(null);

  pageSize = model<number>(50);
  enableSearch = input<boolean>(true);
  enablePagination = input<boolean>(true);
  // Mobile enhancement: when true, pagination bar renders even if `enablePagination` is false
  alwaysShowPagination = input<boolean>(true);
  // Filters enable/indicator

  enableRowSelection = input<boolean>(false);
  enableClickableRows = input<boolean>(false);
  rowSelectionKey = input<string>('id');
  defaultSelectedKeys = input<any[]>([]);
  expandableComponent = input<any | null>(null);
  footerComponent = input<any | null>(null);
  initialValue = input<TableStateEvent>({ searchText: '' });
  showLoadingOnlyInitial = input<boolean>(true);

  // Mobile: constrain height so only content scrolls
  // Default to auto so the component fits naturally within its parent container
  mobileScrollMaxHeight = input<string>('auto');
  // Control automatic page reset on search/sort/clear
  resetPageOnQueryChange = input<boolean>(true);

  // Table actions (FAB buttons)
  tableActions = input<TableAction[]>([]);

  // Outputs
  pageChange = output<PaginationEvent>();
  sortChange = output<TableSortEvent>();
  stateChange = output<TableStateEvent>();
  action = output<TableActionEvent>();
  rowClick = output<T>();
  rowSelectionChange = output<any[]>();
  footerAction = output<TableActionEvent>();

  filterChange = output<FilterEvent>();

  // Two-way page number for parent control
  pageNumber = model<number>(1);
  // New: two-way sort state for parent control
  sortBy = model<string | null>(null);
  sortDirection = model<'asc' | 'desc' | '' | null>(null);

  // Table action output
  tableAction = output<TableActionEvent>();

  // FAB actions expanded state
  isActionsExpanded = signal<boolean>(false);

  // Computed visible actions based on selection
  visibleTableActions = computed(() => {
    const actions = this.tableActions();
    const selectedIds = this.selectedIds();
    const selectedItems = this.data().filter(item => selectedIds.includes(this.getItemId(item)));
    return actions.filter(action => {
      if (action.visible) {
        return action.visible(selectedItems);
      }
      return true;
    });
  });

  defaultTableActions = computed(() => {
    return this.visibleTableActions().filter(action => !action.position || action.position === 'default');
  });

  conditionalTableActions = computed(() => {
    return this.visibleTableActions().filter(action => action.position === 'conditional');
  });

  // Local state
  selectedIds = linkedSignal(() => {
    if (this.enableRowSelection()) {
      const defaults = this.defaultSelectedKeys();
      if (defaults && defaults.length > 0) {
        return [...defaults];
      }
    }
    return [];
  });

  private hasEverHadData = linkedSignal(() => {
    const dataLength = this.data().length;
    const isLoading = this.isLoading();
    return dataLength > 0 && !isLoading;
  });
  searchText = '';
  paginationEvent?: PaginationEvent;
  tableSortEvent?: TableSortEvent;
  private lastStateChangeTimestamp = 0;
  private readonly debounceTimeMs = 200;
  expandedRowIndex: number = -1;
  @ViewChild('root', { static: false }) rootEl!: ElementRef<HTMLElement>;
  @ViewChild('scrollContainer', { static: false }) scrollContainerEl?: ElementRef<HTMLElement>;
  @ViewChild(CdkPortal) fabPortal?: CdkPortal;

  // Portal outlet for FAB
  private fabPortalOutlet?: DomPortalOutlet;
  private injector = inject(Injector);

  // Touch interaction signals
  pullDistance = signal<number>(0);
  Math = Math; // Expose Math to template

  // Touch tracking
  private touchStartY = 0;
  private isRefreshing = false;
  private isPulling = false;

  // Internal scroll layout: no viewport-fixed metrics needed

  // Filters UI state (mobile-only)


  // Column filters state
  columnFilters: { [key: string]: { value?: any; min?: any; max?: any; operation: string } } = {};

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private overlayStore: OverlayStore
  ) {
    // Track data changes and clear errors when data loads successfully
    let previousDataLength = 0;
    const dataTracker = linkedSignal(() => {
      const dataLength = this.data().length;
      const isLoading = this.isLoading();
      if (dataLength !== previousDataLength && !isLoading) {
        previousDataLength = dataLength;
      }
      return dataLength;
    });

    // Sync external sort models into internal state and emit state changes
    const sortTracker = linkedSignal(() => {
      const key = this.sortBy();
      const dir = this.sortDirection();
      if (key == null && dir == null) return null;
      const currentKey = this.tableSortEvent?.key ?? null;
      const currentDir = (this.tableSortEvent?.direction as any) ?? null;
      if (currentKey === key && currentDir === dir) return null;

      this.tableSortEvent = { key: key ?? undefined, direction: dir ?? undefined };
      const shouldReset = this.resetPageOnQueryChange();
      const nextPage = shouldReset ? 1 : this.pageNumber();
      const state: TableStateEvent = {
        searchText: this.searchText,
        paginationEvent: { pageNumber: nextPage, pageSize: this.paginationEvent?.pageSize ?? this.pageSize() },
        tableSortEvent: this.tableSortEvent,
        columnFilters: this.columnFilters
      };
      if (shouldReset) this.pageNumber.set(1);
      this.emitTableStateChanged(state);

      return { key, dir };
    });
  }


  ngOnInit(): void {
    const initialValue = this.initialValue();
    if (initialValue) this.applyInitialState(initialValue);
  }

  ngAfterViewInit(): void {
    // Respect any pre-set sort from models when initializing
    if (this.sortBy() != null || this.sortDirection() != null) {
      this.tableSortEvent = { key: this.sortBy() ?? undefined, direction: this.sortDirection() ?? undefined };
    }
    this.paginationEvent = { pageNumber: this.pageNumber(), pageSize: this.pageSize() };
    const state: TableStateEvent = { searchText: '', paginationEvent: this.paginationEvent, tableSortEvent: this.tableSortEvent, columnFilters: this.columnFilters };
    this.pageChange.emit(this.paginationEvent);
    this.emitTableStateChanged(state);
    setTimeout(() => this.cdr.detectChanges());

    // Attach FAB portal to body for proper fixed positioning
    // Use afterNextRender to ensure DOM is fully ready
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.attachFabPortal();
      }, { injector: this.injector });
    }
  }

  private attachFabPortal(): void {
    if (this.fabPortal && this.document?.body && !this.fabPortalOutlet) {
      try {
        this.fabPortalOutlet = new DomPortalOutlet(this.document.body);
        this.fabPortalOutlet.attach(this.fabPortal);
      } catch (e) {
        // Silently handle portal attachment errors during navigation
        console.warn('FAB portal attachment failed:', e);
      }
    }
  }

  ngOnDestroy(): void {
    // Detach FAB portal
    if (this.fabPortalOutlet) {
      try {
        if (this.fabPortalOutlet.hasAttached()) {
          this.fabPortalOutlet.detach();
        }
      } catch (e) {
        // Silently handle portal cleanup errors
      }
      this.fabPortalOutlet = undefined;
    }
  }

  // API parity helpers
  onSearchTextChanged(event: string | any): void {
    this.searchText = event;
    const shouldReset = this.resetPageOnQueryChange();
    const nextPage = shouldReset ? 1 : this.pageNumber();
    this.paginationEvent = { pageNumber: nextPage, pageSize: this.paginationEvent?.pageSize ?? this.pageSize() };
    if (shouldReset) this.pageNumber.set(1);
    const state: TableStateEvent = { searchText: this.searchText, paginationEvent: this.paginationEvent, tableSortEvent: this.tableSortEvent, columnFilters: this.columnFilters };
    this.emitTableStateChanged(state);
  }

  onPageChange(event: PaginationEvent): void {
    this.paginationEvent = event;
    if (event.pageNumber != null) {
      this.pageNumber.set(event.pageNumber);
    }
    if (event.pageSize != null && event.pageSize !== this.pageSize()) {
      this.pageSize.set(event.pageSize);
    }
    const state: TableStateEvent = { searchText: this.searchText, paginationEvent: event, tableSortEvent: this.tableSortEvent, columnFilters: this.columnFilters };
    this.pageChange.emit(event);
    this.emitTableStateChanged(state);
  }

  onRetryLoad(): void {
    const state: TableStateEvent = { searchText: this.searchText, paginationEvent: this.paginationEvent, tableSortEvent: this.tableSortEvent, columnFilters: this.columnFilters };
    this.emitTableStateChanged(state);
  }

  onRowClicked(item: T): void {
    if (this.enableRowSelection()) {
      const shouldSelect = !this.isRowSelected(item);
      this.onRowSelectionChange(shouldSelect, item);
    }
    if (this.enableClickableRows()) this.rowClick.emit(item);
  }

  // Selection
  private getItemId(item: any): any {
    const key = this.rowSelectionKey();
    return key.split('.').reduce((acc, part) => acc && (acc as any)[part], item);
  }

  isRowSelected(item: any): boolean { return this.selectedIds().includes(this.getItemId(item)); }

  onRowSelectionChange(selected: boolean, item: T): void {
    const id = this.getItemId(item);
    const next = selected ? [...this.selectedIds(), id] : this.selectedIds().filter(x => x !== id);
    this.selectedIds.set(next);
    this.rowSelectionChange.emit(this.selectedIds());
    this.cdr.detectChanges();
  }

  onSelectAllRows(selected: boolean): void {
    const pageIds = this.data().map(d => this.getItemId(d as any));
    const next = selected ? Array.from(new Set([...this.selectedIds(), ...pageIds])) : this.selectedIds().filter(id => !pageIds.includes(id));
    this.selectedIds.set(next);
    this.rowSelectionChange.emit(this.selectedIds());
    this.cdr.detectChanges();
  }

  isSelectAllIndeterminate(): boolean {
    const items = this.data();
    if (!items || items.length === 0) return false;
    const ids = items.map(i => this.getItemId(i as any));
    const selectedOnPage = ids.filter(id => this.selectedIds().includes(id)).length;
    return selectedOnPage > 0 && selectedOnPage < ids.length;
  }

  // Actions
  onActionPerformed(evt: TableActionEvent) { this.action.emit(evt); }
  onActionClicked(actionKey: string, item: any, mouseEvent: MouseEvent | null) {
    if (mouseEvent) mouseEvent.stopPropagation();
    this.action.emit({ actionKey, item });
  }

  // FAB Table Actions
  toggleActionsExpanded(): void {
    this.isActionsExpanded.update(v => !v);
  }

  onTableActionClicked(action: TableAction): void {
    const selectedIds = this.selectedIds();
    const selectedItems = this.data().filter(item => selectedIds.includes(this.getItemId(item)));
    this.tableAction.emit({ actionKey: action.actionKey, item: selectedItems });
    this.isActionsExpanded.set(false);
  }

  isActionDisabled(action: TableAction): boolean {
    if (action.disabled) {
      const selectedIds = this.selectedIds();
      const selectedItems = this.data().filter(item => selectedIds.includes(this.getItemId(item)));
      return action.disabled(selectedItems);
    }
    return false;
  }

  // Columns (flatten leaves)
  allLeafColumns(): ColumnDef[] {
    const leaves: ColumnDef[] = [];
    const traverse = (node: ColumnNode) => {
      if ('children' in node) {
        node.children.forEach(traverse);
      } else {
        // Include column if visible OR explicitly marked as mobileOnly via customConfig.data.mobileOnly
        const col = node as ColumnDef as any;
        const isVisible = (col.visible ?? true) as boolean;
        const isMobileOnly = !!col?.customConfig?.data?.mobileOnly;
        if (isVisible || isMobileOnly) {
          leaves.push(node);
        }
      }
    };
    this.columnGroups().forEach(traverse);
    return leaves;
  }

  private displayColumns(): ColumnDef[] {
    // Exclude checkbox/actions and honor explicit mobile.hidden
    return this.allLeafColumns().filter(c => c.type !== 'checkbox' && c.type !== 'actions' && (c as any)?.mobile?.slot !== 'hidden');
  }

  getPrimaryColumn(): ColumnDef | null {
    const cols = this.displayColumns();
    if (cols.length === 0) return null;
    // 1) Explicit primary wins
    const explicit = cols.find(c => (c as any)?.mobile?.slot === 'primary');
    if (explicit) return explicit;
    // 2) Backward compat: prefer first text column
    const text = cols.find(c => c.type === 'text');
    return text ?? cols[0];
  }

  getDetailColumns(): ColumnDef[] {
    const primary = this.getPrimaryColumn();
    const summary = this.getMobileSummaryColumn();
    const cols = this.displayColumns();
    const explicit = cols.filter(c => (c as any)?.mobile?.slot === 'detail' && c !== primary && c !== summary)
      .sort((a, b) => (((a as any).mobile?.order ?? 0) - ((b as any).mobile?.order ?? 0)));
    const rest = cols.filter(c => c !== primary && c !== summary && !(c as any)?.mobile?.slot);
    // Return explicit details first (ordered), then all remaining non-explicit columns
    return [...explicit, ...rest];
  }

  getActionColumn(): ColumnDef | null {
    return this.allLeafColumns().find(c => c.type === 'actions') ?? null;
  }

  private applyInitialState(value: TableStateEvent): void {
    if (value) {
      this.searchText = value.searchText ?? '';
      this.paginationEvent = value.paginationEvent;
      this.tableSortEvent = value.tableSortEvent;
      if (value.tableSortEvent) {
        this.sortBy.set(value.tableSortEvent.key ?? null);
        this.sortDirection.set((value.tableSortEvent.direction as any) ?? null);
      }
      this.columnFilters = value.columnFilters ?? {};
    }
  }
  private emitTableStateChanged(state: TableStateEvent): void {
    const now = Date.now();
    if (now - this.lastStateChangeTimestamp < this.debounceTimeMs) return;
    this.lastStateChangeTimestamp = now;
    this.stateChange.emit(state);
  }

  getContextMenuActions(actions: ContextMenuActionConfig[] | ((item: any) => ContextMenuActionConfig[]) | null | undefined, item: any): ContextMenuButtonAction[] {
    let actionConfigs: ContextMenuActionConfig[] = [];
    if (typeof actions === 'function') actionConfigs = actions(item); else if (actions) actionConfigs = actions;
    return actionConfigs.map(a => ({ iconPath: a.iconPath, label: a.label, actionKey: a.actionKey }));
  }

  // Mobile-only helpers
  getMobileSummaryColumn(): ColumnDef | null {
    const cols = this.displayColumns();
    const primary = this.getPrimaryColumn();
    // 1) Explicit new API
    const explicit = cols.find(c => (c as any)?.mobile?.slot === 'summary');
    if (explicit && explicit !== primary) return explicit;
    // 2) Backward compat with previous customConfig flag
    const flagged = cols.find(c => (c as any)?.customConfig?.data?.mobileSummary === true);
    if (flagged && flagged !== primary) return flagged;
    // 3) Otherwise, no summary by default; remaining columns will appear under details
    return null;
  }

  getExpandableDetailColumns(): ColumnDef[] {
    // All display columns except the primary. Summary may also appear here.
    const primary = this.getPrimaryColumn();
    const cols = this.displayColumns();
    const explicit = cols.filter(c => (c as any)?.mobile?.slot === 'detail' && c !== primary)
      .sort((a, b) => (((a as any).mobile?.order ?? 0) - ((b as any).mobile?.order ?? 0)));
    const rest = cols.filter(c => c !== primary && (c as any)?.mobile?.slot !== 'detail');
    return [...explicit, ...rest];
  }

  hasDetailsToExpand(): boolean {
    return this.getExpandableDetailColumns().length > 0 || !!this.expandableComponent();
  }

  // No fixed header/pagination calculations needed



  // Column Filters Methods
  hasFilterConfig(): boolean {
    return this.allLeafColumns().some(column => !!column.filterConfig);
  }

  hasActiveColumnFilters(): boolean {
    return Object.keys(this.columnFilters).length > 0;
  }

  openColumnFilters(): void {
    const filterableColumns = this.allLeafColumns().filter(col => !!col.filterConfig);
    if (filterableColumns.length === 0) return;

    const data = {
      columns: filterableColumns,
      currentFilters: this.columnFilters
    };

    const openPromise = (isPlatformBrowser(this.platformId) && window.matchMedia('(max-width: 768px)').matches)
      ? this.overlayStore.openFullScreen(MobileColumnFiltersOverlay, { data, backdropOptions: { showBackdrop: true, blur: true } })
      : this.overlayStore.openSidePanelRight(MobileColumnFiltersOverlay, { widthInPx: 400, disableClose: false, data, backdropOptions: { showBackdrop: true, blur: true } });

    openPromise.then(res => {
      if (res && res.action === 'apply') {
        this.columnFilters = res.filters || {};
        this.onColumnFiltersChanged();
      }
    });
  }

  onClearColumnFilters(): void {
    this.columnFilters = {};
    this.onColumnFiltersChanged();
  }

  private onColumnFiltersChanged(): void {
    const shouldReset = this.resetPageOnQueryChange();
    const nextPage = shouldReset ? 1 : this.pageNumber();
    this.paginationEvent = {
      pageNumber: nextPage,
      pageSize: this.paginationEvent?.pageSize ?? this.pageSize()
    };
    if (shouldReset) this.pageNumber.set(1);

    const state: TableStateEvent = {
      searchText: this.searchText,
      paginationEvent: this.paginationEvent,
      tableSortEvent: this.tableSortEvent,
      columnFilters: this.columnFilters
    };

    // Emit individual filter change events
    Object.keys(this.columnFilters).forEach(key => {
      const filter = this.columnFilters[key];
      const filterEvent: FilterEvent = {
        key,
        value: filter.value,
        min: filter.min,
        max: filter.max,
        operation: filter.operation
      };
      this.filterChange.emit(filterEvent);
    });

    this.emitTableStateChanged(state);
  }

  // Touch interaction methods
  onTouchStart(event: TouchEvent): void {
    if (!this.scrollContainerEl) return;
    const scrollTop = this.scrollContainerEl.nativeElement.scrollTop;

    if (scrollTop === 0) {
      this.touchStartY = event.touches[0].clientY;
      this.isPulling = true;
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isPulling || this.isRefreshing) return;
    if (!this.scrollContainerEl) return;

    const scrollTop = this.scrollContainerEl.nativeElement.scrollTop;
    if (scrollTop > 0) {
      this.isPulling = false;
      this.pullDistance.set(0);
      return;
    }

    const touchY = event.touches[0].clientY;
    const deltaY = touchY - this.touchStartY;

    if (deltaY > 0) {
      // Prevent default scrolling when pulling down
      event.preventDefault();
      // Apply resistance to pull distance
      const resistance = 0.5;
      this.pullDistance.set(Math.min(deltaY * resistance, 100));
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isPulling) return;

    const currentPullDistance = this.pullDistance();

    if (currentPullDistance >= 80 && !this.isRefreshing) {
      this.triggerRefresh();
    } else {
      this.resetPull();
    }

    this.isPulling = false;
  }

  private triggerRefresh(): void {
    this.isRefreshing = true;
    this.pullDistance.set(80);

    // Emit state change to trigger data reload
    const state: TableStateEvent = {
      searchText: this.searchText,
      paginationEvent: this.paginationEvent,
      tableSortEvent: this.tableSortEvent,
      columnFilters: this.columnFilters
    };
    this.emitTableStateChanged(state);

    // Reset after a short delay
    setTimeout(() => {
      this.resetPull();
      this.isRefreshing = false;
    }, 1000);
  }

  private resetPull(): void {
    this.pullDistance.set(0);
  }

  toggleExpand(index: number): void {
    this.expandedRowIndex = this.expandedRowIndex === index ? -1 : index;
  }
}
