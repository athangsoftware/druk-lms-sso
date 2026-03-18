import { Component, inject, signal } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { GetUserListItem, GetUserListParams, GetUserListResponse } from '@core/api/model';
import { AuthHelperService } from '@core/auth-helper.service';
import {
  ColumnGroup,
  TableAction,
  TableActionEvent,
  TableStateEvent,
  DataTable,
  ContextMenuActionConfig,
  OverlayStore,
  httpQuery,
  httpMutation,
} from '@projects/shared-lib';
import { environment } from '@environments/environment';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { TableCellEnableDisableComponent } from './table-cell-enable-disable/table-cell-enable-disable.component';
import { UserListStore } from './user-list.store';
import { AssignUserRolesComponent } from '../user-roles/assign-user-roles/assign-user-roles.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [DataTable],
  templateUrl: './user-list.component.html',
  providers: [UserListStore],
})
export class UserListComponent {
  store = inject(UserListStore);
  private apiService = inject(ApiService);
  overlayService = inject(OverlayStore);
  authHelperService = inject(AuthHelperService);
  private targetUserId = signal<string>('');

  enableMutation = httpMutation({
    request: () => this.apiService.enableUser(this.targetUserId()),
    handleSuccess: true,
    onSuccess: () => this.userList.refetch(),
  });

  disableMutation = httpMutation({
    request: () => this.apiService.disableUser(this.targetUserId()),
    handleSuccess: true,
    onSuccess: () => this.userList.refetch(),
  });

  userList = httpQuery<GetUserListResponse>({
    request: () => {
      const event = this.store.tableState();
      const params: GetUserListParams = {
        pageNumber: event.paginationEvent?.pageNumber ?? 1,
        pageSize: event.paginationEvent?.pageSize ?? 20,
        search: event.searchText ?? '',
        sortingDirection: event.tableSortEvent?.direction ?? 'asc',
        orderByPropertyName: event.tableSortEvent?.key ?? 'firstName',
        firstNameValue: event.columnFilters?.['firstName']?.value,
        firstNameOperation: event.columnFilters?.['firstName']?.operation,
        lastNameValue: event.columnFilters?.['lastName']?.value,
        lastNameOperation: event.columnFilters?.['lastName']?.operation,
        emailValue: event.columnFilters?.['email']?.value,
        emailOperation: event.columnFilters?.['email']?.operation,
        roleIdValue: Array.isArray(event.columnFilters?.['roleId']?.value)
          ? event.columnFilters!['roleId'].value
          : (event.columnFilters?.['roleId']?.value ? [event.columnFilters['roleId'].value] : []),
        roleIdOperation: event.columnFilters?.['roleId']?.operation,
        phoneNumberValue: event.columnFilters?.['phoneNumber']?.value,
        phoneNumberOperation: event.columnFilters?.['phoneNumber']?.operation,
        isActiveValue: Array.isArray(event.columnFilters?.['isActive']?.value)
          ? event.columnFilters!['isActive'].value[0]
          : event.columnFilters?.['isActive']?.value,
      };
      return { url: `${environment.apiUrl}/users`, params: params as Record<string, any> };
    },
    handleSuccess: false,
    handleError: true,
  });

  tableActions: TableAction[] = [
    {
      label: 'Create User',
      actionKey: 'create',
      type: 'primary',
      icon: 'icons/plus.svg',
      position: 'default',
    },
  ];

  onTableAction(event: TableActionEvent) {
    if (event.actionKey === 'create') {
      this.onCreate();
    }
  }

  onCreate() {
    this.overlayService.openModal(CreateUserComponent, {
      disableClose: true,
      onClose: () => this.userList.refetch(),
    });
  }

