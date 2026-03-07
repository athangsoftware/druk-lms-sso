import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/api/api.service';
import { environment } from '@environments/environment';
import type {
  AiProviderItem,
  GetAiProviderListResponse,
  CreateAiProviderRequest,
  UpdateAiProviderRequest,
} from '@core/api/model';
import {
  DataTable,
  Button,
  ColumnGroup,
  TableActionEvent,
  TableStateEvent,
  OverlayStore,
  httpQuery,
  httpMutation,
} from '@projects/shared-lib';

@Component({
  selector: 'app-ai-provider-list',
  standalone: true,
  imports: [DataTable, Button, NgIf, FormsModule],
  host: { class: 'flex-1 flex flex-col min-h-0' },
  template: `
    <div class="w-full sm:px-4 h-full flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold text-neutral-800">AI Providers</h1>
        <ui-button (click)="openCreatePanel()" type="button">+ Add Provider</ui-button>
      </div>

      <!-- Create / Edit Panel -->
      <div *ngIf="showPanel" class="p-4 border border-neutral-200 rounded-lg bg-neutral-50 flex flex-col gap-3">
        <h2 class="font-medium text-neutral-800">{{ editingId ? 'Edit Provider' : 'New AI Provider' }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input [(ngModel)]="form.name" placeholder="Name *" class="input-field" />
          <input [(ngModel)]="form.model" placeholder="Model (e.g. gpt-4o) *" class="input-field" />
          <input
            [(ngModel)]="form.apiKey"
            type="password"
            placeholder="API Key {{ editingId ? '(leave blank to keep)' : '*' }}"
            class="input-field sm:col-span-2"
          />
        </div>
        <div *ngIf="saveMutation.error()" class="text-red-600 text-sm">{{ saveMutation.error()?.message ?? 'An error occurred' }}</div>
        <div class="flex gap-2">
          <ui-button type="button" (click)="submitForm()" [disabled]="saveMutation.isLoading()">
            {{ saveMutation.isLoading() ? 'Saving...' : 'Save' }}
          </ui-button>
          <ui-button type="button" (click)="showPanel = false">Cancel</ui-button>
        </div>
      </div>

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
export class AiProviderListComponent {
  private api = inject(ApiService);
  private overlay = inject(OverlayStore);

  showPanel = false;
  editingId: string | null = null;
  form = { name: '', apiKey: '', model: '' };
  private tableParams = signal({ pageNumber: 1, pageSize: 20, search: '' });

  list = httpQuery<GetAiProviderListResponse>({
    request: () => ({
      url: `${environment.apiUrl}/ai-providers`,
      params: this.tableParams() as Record<string, any>,
    }),
    handleError: true,
  });

  saveMutation = httpMutation({
    request: () => {
      if (this.editingId) {
        const req: UpdateAiProviderRequest = {
          name: this.form.name,
          model: this.form.model,
          ...(this.form.apiKey ? { apiKey: this.form.apiKey } : {}),
        };
        return this.api.updateAiProvider(this.editingId, req);
      }
      const req: CreateAiProviderRequest = {
        name: this.form.name,
        model: this.form.model,
        apiKey: this.form.apiKey,
      };
      return this.api.createAiProvider(req);
    },
    handleSuccess: true,
    onSuccess: () => {
      this.showPanel = false;
      this.form = { name: '', apiKey: '', model: '' };
      this.editingId = null;
      this.list.refetch();
    },
  });

  enableMutation = httpMutation({
    request: () =>
      this.api.updateAiProvider(this.editingId!, { isEnabled: true }),
    handleSuccess: true,
    onSuccess: () => this.list.refetch(),
  });

  columnGroups: ColumnGroup[] = [
    {
      title: 'AI Providers',
      children: [
        { title: 'Name', type: 'text', alignment: 'left', displayTemplate: '$name', sortKey: 'name' },
        { title: 'Model', type: 'text', alignment: 'left', displayTemplate: '$model' },
        { title: 'Enabled', type: 'text', alignment: 'center', displayTemplate: '$isEnabled' },
        {
          title: 'Actions',
          type: 'actions',
          alignment: 'center',
          actionsConfig: {
            threeDotMenuActions: (item: AiProviderItem) => [
              { label: 'Edit', iconPath: 'icons/edit.svg', actionKey: 'edit' },
              item.isEnabled
                ? { label: 'Disable', iconPath: 'icons/delete.svg', actionKey: 'disable' }
                : { label: 'Enable', iconPath: 'icons/account.svg', actionKey: 'enable' },
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
    const item: AiProviderItem = event.item;
    switch (event.actionKey) {
      case 'edit':
        this.editingId = item.id;
        this.form = { name: item.name, model: item.model, apiKey: '' };
        this.showPanel = true;
        break;
      case 'enable':
        this.editingId = item.id;
        this.api.updateAiProvider(item.id, { isEnabled: true }).subscribe({
          next: () => this.list.refetch(),
        });
        break;
      case 'disable':
        this.api.updateAiProvider(item.id, { isEnabled: false }).subscribe({
          next: () => this.list.refetch(),
        });
        break;
    }
  }

  openCreatePanel() {
    this.editingId = null;
    this.form = { name: '', apiKey: '', model: '' };
    this.showPanel = true;
  }

  submitForm() {
    this.saveMutation.trigger();
  }
}
