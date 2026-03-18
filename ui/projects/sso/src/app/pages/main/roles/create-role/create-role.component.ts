import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, SelectDropdownField, httpMutation, httpQuery } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { CreateRbacRoleResponse, GetRbacRoleListResponse, RbacRoleItem } from '@core/api/model';
import { environment } from '@environments/environment';

interface CreateRoleData {
  name: string;
  parentRoleId: string;
}

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, SelectDropdownField, FormField],
  templateUrl: './create-role.component.html',
})
export class CreateRoleComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);

  roleModel = signal<CreateRoleData>({
    name: '',
    parentRoleId: '',
  });

  roleForm = form(this.roleModel, (s) => {
    required(s.name);
  });

  parentRoleOptions: { id: string; name: string }[] = [];

  roleListQuery = httpQuery<GetRbacRoleListResponse>({
    request: () => `${environment.apiUrl}/rbac/roles`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.parentRoleOptions = response.data.map((r: RbacRoleItem) => ({ id: r.id, name: r.name }));
    },
  });

  createRoleMutation = httpMutation<CreateRbacRoleResponse>({
    request: () => this.apiService.createRbacRole({
      name: this.roleModel().name,
      parentRoleId: this.roleModel().parentRoleId || undefined,
    }),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return this.roleForm.name().valid();
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.createRoleMutation.trigger();
  }
}
