import { computed } from '@angular/core';
import { Injectable } from '@angular/core';
import { RouteParam, TableStateEvent } from '@projects/shared-lib';

export interface ClientListParams {
  page: number;
  pageSize: number;
  search: string;
  sortKey: string;
  sortDir: string;
  name: string;
  nameOp: string;
  clientId: string;
  clientIdOp: string;
  clientType: string;
}

@Injectable()
export class ClientListStore extends RouteParam<ClientListParams> {
  protected override getDefaultParams(): ClientListParams {
    return {
      page: 1,
      pageSize: 20,
      search: '',
      sortKey: 'name',
      sortDir: 'asc',
      name: '',
      nameOp: 'contains',
      clientId: '',
      clientIdOp: 'contains',
      clientType: '',
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
        clientId: { operation: p.clientIdOp || 'contains', value: p.clientId },
        clientType: { operation: 'exact', value: p.clientType ? [p.clientType] : [] },
      },
    };
  });

  updateFromTableState(event: TableStateEvent) {
    this.updateParams({
      page: event.paginationEvent?.pageNumber ?? 1,
      pageSize: event.paginationEvent?.pageSize ?? 20,
      search: event.searchText ?? '',
      sortKey: event.tableSortEvent?.key ?? 'name',
      sortDir: event.tableSortEvent?.direction ?? 'asc',
      name: event.columnFilters?.['name']?.value ?? '',
      nameOp: event.columnFilters?.['name']?.operation ?? 'contains',
      clientId: event.columnFilters?.['clientId']?.value ?? '',
      clientIdOp: event.columnFilters?.['clientId']?.operation ?? 'contains',
      clientType: Array.isArray(event.columnFilters?.['clientType']?.value)
        ? event.columnFilters!['clientType'].value[0] ?? ''
        : (event.columnFilters?.['clientType']?.value ?? ''),
    });
  }
}
