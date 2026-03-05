
import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID, TemplateRef, input, output, signal, model } from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { MobileDataTable } from './mobile-data-table/mobile-data-table';
import { PaginationEvent } from '../pagination/pagination';
import { TableSortEvent } from './sortable-table';

import { DesktopDataTable } from './desktop-data-table/desktop-data-table';
import { ColumnNode, TableActionEvent, TableStateEvent, FilterEvent, TableAction } from './data-table-model';

@Component({
  selector: 'ui-data-table',
  standalone: true,
  imports: [DesktopDataTable, MobileDataTable, NgTemplateOutlet],
  templateUrl: './data-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'block w-full max-w-full overflow-x-hidden' }
})
export class DataTable<T> {
  // Mirror DataTable API
  columnGroups = input.required<ColumnNode[]>();
  data = input<T[]>([]);
  totalCount = input<number>(0);

  isLoading = input<boolean>(false);
  hasError = input<boolean>(false);
  errorMessage = input<string | null>(null);

  pageSize = model<number>(50);
  // New: two-way sortable state models
  sortBy = model<string | null>(null);
  sortDirection = model<'asc' | 'desc' | '' | null>(null);
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
  // Optional fixed container height (used by dialogs or constrained layouts)
  containerHeight = input<string | null>(null);

  tableActions = input<TableAction[]>([]);

  // Projected filters support


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


  isMobile = signal(false);
  // Expose pageNumber for parent; propagate to underlying table components
  pageNumber = model<number>(1);

  private mediaQueryList?: MediaQueryList;
  private updateMobile?: () => void;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this.mediaQueryList = window.matchMedia('(max-width: 768px)'); // align with Nav breakpoint
      this.updateMobile = () => this.isMobile.set(this.mediaQueryList!.matches);
      this.updateMobile();
      this.mediaQueryList.addEventListener('change', this.updateMobile);
    }
  }


}
