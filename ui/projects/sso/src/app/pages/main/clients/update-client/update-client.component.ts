import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, SelectDropdownField, httpQuery, httpMutation, CheckboxField } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { ClientType, GetClientListItem, GetClientResponse, UpdateClientResponse } from '@core/api/model';
import { environment } from '@environments/environment';

interface UpdateClientData {
  name: string;
  clientType: string;
  disableStrictUrlValidation: boolean;
  redirectUrls: string;
  postLogoutRedirectUrls: string;
}

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, SelectDropdownField, FormField, CheckboxField],
  templateUrl: './update-client.component.html',
})
export class UpdateClientComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);
  data: GetClientListItem = inject(DIALOG_DATA);

  clientTypeOptions = [
    { id: 'PUBLIC', name: 'Public (SPA / Mobile — PKCE)' },
    { id: 'CONFIDENTIAL', name: 'Confidential (Backend — Client Secret)' },
  ];

  clientModel = signal<UpdateClientData>({
    name: '',
    clientType: 'PUBLIC',
    disableStrictUrlValidation: false,
    redirectUrls: '',
    postLogoutRedirectUrls: '',
  });

  clientForm = form(this.clientModel, (s) => {
    required(s.name);
    required(s.clientType);
  });

  clientQuery = httpQuery<GetClientResponse>({
    request: () => `${environment.apiUrl}/clients/${this.data.id}`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      this.clientModel.set({
        name: response.data?.name ?? '',
        clientType: response.data?.clientType ?? 'PUBLIC',
        disableStrictUrlValidation: response.data?.disableStrictUrlValidation ?? false,
        redirectUrls: (response.data?.redirectUrls ?? []).join('\n'),
        postLogoutRedirectUrls: (response.data?.postLogoutRedirectUrls ?? []).join('\n'),
      });
    },
  });

  updateClientMutation = httpMutation<UpdateClientResponse>({
    request: () => this.apiService.updateClient(this.data.id, {
      name: this.clientModel().name,
      clientType: this.clientModel().clientType as ClientType,
      disableStrictUrlValidation: this.clientModel().disableStrictUrlValidation,
      redirectUrls: this.parseUrls(this.clientModel().redirectUrls),
      postLogoutRedirectUrls: this.parseUrls(this.clientModel().postLogoutRedirectUrls),
    }),
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return this.clientForm.name().valid() && this.clientForm.clientType().valid();
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.updateClientMutation.trigger();
  }

  private parseUrls(value: string): string[] {
    return value
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u.length > 0);
  }
}
