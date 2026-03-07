import { Component, inject, signal, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ApiService } from '@core/api/api.service';
import { environment } from '@environments/environment';
import type { CreateDashboardRequest, UpdateDashboardRequest } from '@core/api/model';
import { Button, httpQuery, httpMutation } from '@projects/shared-lib';

@Component({
  selector: 'app-dashboard-form',
  standalone: true,
  imports: [FormsModule, NgIf, Button],
  template: `
    <div class="w-full max-w-lg mx-auto p-6 flex flex-col gap-6">
      <h1 class="text-xl font-semibold text-neutral-800">
        {{ isEditMode ? 'Edit Dashboard' : 'Create Dashboard' }}
      </h1>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-neutral-700">Name *</label>
          <input
            [(ngModel)]="form.name"
            type="text"
            placeholder="Dashboard name"
            class="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-neutral-700">Description</label>
          <textarea
            [(ngModel)]="form.description"
            placeholder="Optional description"
            rows="3"
            class="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      <div *ngIf="errorMessage()" class="text-red-600 text-sm">{{ errorMessage() }}</div>

      <div class="flex gap-3">
        <ui-button type="button" (click)="onCancel()">Cancel</ui-button>
        <ui-button
          type="button"
          (click)="onSubmit()"
          [disabled]="saveMutation.isLoading() || !form.name"
        >
          {{ saveMutation.isLoading() ? 'Saving...' : 'Save' }}
        </ui-button>
      </div>
    </div>
  `,
})
export class DashboardFormComponent implements OnInit, DoCheck {
  private api = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = false;
  dashboardId = signal<string>('');
  errorMessage = signal<string | null>(null);
  private formLoaded = false;

  form = {
    name: '',
    description: '',
  };

  existingDashboard = httpQuery({
    request: () => {
      const id = this.dashboardId();
      if (!id) return undefined;
      return `${environment.apiUrl}/dashboards/${id}`;
    },
    handleError: true,
  });

  saveMutation = httpMutation({
    request: () => {
      const id = this.dashboardId();
      if (id) {
        const req: UpdateDashboardRequest = { name: this.form.name, description: this.form.description };
        return this.api.updateDashboard(id, req);
      } else {
        const req: CreateDashboardRequest = { name: this.form.name, description: this.form.description };
        return this.api.createDashboard(req);
      }
    },
    handleSuccess: true,
    onSuccess: (res: any) => {
      const id = this.dashboardId() || res?.data?.id;
      this.router.navigate(['/main/dashboards', id]);
    },
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.dashboardId.set(id);
    }
  }

  ngDoCheck() {
    if (!this.formLoaded) {
      const detail = this.existingDashboard.value() as any;
      if (detail?.data) {
        this.form.name = detail.data.name;
        this.form.description = detail.data.description ?? '';
        this.formLoaded = true;
      }
    }
  }

  onSubmit() {
    if (!this.form.name.trim()) {
      this.errorMessage.set('Name is required.');
      return;
    }
    this.errorMessage.set(null);
    this.saveMutation.trigger();
  }

  onCancel() {
    this.router.navigate(['/main/dashboards']);
  }
}

