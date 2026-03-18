import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, httpQuery, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { PermissionGroupItem, GetPermissionGroupResponse, UpdatePermissionGroupResponse, GetClientListResponse, GetClientListItem } from '@core/api/model';
import { environment } from '@environments/environment';

interface UpdatePermissionGroupData {
  name: string;
  description: string;
  clientId: string;
}

@Component({
  selector: 'app-update-permission-group',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, FormField],
  templateUrl: './update-permission-group.component.html',
})
export class UpdatePermissionGroupComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);
  data: PermissionGroupItem = inject(DIALOG_DATA);

  clients = signal<GetClientListItem[]>([]);

  groupModel = signal<UpdatePermissionGroupData>({
    name: '',
    description: '',
    clientId: '',
  });

  groupForm = form(this.groupModel, (s) => {
    required(s.name);
  });

  clientListQuery = httpQuery<GetClientListResponse>({
    request: () => `${environment.apiUrl}/clients?pageSize=100`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.clients.set(response.data);
    },
  });

  groupQuery = httpQuery<GetPermissionGroupResponse>({
    request: () => `${environment.apiUrl}/rbac/permission-groups/${this.data.id}`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.groupModel.set({
        name: response.data?.name ?? '',
        description: response.data?.description ?? '',
        clientId: response.data?.clientId ?? '',
      });
    },
  });

  updateGroupMutation = httpMutation<UpdatePermissionGroupResponse>({
    request: () => this.apiService.updatePermissionGroup(this.data.id, {
      name: this.groupModel().name,
      description: this.groupModel().description || undefined,
      clientId: this.groupModel().clientId || undefined,
    }),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  onClientChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.groupModel.update((m) => ({ ...m, clientId: value }));
  }

  isFormValid() {
    return this.groupForm.name().valid();
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.updateGroupMutation.trigger();
  }
}
