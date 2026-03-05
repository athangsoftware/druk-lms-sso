import { computed } from '@angular/core';
import { Injectable } from '@angular/core';
import { RouteParam } from '@projects/shared-lib';
import { TableStateEvent } from '@projects/shared-lib';

export interface UserListParams {
  page: number;
  pageSize: number;
  search: string;
  sortKey: string;
  sortDir: string;
  firstName: string;
  firstNameOp: string;
  lastName: string;
  lastNameOp: string;
  email: string;
  emailOp: string;
  roleId: string;
  roleIdOp: string;
  phoneNumber: string;
  phoneNumberOp: string;
  isActive: string;
}

@Injectable()
export class UserListStore extends RouteParam<UserListParams> {
  protected override getDefaultParams(): UserListParams {
    return {
      page: 1,
      pageSize: 20,
      search: '',
      sortKey: 'firstName',
      sortDir: 'asc',
      firstName: '',
      firstNameOp: 'contains',
      lastName: '',
      lastNameOp: 'contains',
      email: '',
      emailOp: 'contains',
      roleId: '',
      roleIdOp: 'contains',
      phoneNumber: '',
      phoneNumberOp: 'contains',
      isActive: '',
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
        firstName: { operation: p.firstNameOp || 'contains', value: p.firstName },
        lastName: { operation: p.lastNameOp || 'contains', value: p.lastName },
        email: { operation: p.emailOp || 'contains', value: p.email },
        roleId: { operation: 'exact', value: p.roleId ? p.roleId.split(',').filter(Boolean) : [] },
        phoneNumber: { operation: p.phoneNumberOp || 'contains', value: p.phoneNumber },
        isActive: { operation: 'equals', value: p.isActive ? [p.isActive] : [] },
      },
    };
  });

  updateFromTableState(event: TableStateEvent) {
    this.updateParams({
      page: event.paginationEvent?.pageNumber ?? 1,
      pageSize: event.paginationEvent?.pageSize ?? 20,
      search: event.searchText ?? '',
      sortKey: event.tableSortEvent?.key ?? 'firstName',
      sortDir: event.tableSortEvent?.direction ?? 'asc',
      firstName: event.columnFilters?.['firstName']?.value ?? '',
      firstNameOp: event.columnFilters?.['firstName']?.operation ?? 'contains',
      lastName: event.columnFilters?.['lastName']?.value ?? '',
      lastNameOp: event.columnFilters?.['lastName']?.operation ?? 'contains',
      email: event.columnFilters?.['email']?.value ?? '',
      emailOp: event.columnFilters?.['email']?.operation ?? 'contains',
      roleId: (Array.isArray(event.columnFilters?.['roleId']?.value)
        ? event.columnFilters!['roleId'].value.join(',')
        : event.columnFilters?.['roleId']?.value) ?? '',
      roleIdOp: event.columnFilters?.['roleId']?.operation ?? 'contains',
      phoneNumber: event.columnFilters?.['phoneNumber']?.value ?? '',
      phoneNumberOp: event.columnFilters?.['phoneNumber']?.operation ?? 'contains',
      isActive: (Array.isArray(event.columnFilters?.['isActive']?.value)
        ? event.columnFilters!['isActive'].value[0]
        : event.columnFilters?.['isActive']?.value) ?? '',
    });
  }
}
