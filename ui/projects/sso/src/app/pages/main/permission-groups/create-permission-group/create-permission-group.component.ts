import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, httpQuery, httpMutation } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { CreatePermissionGroupResponse, GetClientListResponse, GetClientListItem } from '@core/api/model';
import { environment } from '@environments/environment';

interface CreatePermissionGroupData {
  name: string;
  description: string;
  clientId: string;
}

@Component({
  selector: 'app-create-permission-group',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, FormField],
  templateUrl: './create-permission-group.component.html',
})
export class CreatePermissionGroupComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);

  clients = signal<GetClientListItem[]>([]);

  groupModel = signal<CreatePermissionGroupData>({
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

  createGroupMutation = httpMutation<CreatePermissionGroupResponse>({
    request: () => this.apiService.createPermissionGroup({
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
    await this.createGroupMutation.trigger();
  }
}
