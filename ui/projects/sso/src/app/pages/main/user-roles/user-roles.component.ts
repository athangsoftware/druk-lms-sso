import { Component, inject, signal } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import {
  GetUserListResponse,
  GetUserListItem,
} from '@core/api/model';
import {
  ColumnGroup,
  TableActionEvent,
  TableStateEvent,
  DataTable,
  ContextMenuActionConfig,
  OverlayStore,
  httpQuery,
} from '@projects/shared-lib';
import { environment } from '@environments/environment';
import { AssignUserRolesComponent } from './assign-user-roles/assign-user-roles.component';
import { UserRolesStore } from './user-roles.store';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [DataTable],
  templateUrl: './user-roles.component.html',
  providers: [UserRolesStore],
})
export class UserRolesComponent {
  store = inject(UserRolesStore);
  private apiService = inject(ApiService);
  overlayService = inject(OverlayStore);

  userList = httpQuery<GetUserListResponse>({
    request: () => {
      const event = this.store.tableState();
      const rawParams: Record<string, any> = {
        pageNumber: event.paginationEvent?.pageNumber ?? 1,
        pageSize: event.paginationEvent?.pageSize ?? 20,
        search: event.searchText ?? '',
        sortingDirection: event.tableSortEvent?.direction ?? 'asc',
        orderByPropertyName: event.tableSortEvent?.key ?? 'firstName',
      };
      const params = Object.fromEntries(
        Object.entries(rawParams).filter(([, v]) => v !== undefined),
      );
      return { url: `${environment.apiUrl}/users`, params };
    },
    handleSuccess: false,
    handleError: true,
  });

  columnGroups: ColumnGroup[] = [
    {
      title: 'Manage User Role Assignments',
      children: [
        {
          title: 'First Name',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$firstName',
          sortKey: 'firstName',
        },
        {
          title: 'Last Name',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$lastName',
          sortKey: 'lastName',
        },
        {
          title: 'Email',
          type: 'text',
          alignment: 'left',
          displayTemplate: '$email',
          sortKey: 'email',
        },
        {
          title: 'Actions',
          type: 'actions',
          alignment: 'center',
          actionsConfig: {
            threeDotMenuActions: (_item: GetUserListItem): ContextMenuActionConfig[] => [
              { label: 'Assign Roles', iconPath: 'icons/edit.svg', actionKey: 'assign-roles' },
            ],
          },
        },
      ],
    },
  ];

  onTableStateChanged(event: TableStateEvent) {
    this.store.updateFromTableState(event);
  }

  onRowClicked(_item: any) {}

  async onAction(event: TableActionEvent) {
    const item: GetUserListItem = event.item;
    switch (event.actionKey) {
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
