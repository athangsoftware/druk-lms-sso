import { computed } from '@angular/core';
import { Injectable } from '@angular/core';
import { RouteParam, TableStateEvent } from '@projects/shared-lib';

export interface UserRolesParams {
  page: number;
  pageSize: number;
  search: string;
  sortKey: string;
  sortDir: string;
}

@Injectable()
export class UserRolesStore extends RouteParam<UserRolesParams> {
  protected override getDefaultParams(): UserRolesParams {
    return {
      page: 1,
      pageSize: 20,
      search: '',
      sortKey: 'firstName',
      sortDir: 'asc',
    };
  }

  readonly tableState = computed<TableStateEvent>(() => {
    const p = this.params();
    return {
      paginationEvent: {
        pageNumber: Number(p.page) || 1,
        pageSize: Number(p.pageSize) || 20,
      },
      searchText: p.search,
      tableSortEvent: {
        key: p.sortKey,
        direction: (p.sortDir as 'asc' | 'desc') || 'asc',
      },
      columnFilters: {},
    };
  });

  updateFromTableState(event: TableStateEvent) {
    this.updateParams({
      page: event.paginationEvent?.pageNumber ?? 1,
      pageSize: event.paginationEvent?.pageSize ?? 20,
      search: event.searchText ?? '',
      sortKey: event.tableSortEvent?.key ?? 'firstName',
      sortDir: event.tableSortEvent?.direction ?? 'asc',
    });
  }
}
