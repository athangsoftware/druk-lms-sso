import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  input,
  output,
  QueryList,
  signal,
  WritableSignal,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  OnDestroy,
  computed,
  Inject,
  PLATFORM_ID,
  model,
  linkedSignal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Pagination, PaginationEvent } from '../../../display/pagination/pagination';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DynamicRenderer } from './../dynamic-renderer';
import { ContextMenuButtonAction } from '../../../overlay/context-menu-button/context-menu-button';
import { SortableTable, TableSortEvent } from './../sortable-table';
import { ColumnDef, ColumnGroup, ColumnNode, HeaderCell, TableActionEvent, TableStateEvent, ContextMenuActionConfig, BadgeConfigProperty, FilterEvent, TableAction } from '../data-table-model';
import { SearchField } from '../../../forms/text/search-field/search-field';
import { resolveTemplateWithObject } from '../../../../core/template-resolver';
import { TableCellRenderer } from './../table-cell-renderer/table-cell-renderer';


import { TextPrefixSelectField } from '../../../forms/text/text-prefix-select-field/text-prefix-select-field';
import { NumberPrefixSelectField } from '../../../forms/number/number-prefix-select-field/number-prefix-select-field';
import { MultiSelectDropdownField } from '../../../forms/select/multi-select-dropdown-field/multi-select-dropdown-field';
import { DatePrefixSelectField } from '../../../forms/date/date-prefix-select-field/date-prefix-select-field';
import { StatusBadge } from '../../../feedback/status-badge/status-badge';
import { CheckboxField } from '../../../forms/select/checkbox-field/checkbox-field';
import { ContextMenuButton } from '../../../overlay/context-menu-button/context-menu-button';
import { Button } from '../../../forms/button/button';

interface RowSelectionEvent {
  selected: boolean;
  item: any;
}

@Component({
  selector: 'ui-desktop-data-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DynamicRenderer,
    SortableTable,
    SearchField,
    Pagination,
    TableCellRenderer,
    TextPrefixSelectField,
    NumberPrefixSelectField,
    MultiSelectDropdownField,
    DatePrefixSelectField,
    StatusBadge,
    CheckboxField,
    ContextMenuButton,
    Button
  ],
  templateUrl: './desktop-data-table.html',
  styles: [
    `
    /* Remove labels and errors from filter row controls */
    :host ::ng-deep thead th ui-base-input [data-ui-title] {
      display: none !important;
    }
    :host ::ng-deep thead th ui-base-input [data-ui-error] {
      display: none !important;
    }
    :host ::ng-deep thead th ui-text-prefix-select-field {
      width: 100%;
    }
    :host ::ng-deep thead th ui-multi-select-dropdown {
      width: 100%;
    }
    :host ::ng-deep thead th ui-date-prefix-select-field {
      width: 100%;
    }
    `
  ],
})
export class DesktopDataTable<T> implements OnInit, AfterViewInit, OnDestroy {

  @ContentChildren('filter') headerComponents!: QueryList<any>;
  @ViewChild('table', { static: false }) tableRef!: ElementRef;

  // Core Data Inputs
  columnGroups = input.required<ColumnNode[]>();
  data = input<T[]>([]);
  totalCount = input<number>(0);

  // State Integration Inputs
  isLoading = input<boolean>(false);
  hasError = input<boolean>(false);
  errorMessage = input<string | null>(null);

  // Configuration Inputs
  pageSize = model<number>(50);
  enableSearch = input<boolean>(true);

  enablePagination = input<boolean>(true);

  enableRowSelection = input<boolean>(false);
  enableClickableRows = input<boolean>(false);
  rowSelectionKey = input<string>('id');
  defaultSelectedKeys = input<any[]>([]);
  expandableComponent = input<any | null>(null);
  footerComponent = input<any | null>(null);
  enableHorizontallyScrollable = input<boolean>(true);
  initialValue = input<TableStateEvent>({ searchText: '' });
  showLoadingOnlyInitial = input<boolean>(true);

  resetPageOnQueryChange = input<boolean>(true);
  tableActions = input<TableAction[]>([]);

  // Outputs
  pageChange = output<PaginationEvent>();
  sortChange = output<TableSortEvent>();
  stateChange = output<TableStateEvent>();
  action = output<TableActionEvent>();
  rowClick = output<T>();
  rowSelectionChange = output<any[]>();
  footerAction = output<TableActionEvent>();
  tableAction = output<TableActionEvent>();

  filterChange = output<FilterEvent>();