  columnGroups: ColumnGroup[] = [
    {
      title: '',
      children: [
        {
          title: 'First Name',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$firstName',
          sortKey: 'firstName',
          filterConfig: { type: 'text', placeholder: '' },
        },
        {
          title: 'Last Name',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$lastName',
          sortKey: 'lastName',
          filterConfig: { type: 'text', placeholder: '' },
        },
        {
          title: 'Email',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$email',
          sortKey: 'email',
          filterConfig: { type: 'text', placeholder: '' },
        },
        {
          title: 'User Type',
          type: 'badge',
          alignment: 'left',
          displayTemplate: '$roleName',
          sortKey: 'roleId',
          badgeConfig: {
            properties: [
              { data: 'InternalUser', displayText: 'Internal User', backgroundColorClass: 'bg-blue-50', borderColorClass: 'border-blue-200', textColorClass: 'text-blue-700', indicatorColorClass: 'bg-blue-500' },
              { data: 'OrganizationUser', displayText: 'Organization User', backgroundColorClass: 'bg-green-50', borderColorClass: 'border-green-200', textColorClass: 'text-green-700', indicatorColorClass: 'bg-green-500' },
            ],
          },
          filterConfig: {
            type: 'select',
            options: [
              { value: 'InternalUser', label: 'Internal User' },
              { value: 'OrganizationUser', label: 'Organization User' },
            ],
          },
        },
        {
          title: 'Enable/Disable',
          type: 'custom',
          alignment: 'center',
          component: TableCellEnableDisableComponent,
          sortKey: 'isActive',
          filterConfig: {
            type: 'select',
            options: [
              { value: 'true', label: 'Enabled' },
              { value: 'false', label: 'Disabled' },
            ],
          },
        },
        {
          title: 'Phone Number',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$phoneNumber',
          sortKey: 'phoneNumber',
          filterConfig: { type: 'text', placeholder: '' },
        },
        {
          title: 'Actions',
          type: 'actions',
          alignment: 'center',
          actionsConfig: {
            threeDotMenuActions: (item: GetUserListItem): ContextMenuActionConfig[] => {
              return item.isActive
                ? [
                    { label: 'Disable', iconPath: 'icons/delete.svg', actionKey: 'disable' },
                    { label: 'Edit', iconPath: 'icons/edit.svg', actionKey: 'edit' },
                    { label: 'Assign Roles', iconPath: 'icons/edit.svg', actionKey: 'assign-roles' },
                  ]
                : [
                    { label: 'Enable', iconPath: 'icons/account.svg', actionKey: 'enable' },
                    { label: 'Edit', iconPath: 'icons/edit.svg', actionKey: 'edit' },
                    { label: 'Assign Roles', iconPath: 'icons/edit.svg', actionKey: 'assign-roles' },
                  ];
            },
          },
        },
      ],
    },
  ];

  onTableStateChanged(event: TableStateEvent) {
    this.store.updateFromTableState(event);
  }

  onRowClicked(item: any) {
    console.log('Row clicked:', item);
  }

  async onAction(event: TableActionEvent) {
    const item: GetUserListItem = event.item;
    switch (event.actionKey) {
      case 'enable':
        this.overlayService.openAlert('Enable!', 'Are you sure you want to Enable (Un Block) the User?').then((confirmed) => {
          if (confirmed) {
            this.targetUserId.set(item.id);
            this.enableMutation.trigger();
          }
        });
        break;
      case 'disable':
        this.overlayService.openAlert('Disable!', 'Are you sure you want to disable (Block) the User?').then((confirmed) => {
          if (confirmed) {
            this.targetUserId.set(item.id);
            this.disableMutation.trigger();
          }
        });
        break;
      case 'edit':
        this.overlayService.openModal(UpdateUserComponent, {
          disableClose: true,
          data: item,
          onClose: () => this.userList.refetch(),
        });
        break;
      case 'assign-roles':
        this.overlayService.openModal(AssignUserRolesComponent, {
          disableClose: true,
          data: item,
          onClose: () => this.userList.refetch(),
        });
        break;
    }
  }
}
