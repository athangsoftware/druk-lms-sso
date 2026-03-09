import { computed } from '@angular/core';
import { Injectable } from '@angular/core';
import { RouteParam, TableStateEvent } from '@projects/shared-lib';

export interface IdentityProviderListParams {
  page: number;
  pageSize: number;
  search: string;
  sortKey: string;
  sortDir: string;
  name: string;
  nameOp: string;
  slug: string;
  slugOp: string;
  type: string;
  isEnabled: string;
}

@Injectable()
export class IdentityProviderListStore extends RouteParam<IdentityProviderListParams> {
  protected override getDefaultParams(): IdentityProviderListParams {
    return {
      page: 1,
      pageSize: 20,
      search: '',
      sortKey: 'displayOrder',
      sortDir: 'asc',
      name: '',
      nameOp: 'contains',
      slug: '',
      slugOp: 'contains',
      type: '',
      isEnabled: '',
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
      columnFilters: {
        name: { operation: p.nameOp || 'contains', value: p.name },
        slug: { operation: p.slugOp || 'contains', value: p.slug },
        type: { operation: 'exact', value: p.type ? [p.type] : [] },
        isEnabled: { operation: 'exact', value: p.isEnabled ? [p.isEnabled] : [] },
      },
    };
  });

  updateFromTableState(event: TableStateEvent) {
    this.updateParams({
      page: event.paginationEvent?.pageNumber ?? 1,
      pageSize: event.paginationEvent?.pageSize ?? 20,
      search: event.searchText ?? '',
      sortKey: event.tableSortEvent?.key ?? 'displayOrder',
      sortDir: event.tableSortEvent?.direction ?? 'asc',
      name: event.columnFilters?.['name']?.value ?? '',
      nameOp: event.columnFilters?.['name']?.operation ?? 'contains',
      slug: event.columnFilters?.['slug']?.value ?? '',
      slugOp: event.columnFilters?.['slug']?.operation ?? 'contains',
      type: Array.isArray(event.columnFilters?.['type']?.value)
        ? event.columnFilters!['type'].value[0] ?? ''
        : (event.columnFilters?.['type']?.value ?? ''),
      isEnabled: Array.isArray(event.columnFilters?.['isEnabled']?.value)
        ? event.columnFilters!['isEnabled'].value[0] ?? ''
        : (event.columnFilters?.['isEnabled']?.value ?? ''),
    });
  }
}