  containerHeight = input<string | null>(null);
  pageNumber = model<number>(1);
  sortBy = model<string | null>(null);
  sortDirection = model<'asc' | 'desc' | '' | null>(null);

  // Internal Signals
  selectedIds = linkedSignal(() => {
    const enabled = this.enableRowSelection();
    const defaults = this.defaultSelectedKeys();
    if (enabled && defaults && defaults.length > 0) {
      return [...defaults];
    }
    return [];
  });

  columnGroupsSignal = linkedSignal(() => {
    const columns = this.columnGroups();
    if (columns?.length > 0) {
      return columns.map(node => this.cloneNodeWithVisibility(node));
    }
    return [];
  });

  headerHeight = signal<number>(0);
  expandedRowIndex = signal<number | null>(null);

  private _hasLocalError = signal<boolean>(false);
  private _localErrorMessage = signal<string | null>(null);

  private hasEverHadData = linkedSignal(() => {
    const dataLength = this.data().length;
    const isLoading = this.isLoading();
    return dataLength > 0 && !isLoading;
  });

  // Mobile Responsiveness
  isMobile = signal<boolean>(false);
  private mediaQueryList?: MediaQueryList;
  private updateMobile?: () => void;
  private resizeObserver?: ResizeObserver;

  // Computed States
  isInitialLoading = computed(() => {
    if (!this.showLoadingOnlyInitial()) {
      return this.isLoading();
    }
    return this.isLoading() && (
      this.data().length === 0 ||
      !this.hasEverHadData()
    );
  });

  isDataLoading = computed(() => {
    return this.showLoadingOnlyInitial() &&
      this.isLoading() &&
      this.data().length > 0 &&
      this.hasEverHadData();
  });

  isErrorState = computed(() => this.hasError() || this._hasLocalError());
  isSuccess = computed(() => !this.isLoading() && !this.isErrorState() && this.columnGroups().length > 0);

  currentState = computed(() => {
    if (!this.columnGroups() || this.columnGroups().length === 0) {
      return 'empty';
    }
    if (this.isInitialLoading()) {
      return 'initializing';
    }
    if (this.isDataLoading()) {
      return 'loading';
    }
    if (this.isErrorState()) {
      return 'error';
    }
    if (this.isSuccess() && this.data().length > 0) {
      return 'success';
    }
    return 'empty';
  });

