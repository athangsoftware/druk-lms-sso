import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/api/api.service';
import { environment } from '@environments/environment';
import type {
  DbConnectionItem,
  GetDbConnectionListResponse,
  CreateDbConnectionRequest,
  UpdateDbConnectionRequest,
  DbType,
  TestDbConnectionResponse,
} from '@core/api/model';
import {
  DataTable,
  Button,
  ColumnGroup,
  TableActionEvent,
  TableStateEvent,
  OverlayStore,
  ToastStore,
  httpQuery,
  httpMutation,
} from '@projects/shared-lib';

@Component({
  selector: 'app-db-connection-list',
  standalone: true,
  imports: [DataTable, Button, FormsModule],
  host: { class: 'flex-1 flex flex-col min-h-0' },
  template: `
    <div class="w-full sm:px-4 h-full flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-neutral-800">DB Connections</h1>
        <ui-button (click)="openCreatePanel()" type="button">+ Add Connection</ui-button>
      </div>

      <!-- Create / Edit panel -->
      @if (showPanel) {
        <div class="p-4 border border-neutral-200 rounded-lg bg-neutral-50 flex flex-col gap-3">
          <h2 class="font-medium text-neutral-800">{{ editingId ? 'Edit Connection' : 'New Connection' }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input [(ngModel)]="form.name" placeholder="Name *" class="input-field" />
            <select [(ngModel)]="form.dbType" (ngModelChange)="onDbTypeChange($event)" class="input-field">
              <option value="MYSQL">MySQL</option>
              <option value="MONGODB">MongoDB</option>
            </select>
            <input [(ngModel)]="form.host" placeholder="Host *" class="input-field" />
            <input [(ngModel)]="form.port" placeholder="Port *" type="number" class="input-field" />
            <input [(ngModel)]="form.databaseName" placeholder="Database Name *" class="input-field" />
            <input [(ngModel)]="form.username" placeholder="Username *" class="input-field" />
            <input [(ngModel)]="form.password" placeholder="Password {{ editingId ? '(leave blank to keep)' : '*' }}" type="password" class="input-field" />
          </div>
          @if (saveMutation.error()) {
            <div class="text-red-600 text-sm">{{ saveMutation.error()?.message ?? 'An error occurred' }}</div>
          }
          <div class="flex gap-2">
            <ui-button type="button" (click)="submitForm()" [disabled]="saveMutation.isLoading()">
              {{ saveMutation.isLoading() ? 'Saving...' : 'Save' }}
            </ui-button>
            <ui-button type="button" (click)="showPanel = false">Cancel</ui-button>
          </div>
        </div>
      }

      <div class="flex-1 min-h-0">
        <ui-data-table
          class="block h-full"
          [columnGroups]="columnGroups"
          [data]="list.value()?.data ?? []"
          [totalCount]="list.value()?.totalCount ?? 0"
          [hasError]="!!list.error()"
          (action)="onAction($event)"
          (stateChange)="onTableStateChanged($event)"
        />
      </div>
    </div>
  `,
  styles: [`
    @reference "../../../../styles.css";
    .input-field {
      @apply border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full;
    }
  `],
})
export class DbConnectionListComponent {
  private api = inject(ApiService);
  private overlay = inject(OverlayStore);
  private toast = inject(ToastStore);

  showPanel = false;
  editingId: string | null = null;
  form: {
    name: string; host: string; port: number; databaseName: string;
    username: string; password: string; dbType: DbType;
  } = this.emptyForm();
  private tableParams = signal({ pageNumber: 1, pageSize: 20, search: '' });
  private targetId = signal<string>('');

  list = httpQuery<GetDbConnectionListResponse>({
    request: () => ({
      url: `${environment.apiUrl}/db-connections`,
      params: this.tableParams() as Record<string, any>,
    }),
    handleError: true,
  });

