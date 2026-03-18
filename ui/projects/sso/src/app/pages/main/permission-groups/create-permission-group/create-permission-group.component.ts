import { Component, inject, signal, computed } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, SelectDropdownField, httpQuery, httpMutation } from '@projects/shared-lib';
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
  imports: [BaseOverlay, TextInputComponent, Button, SelectDropdownField, FormField],
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

  clientOptions = computed(() => [
    { id: '', name: '— No Client —' },
    ...this.clients(),
  ]);

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

  isFormValid() {
    return this.groupForm.name().valid();
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.createGroupMutation.trigger();
  }
}