  visibleTableActions = computed(() => {
    const actions = this.tableActions();
    const selectedIds = this.selectedIds();
    // We need the actual items for the visibility check, not just IDs
    // However, for performance, we might just pass the IDs or find the items if needed.
    // The interface says `selectedItems: any[]`.
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

  // Change Detection
  private lastStateChangeTimestamp = 0;
  private readonly debounceTimeMs = 200;
  // State Management
  paginationEvent?: PaginationEvent;
  tableSortEvent?: TableSortEvent;
  searchText: string = '';
  columnFilters: { [key: string]: { value?: any; min?: any; max?: any; operation: string } } = {};

  // Filter debouncing
  private filterChangeSubject = new Subject<{ value: any; min: any; max: any; column: ColumnDef }>();
  private filterSubscription?: any;

  constructor(private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: Object) {
    // Set up filter debouncing
    this.filterSubscription = this.filterChangeSubject.pipe(
      debounceTime(700)
    ).subscribe(({ value, min, max, column }) => {
      this.processFilterChange(value, min, max, column);
    });

    // Track data changes and clear errors when data loads successfully
    let previousDataLength = 0;
    const dataTracker = linkedSignal(() => {
      const dataLength = this.data().length;
      const isLoading = this.isLoading();

      if (dataLength !== previousDataLength && !isLoading) {
        previousDataLength = dataLength;
        this.clearLocalError();
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
      const tableStateEvent: TableStateEvent = {
        searchText: this.searchText,
        paginationEvent: {
          pageNumber: nextPage,
          pageSize: this.paginationEvent?.pageSize ?? this.pageSize()
        },
        tableSortEvent: this.tableSortEvent,
        columnFilters: this.columnFilters
      };
      if (shouldReset) this.pageNumber.set(1);
      this.emitTableStateChanged(tableStateEvent);

      return { key, dir };
    });

    if (isPlatformBrowser(this.platformId)) {
      this.mediaQueryList = window.matchMedia('(max-width: 768px)');
      this.updateMobile = () => this.isMobile.set(this.mediaQueryList!.matches);
      this.updateMobile();
      this.mediaQueryList.addEventListener('change', this.updateMobile);
    } else {
      this.isMobile.set(false);
    }
  }

  ngOnInit(): void {
    const initialValue = this.initialValue();
    if (initialValue) {
      this.applyInitialState(initialValue);
    }
  }

  ngAfterViewInit(): void {
    if (this.sortBy() != null || this.sortDirection() != null) {
      this.tableSortEvent = { key: this.sortBy() ?? undefined, direction: this.sortDirection() ?? undefined };
    }
    this.paginationEvent = {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
    };
    this.pageChange.emit(this.paginationEvent);

    const tableStateEvent: TableStateEvent = {
      searchText: '',
      paginationEvent: this.paginationEvent,
      tableSortEvent: this.tableSortEvent,
      columnFilters: this.columnFilters
    };

    this.allLeafColumns().forEach(column => {
      if (column.filterConfig) {
        const filterKey = this.getFilterKey(column);
        if (!this.columnFilters[filterKey]?.value) {
          this.columnFilters[filterKey] = {
            value: column.filterConfig.type === 'select' ? [] : undefined,
            operation: this.columnFilters[filterKey]?.operation ?? this.getDefaultOperation(column.filterConfig.type),
          };
        }
      }
    });

    // Initial header height calculation
    this.updateHeaderHeight();

    // Recalculate header height after filter controls render
    setTimeout(() => {
      this.updateHeaderHeight();
      this.cdr.detectChanges();
    }, 0);

    // Additional recalculation after a longer delay to catch any async rendering
    setTimeout(() => {
      this.updateHeaderHeight();
      this.cdr.detectChanges();
    }, 100);

    // Set up ResizeObserver to watch for layout changes
    if (isPlatformBrowser(this.platformId) && this.tableRef) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateHeaderHeight();
      });
      this.resizeObserver.observe(this.tableRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.mediaQueryList && this.updateMobile) {
      this.mediaQueryList.removeEventListener('change', this.updateMobile);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  // State Management
  private setLocalError(error: string): void {
    this._hasLocalError.set(true);
    this._localErrorMessage.set(error);
  }

  private clearLocalError(): void {
    this._hasLocalError.set(false);
    this._localErrorMessage.set(null);
  }

  private applyInitialState(value: TableStateEvent): void {
    if (value) {

      this.paginationEvent = value.paginationEvent;
      if (value.paginationEvent?.pageSize != null) {
        this.pageSize.set(value.paginationEvent.pageSize);
      }
      if (value.paginationEvent?.pageNumber != null) {
        this.pageNumber.set(value.paginationEvent.pageNumber);
      }
      this.tableSortEvent = value.tableSortEvent;
      if (value.tableSortEvent) {
        this.sortBy.set(value.tableSortEvent.key ?? null);
        this.sortDirection.set((value.tableSortEvent.direction as any) ?? null);
      }
      this.columnFilters = value.columnFilters ?? {};
    }
  }

  private emitTableStateChanged(tableStateEvent: TableStateEvent): void {
    const now = Date.now();
    if (now - this.lastStateChangeTimestamp < this.debounceTimeMs) {
      return;
    }
    this.lastStateChangeTimestamp = now;
    this.stateChange.emit(tableStateEvent);
  }

  // Event Handlers



  onSearchTextChanged(event: string | any): void {
    this.searchText = event;
    const shouldReset = this.resetPageOnQueryChange();
    const nextPage = shouldReset ? 1 : this.pageNumber();
    this.paginationEvent = {
      pageNumber: nextPage,
      pageSize: this.paginationEvent?.pageSize ?? this.pageSize()
    };
    if (shouldReset) this.pageNumber.set(1);

    const tableStateEvent: TableStateEvent = {
      searchText: this.searchText,
      paginationEvent: this.paginationEvent,
      tableSortEvent: this.tableSortEvent,
      columnFilters: this.columnFilters
    };

    this.emitTableStateChanged(tableStateEvent);
  }
  onPageChange(event: PaginationEvent): void {
    this.paginationEvent = event;
    if (event.pageNumber != null) {
      this.pageNumber.set(event.pageNumber);
    }
    if (event.pageSize != null && event.pageSize !== this.pageSize()) {
      this.pageSize.set(event.pageSize);
    }
    const tableStateEvent: TableStateEvent = {
      searchText: '',
      paginationEvent: event,
      tableSortEvent: this.tableSortEvent,
      columnFilters: this.columnFilters
    };

    this.pageChange.emit(event);
    this.emitTableStateChanged(tableStateEvent);
  }

  onSortChanged(event: TableSortEvent): void {
    this.tableSortEvent = event;
    this.sortBy.set(event.key ?? null);
    this.sortDirection.set((event.direction as any) ?? null);
    const shouldReset = this.resetPageOnQueryChange();
    const nextPage = shouldReset ? 1 : this.pageNumber();
    const tableStateEvent: TableStateEvent = {
      searchText: this.searchText,
      paginationEvent: {
        pageNumber: nextPage,
        pageSize: this.paginationEvent?.pageSize ?? this.pageSize()
      },
      tableSortEvent: event,
      columnFilters: this.columnFilters
    };
    if (shouldReset) this.pageNumber.set(1);

    this.sortChange.emit(event);
    this.emitTableStateChanged(tableStateEvent);
  }



  onClearSearch(): void {
    this.searchText = '';
    const shouldReset = this.resetPageOnQueryChange();
    const nextPage = shouldReset ? 1 : this.pageNumber();
    this.paginationEvent = {
      pageNumber: nextPage,
      pageSize: this.pageSize()
    };
    if (shouldReset) this.pageNumber.set(1);

    const tableStateEvent: TableStateEvent = {
      searchText: '',
      paginationEvent: this.paginationEvent,
      tableSortEvent: this.tableSortEvent,
      columnFilters: this.columnFilters
    };

    this.emitTableStateChanged(tableStateEvent);
  }

  onRetryLoad(): void {
    const tableStateEvent: TableStateEvent = {
      searchText: this.searchText,
      paginationEvent: this.paginationEvent,
      tableSortEvent: this.tableSortEvent,
      columnFilters: this.columnFilters
    };
    this.emitTableStateChanged(tableStateEvent);
  }

  onFiltersChanged(): void {
    const tableStateEvent: TableStateEvent = {
      searchText: this.searchText,
      paginationEvent: this.paginationEvent,
      tableSortEvent: this.tableSortEvent,
      columnFilters: this.columnFilters
    };
    this.emitTableStateChanged(tableStateEvent);
  }

  onFilterChanged(value: any, min: any, max: any, column: ColumnDef): void {
    // Push to debounce subject instead of processing immediately
    this.filterChangeSubject.next({ value, min, max, column });
  }

  private processFilterChange(value: any, min: any, max: any, column: ColumnDef): void {
    const filterKey = this.getFilterKey(column);
    if (!filterKey) {
      return;
    }
    const existingFilter = this.columnFilters[filterKey] || {
      operation: this.getDefaultOperation(column.filterConfig?.type),
    };
    const operation = existingFilter.operation;

    // Handle Between Value from Component (ui-number-prefix-select-field emits {from, to})
    if (operation === 'between' && value && typeof value === 'object' && ('from' in value || 'to' in value)) {
      min = value.from;
      max = value.to;
      value = null;
    }

    // Handle Date Range Value
    if (operation === 'between' && value && typeof value === 'object' && ('startDate' in value || 'endDate' in value)) {
      min = value.startDate;
      max = value.endDate;
      value = null;
    }

    let parsedValue = this.parseFilterValue(value, column.filterConfig?.type);
    let parsedMin = this.parseFilterValue(min, column.filterConfig?.type);
    let parsedMax = this.parseFilterValue(max, column.filterConfig?.type);

    if (operation === 'between') {
      if (parsedMin != null || parsedMax != null) {
        this.columnFilters[filterKey] = { min: parsedMin, max: parsedMax, operation };
      } else {
        this.columnFilters[filterKey] = { min: undefined, max: undefined, operation };
      }
    } else {
      if (parsedValue && (Array.isArray(parsedValue) ? parsedValue.length > 0 : true)) {
        this.columnFilters[filterKey] = { value: parsedValue, operation };
      } else {
        this.columnFilters[filterKey] = { value: undefined, operation };
      }
    }

    const filterEvent: FilterEvent = (operation === 'between')
      ? { key: filterKey, min: parsedMin, max: parsedMax, operation }
      : { key: filterKey, value: parsedValue, operation };
    this.filterChange.emit(filterEvent);

    const shouldReset = this.resetPageOnQueryChange();
    const nextPage = shouldReset ? 1 : this.pageNumber();
    this.paginationEvent = {
      pageNumber: nextPage,
      pageSize: this.paginationEvent?.pageSize ?? this.pageSize(),
    };
    if (shouldReset) this.pageNumber.set(1);

    const tableStateEvent: TableStateEvent = {
      searchText: this.searchText,
      paginationEvent: this.paginationEvent,
      tableSortEvent: this.tableSortEvent,
      columnFilters: { ...this.columnFilters },
    };
    this.emitTableStateChanged(tableStateEvent);
  }

  onFilterOperationChanged(operation: string, column: ColumnDef): void {
    const filterKey = this.getFilterKey(column);
    if (!filterKey) {
      return;
    }

    // Update the operation in the local state
    if (!this.columnFilters[filterKey]) {
      this.columnFilters[filterKey] = {
        value: undefined,
        min: undefined,
        max: undefined,
        operation: operation
      };
    } else {
      this.columnFilters[filterKey].operation = operation;
      // We don't necessarily need to clear values here as the component handles it,
      // but clearing ensures consistency in the internal state
      this.columnFilters[filterKey].value = undefined;
      this.columnFilters[filterKey].min = undefined;
      this.columnFilters[filterKey].max = undefined;
    }

    // If we have controls, we might want to reset them, but the component 
    // (ui-number-prefix-select-field) typically handles clearing values on prefix change.
    // We'll just ensure the internal state is consistent.

    const filterEvent: FilterEvent = {
      key: filterKey,
      value: undefined,
      min: undefined,
      max: undefined,
      operation
    };
    this.filterChange.emit(filterEvent);

    const shouldReset = this.resetPageOnQueryChange();
    const nextPage = shouldReset ? 1 : this.pageNumber();
    this.paginationEvent = {
      pageNumber: nextPage,
      pageSize: this.paginationEvent?.pageSize ?? this.pageSize()
    };
    if (shouldReset) this.pageNumber.set(1);

    const tableStateEvent: TableStateEvent = {
      searchText: this.searchText,
      paginationEvent: this.paginationEvent,
      tableSortEvent: this.tableSortEvent,
      columnFilters: { ...this.columnFilters }
    };
    this.emitTableStateChanged(tableStateEvent);
  }



  // Row Selection Methods
  onRowSelectionChange(selected: boolean, item: T): void {
    const id = this.getItemId(item);
    let updatedIds: any[];
    if (selected) {
      updatedIds = [...this.selectedIds(), id];
    } else {
      updatedIds = this.selectedIds().filter(selectedId => selectedId !== id);
    }
    this.selectedIds.set(updatedIds);
    this.rowSelectionChange.emit(this.selectedIds());
    this.cdr.detectChanges();
  }

  onSelectAllRows(selected: boolean): void {
    let updatedIds: any[];
    if (selected) {
      const newIds = this.data().map((item: any) => this.getItemId(item)).filter((id: any) => !this.selectedIds().includes(id));
      updatedIds = [...this.selectedIds(), ...newIds];
    } else {
      const currentPageIds = this.data().map((item: any) => this.getItemId(item));
      updatedIds = this.selectedIds().filter(id => !currentPageIds.includes(id));
    }
    this.selectedIds.set(updatedIds);
    this.rowSelectionChange.emit(this.selectedIds());
    this.cdr.detectChanges();
  }

  isSelectAllIndeterminate(): boolean {
    const items = this.data();
    if (!items || items.length === 0) return false;
    const pageIds = items.map((item: any) => this.getItemId(item));
    const selectedOnPage = pageIds.filter(id => this.selectedIds().includes(id)).length;
    return selectedOnPage > 0 && selectedOnPage < pageIds.length;
  }

  isRowSelected(item: any): boolean {
    const id = this.getItemId(item);
    return this.selectedIds().includes(id);
  }

  getItemId(item: any): any {
    const key = this.rowSelectionKey();
    return key.split('.').reduce((acc, part) => acc && acc[part], item);
  }

  isAllSelected(): boolean {
    if (this.data().length === 0) return false;
    return this.data().every((item: any) => this.isRowSelected(item));
  }

  // Row Actions
  onRowClicked(item: T): void {
    this.rowClick.emit(item);
  }

  onRowExpandedClicked(i: number): void {
    this.expandedRowIndex.set(this.expandedRowIndex() === i ? null : i);
  }

  onActionPerformed(event: TableActionEvent): void {
    this.action.emit(event);
  }

  onActionClicked(actionKey: string, item: any, mouseEvent: MouseEvent | null): void {
    if (mouseEvent) {
      mouseEvent.stopPropagation();
    }
    this.action.emit({ actionKey, item });
  }

  // Alignment Helpers
  getColumnAlignmentClass(column: ColumnDef): string {
    switch (column.alignment) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  }

  getHeaderAlignmentClass(column: ColumnNode): string {
    const align = (column as any).alignment;
    switch (align) {
      case 'center': return 'justify-center';
      case 'right': return 'justify-end';
      default: return 'justify-start';
    }
  }

  onCellActionPerformed(event: TableActionEvent): void {
    this.action.emit(event);
  }

  onRowActionPerformed(event: TableActionEvent): void {
    this.action.emit(event);
  }

  onFooterActionPerformed(event: TableActionEvent): void {
    this.footerAction.emit(event);
  }

  onTableActionClicked(action: TableAction): void {
    const selectedIds = this.selectedIds();
    const selectedItems = this.data().filter(item => selectedIds.includes(this.getItemId(item)));

    // Check if disabled
    if (action.disabled && action.disabled(selectedItems)) {
      return;
    }

    this.tableAction.emit({
      actionKey: action.actionKey,
      item: selectedItems // Pass selected items as the item payload for table actions
    });
  }

  isActionDisabled(action: TableAction): boolean {
    if (!action.disabled) return false;
    const selectedIds = this.selectedIds();
    const selectedItems = this.data().filter(item => selectedIds.includes(this.getItemId(item)));
    return action.disabled(selectedItems);
  }

  // Data Processing
  getPropertyValue(item: any, column: ColumnDef): any {
    if (column.displayTemplate) {
      return resolveTemplateWithObject(item, column.displayTemplate);
    }
    let value = '';
    if (column.key) {
      value = column.key.split('.').reduce((acc, part) => acc && acc[part], item);
    }
    if (column.formatter) {
      return column.formatter(value);
    } else if (column.objectFormatter) {
      return column.objectFormatter(item);
    } else {
      return value;
    }
  }

  getBadgeProperty(item: any, column: ColumnDef): BadgeConfigProperty | null {
    const badgeConfigProperties = column.badgeConfig?.properties ?? [];
    let matchedBadgeConfigProperty: BadgeConfigProperty | null = null;
    const value = this.getPropertyValue(item, column);
    badgeConfigProperties.forEach(badgeConfigProperty => {
      if (value === badgeConfigProperty.data) {
        matchedBadgeConfigProperty = badgeConfigProperty;
      }
    });
    return matchedBadgeConfigProperty;
  }

  getContextMenuActions(actions: ContextMenuActionConfig[] | ((item: any) => ContextMenuActionConfig[]) | null | undefined, item: any): ContextMenuButtonAction[] {
    let actionConfigs: ContextMenuActionConfig[] = [];
    if (typeof actions === 'function') {
      actionConfigs = actions(item);
    } else if (actions) {
      actionConfigs = actions;
    }
    return actionConfigs.map(action => ({
      iconPath: action.iconPath,
      label: action.label,
      actionKey: action.actionKey
    }));
  }

  // Header Processing
  getMaxDepth(): number {
    const nodes = this.columnGroupsSignal();
    let max = 1;
    const recurse = (node: ColumnNode, depth: number) => {
      if ('children' in node && node.children.length > 0) {
        node.children.forEach(child => recurse(child, depth + 1));
      } else {
        max = Math.max(max, depth);
      }
    };
    nodes.forEach(node => recurse(node, 1));
    return max;
  }

  getHeaderLevels(): number[] {
    return Array.from({ length: this.getMaxDepth() }, (_, i) => i);
  }

  allLeafColumns(): ColumnDef[] {
    const leaves: ColumnDef[] = [];
    const traverse = (node: ColumnNode) => {
      if ('children' in node) {
        node.children.forEach(traverse);
      } else if (node.visible ?? true) {
        leaves.push(node);
      }
    };
    this.columnGroupsSignal().forEach(traverse);
    return leaves;
  }

  private getLeafCount(node: ColumnNode): number {
    if (!('children' in node)) return (node.visible ?? true) ? 1 : 0;
    return node.children.reduce((sum, child) => sum + this.getLeafCount(child), 0);
  }

  getHeaderCellsAtLevel(level: number): HeaderCell[] {
    const cells: HeaderCell[] = [];
    const maxDepth = this.getMaxDepth();
    const traverse = (node: ColumnNode, currentLevel: number) => {
      if (currentLevel === level) {
        const isGroup = 'children' in node;
        const colspan = this.getLeafCount(node);
        let rowspan = 1;
        if (!isGroup) {
          rowspan = maxDepth - currentLevel;
        }
        if (colspan > 0) {
          cells.push({
            title: node.title,
            colspan,
            rowspan,
            node,
            sortKey: isGroup ? undefined : node.sortKey,
            alignment: node.alignment
          });
        }
      } else if ('children' in node) {
        node.children.forEach(child => traverse(child, currentLevel + 1));
      }
    };
    this.columnGroupsSignal().forEach(node => traverse(node, 0));
    return cells;
  }

  isColumnGroup(node: ColumnNode): node is ColumnGroup {
    return 'children' in node;
  }

  getHeaderRowSpan(): number {
    return this.getMaxDepth();
  }

  getTotalColspan(): number {
    return this.allLeafColumns().length + (this.enableRowSelection() ? 1 : 0) + (this.expandableComponent() ? 1 : 0);
  }

  // Styling & Layout - FIXED FILTER CELL CLASS
  getCellClass(column: ColumnDef): string {
    let classes = this.getAlignmentClass(column);

    if (column.type === 'actions') {
      classes += ' sticky right-0 z-[40] bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.1)] border-l-2 border-gray-300 w-32 min-w-[128px] max-w-[128px]';
    } else {
      classes += ' ' + this.getColumnWidthClass(column);
    }

    return classes;
  }

  getHeaderThClass(cell: HeaderCell): string {
    let classes = this.getAlignmentClass(cell.node);

    if (!this.isColumnGroup(cell.node) && (cell.node as ColumnDef).type === 'actions') {
      classes += ' sticky right-0 z-[110] bg-gray-100 shadow-[-2px_0_4px_rgba(0,0,0,0.1)] border-l border-gray-300 w-32 min-w-[128px] max-w-[128px]';
    } else {
      classes += ' ' + this.getColumnWidthClass(cell.node);
    }

    if (this.isColumnGroup(cell.node) && cell.colspan > 1) {
      classes += ' border-r border-gray-300';
    }

    return classes;
  }

  private getAlignmentClass(node: ColumnNode): string {
    const alignment = node.alignment;
    switch (alignment) {
      case 'left': return 'text-left';
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  }

  getFlexJustifyClass(cell: HeaderCell): string {
    const alignment = cell.node.alignment;
    switch (alignment) {
      case 'left': return 'justify-start';
      case 'center': return 'justify-center';
      case 'right': return 'justify-end';
      default: return 'justify-start';
    }
  }

  getFlexJustify(column: ColumnDef): string {
    switch (column.alignment) {
      case 'left': return 'justify-start';
      case 'center': return 'justify-center';
      case 'right': return 'justify-end';
      default: return 'justify-start';
    }
  }

  getColumnWidthClass(node: ColumnNode): string {
    if ('children' in node) return '';

    const column = node as ColumnDef;
    switch (column.type) {
      case 'checkbox': return 'w-12 min-w-[48px] max-w-[48px]';
      case 'actions': return 'w-32 min-w-[128px] max-w-[128px]';
      default:
        // For columns with filters, allow dynamic width with reasonable constraints
        if (column.filterConfig) {
          return 'min-w-[200px] max-w-[400px]';
        }
        // For columns without filters, use smaller default
        return 'w-40 min-w-[160px] max-w-[300px]';
    }
  }

  // FIXED: Filter cell class with dynamic width based on content
  getFilterCellClass(column: ColumnDef): string {
    let classes = '';

    // Add width and position classes
    if (column.type === 'actions') {
      classes += 'sticky right-0 z-[40] bg-gray-50 shadow-[-2px_0_4px_rgba(0,0,0,0.1)] border-l-2 border-gray-300 w-32 min-w-[128px] max-w-[128px]';
    } else if (column.type === 'checkbox') {
      classes += 'w-12 min-w-[48px] max-w-[48px]';
    } else {
      // Use same width class as column for consistency
      const widthClass = this.getColumnWidthClass(column);
      classes += widthClass;
    }

    return classes;
  }

  // New method for filter content alignment within the wrapper div
  getFilterContentAlignmentClass(column: ColumnDef): string {
    switch (column.alignment) {
      case 'center':
        return 'flex justify-center items-center';
      case 'right':
        return 'flex justify-end items-center';
      default:
        return 'flex justify-start items-center';
    }
  }

  private updateHeaderHeight(): void {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.tableRef && this.tableRef.nativeElement) {
      try {
        const thead = this.tableRef.nativeElement.querySelector('thead');
        if (thead && typeof thead.getBoundingClientRect === 'function') {
          // Get the actual rendered height of the entire thead element
          const height = thead.getBoundingClientRect().height;
          this.headerHeight.set(height);
        }
      } catch (error) {
        // Silent fail - header height calculation is not critical
      }
    }
  }

  getHeaderHeight(): number {
    return this.headerHeight();
  }

  hasActionColumn(): boolean {
    return this.allLeafColumns().some(col => col.type === 'actions');
  }

  getColumnTitle(column: ColumnDef): string {
    return column.title;
  }

  getState(): 'initializing' | 'loading' | 'success' | 'error' | 'empty' {
    return this.currentState();
  }

  getErrorMessage(): string | null {
    return this.errorMessage() || this._localErrorMessage();
  }

  private cloneNodeWithVisibility(node: ColumnNode): ColumnNode {
    if ('children' in node) {
      return {
        ...node,
        children: node.children.map(child => this.cloneNodeWithVisibility(child))
      };
    } else {
      return {
        ...node,
        visible: node.visible ?? true
      };
    }
  }

  getAriaSort(sortKey?: string): 'ascending' | 'descending' | 'none' {
    if (!sortKey || !this.tableSortEvent || !this.tableSortEvent.key) return 'none';
    if (this.tableSortEvent.key === sortKey) {
      const dir = (this.tableSortEvent.direction || '').toString();
      if (dir === 'asc') return 'ascending';
      if (dir === 'desc') return 'descending';
    }
    return 'none';
  }

  // Filter Helper Methods
  hasFilterConfig(): boolean {
    return this.allLeafColumns().some(column => !!column.filterConfig);
  }

  getFilterKey(column: ColumnDef): string {
    return column.key || column.sortKey || (column.displayTemplate?.replace(/^\$/, '') || '');
  }

  getFilterValue(column: ColumnDef, property: 'min' | 'max' | 'value'): any {
    const filterKey = this.getFilterKey(column);
    const value = this.columnFilters[filterKey]?.[property];
    // Return null for undefined values to prevent "undefined" text in inputs
    if (value === undefined) {
      return column.filterConfig?.type === 'select' ? [] : null;
    }
    return value;
  }

  getDefaultOperation(type?: string): string {
    switch (type) {
      case 'text':
        return 'contains';
      case 'number':
      case 'date':
        return 'equals';
      case 'select':
        return 'equals';
      default:
        return 'contains';
    }
  }

  private readonly FILTER_OPERATIONS = {
    text: [
      { value: 'contains', label: '⊇', fullName: 'Contains', isRange: false },
      { value: 'exact', label: '≡', fullName: 'Exact', isRange: false }
    ],
    number: [
      { value: 'greaterThan', label: '>', fullName: 'Greater Than', isRange: false },
      { value: 'greaterThanOrEqual', label: '≥', fullName: 'Greater Than or Equal', isRange: false },
      { value: 'lesserThan', label: '<', fullName: 'Lesser Than', isRange: false },
      { value: 'lesserThanOrEqual', label: '≤', fullName: 'Lesser Than or Equal', isRange: false },
      { value: 'equals', label: '=', fullName: 'Equals', isRange: false },
      { value: 'notEqual', label: '≠', fullName: 'Not Equal', isRange: false },
      { value: 'between', label: '↔', fullName: 'Between', isRange: true },
    ],
    date: [
      { value: 'equals', label: '=', fullName: 'Equal', isRange: false },
      { value: 'lesserThan', label: '<', fullName: 'Lesser Than', isRange: false },
      { value: 'lesserThanOrEqual', label: '≤', fullName: 'Lesser Than or Equal', isRange: false },
      { value: 'greaterThan', label: '>', fullName: 'Greater Than', isRange: false },
      { value: 'greaterThanOrEqual', label: '≥', fullName: 'Greater Than or Equal', isRange: false },
      { value: 'between', label: '↔', fullName: 'Between', isRange: true }
    ],
    select: [
      { value: 'equals', label: '=', fullName: 'Equals', isRange: false },
      { value: 'notEqual', label: '≠', fullName: 'Not Equal', isRange: false }
    ]
  };

  getFilterOperations(type?: string): { value: string; label: string; isRange: boolean }[] {
    return this.FILTER_OPERATIONS[type as keyof typeof this.FILTER_OPERATIONS] || [];
  }

  private parseFilterValue(value: any, type?: string): any {
    if (type === 'select') {
      if (Array.isArray(value)) {
        return value.map(v => typeof v === 'string' ? v : v?.value).filter(Boolean);
      } else if (value) {
        return [typeof value === 'string' ? value : value?.value].filter(Boolean);
      } else {
        return [];
      }
    } else if (type === 'date') {
      const parsed = value ? new Date(value) : null;
      return this.isValidDate(parsed) ? parsed : null;
    }
    return value;
  }

  private isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
}