  saveMutation = httpMutation({
    request: () => {
      if (this.editingId) {
        const req: UpdateDbConnectionRequest = {
          name: this.form.name,
          host: this.form.host,
          port: this.form.port,
          databaseName: this.form.databaseName,
          username: this.form.username,
          ...(this.form.password ? { password: this.form.password } : {}),
        };
        return this.api.updateDbConnection(this.editingId, req);
      }
      const req: CreateDbConnectionRequest = { ...this.form };
      return this.api.createDbConnection(req);
    },
    handleSuccess: true,
    onSuccess: () => {
      this.showPanel = false;
      this.form = this.emptyForm();
      this.editingId = null;
      this.list.refetch();
    },
  });

  testMutation = httpMutation<TestDbConnectionResponse>({
    request: () => this.api.testDbConnection(this.targetId()),
    handleSuccess: false,
    handleError: false,
    onSuccess: (res) => {
      if (res.data.isConnected) {
        this.toast.success(res.successMessage ?? 'Connection test successful ✅');
      } else {
        // Show alert dialog for failed connection tests so the user can acknowledge the issue.
        this.overlay.openAlert(
          'Connection test failed',
          res.successMessage ?? 'Connection test failed. Please check your credentials ❌'
        );
      }
    },
    onFailed: (err) => {
      console.error('[DB Test] onFailed', err);
      const message =
        (err.error as any)?.message || err.message ||
        'Connection test failed. Please check your network and credentials.';
      this.overlay.openAlert('Connection test failed', message);
    },
  });

  deleteMutation = httpMutation({
    request: () => this.api.deleteDbConnection(this.targetId()),
    handleSuccess: true,
    onSuccess: () => this.list.refetch(),
  });

  columnGroups: ColumnGroup[] = [
    {
      title: 'Database Connections',
      children: [
        { title: 'Name', type: 'text', alignment: 'left', displayTemplate: '$name', sortKey: 'name' },
        { title: 'Host', type: 'text', alignment: 'left', displayTemplate: '$host' },
        { title: 'Database', type: 'text', alignment: 'left', displayTemplate: '$databaseName' },
        { title: 'Type', type: 'text', alignment: 'left', displayTemplate: '$dbType' },
        {
          title: 'Actions',
          type: 'actions',
          alignment: 'center',
          actionsConfig: {
            threeDotMenuActions: () => [
              { label: 'Test', iconPath: 'icons/application.svg', actionKey: 'test' },
              { label: 'Edit', iconPath: 'icons/edit.svg', actionKey: 'edit' },
              { label: 'Delete', iconPath: 'icons/delete.svg', actionKey: 'delete' },
            ],
          },
        },
      ],
    },
  ];

  onTableStateChanged(event: TableStateEvent) {
    this.tableParams.set({
      pageNumber: event.paginationEvent?.pageNumber ?? 1,
      pageSize: event.paginationEvent?.pageSize ?? 20,
      search: event.searchText ?? '',
    });
  }

  async onAction(event: TableActionEvent) {
    const item: DbConnectionItem = event.item;
    switch (event.actionKey) {
      case 'test':
        this.targetId.set(item.id);
        this.testMutation.trigger();
        break;
      case 'edit':
        this.editingId = item.id;
        this.form = {
          name: item.name,
          host: item.host,
          port: item.port,
          databaseName: item.databaseName,
          username: item.username,
          password: '',
          dbType: item.dbType,
        };
        this.showPanel = true;
        break;
      case 'delete':
        this.overlay
          .openAlert('Delete Connection', `Delete "${item.name}"?`)
          .then((ok) => {
            if (ok) {
              this.targetId.set(item.id);
              this.deleteMutation.trigger();
            }
          });
        break;
    }
  }

  openCreatePanel() {
    this.editingId = null;
    this.form = this.emptyForm();
    this.showPanel = true;
  }

  submitForm() {
    this.saveMutation.trigger();
  }

  onDbTypeChange(dbType: DbType) {
    if (dbType === 'MONGODB' && this.form.port === 3306) {
      this.form.port = 27017;
    } else if (dbType === 'MYSQL' && this.form.port === 27017) {
      this.form.port = 3306;
    }
  }

  private emptyForm() {
    return { name: '', host: '', port: 3306, databaseName: '', username: '', password: '', dbType: 'MYSQL' as DbType };
  }
}
