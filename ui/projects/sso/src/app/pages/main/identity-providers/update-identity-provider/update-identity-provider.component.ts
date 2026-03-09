import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, SingleSelectionFieldComponent, httpQuery, httpMutation, CheckboxField } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { IdentityProviderType, GetIdentityProviderListItem, GetIdentityProviderResponse, UpdateIdentityProviderResponse } from '@core/api/model';
import { environment } from '@environments/environment';

interface UpdateIdentityProviderData {
  name: string;
  type: string;
  clientId: string;
  clientSecret: string;
  authorizationUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
  redirectUrl: string;
  scopes: string;
  iconUrl: string;
  isEnabled: boolean;
  displayOrder: number;
  metadata: string;
}

@Component({
  selector: 'app-update-identity-provider',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, SingleSelectionFieldComponent, FormField, CheckboxField],
  templateUrl: './update-identity-provider.component.html',
})
export class UpdateIdentityProviderComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);
  data: GetIdentityProviderListItem = inject(DIALOG_DATA);

  typeOptions = [
    { id: 'GOOGLE', name: 'Google' },
    { id: 'NDI', name: 'NDI' },
    { id: 'OIDC', name: 'Other OIDC' },
    { id: 'CUSTOM', name: 'Custom (Legacy)' },
  ];

  providerModel = signal<UpdateIdentityProviderData>({
    name: '',
    type: 'OIDC',
    clientId: '',
    clientSecret: '',
    authorizationUrl: '',
    tokenUrl: '',
    userInfoUrl: '',
    redirectUrl: '',
    scopes: '',
    iconUrl: '',
    isEnabled: true,
    displayOrder: 0,
    metadata: '',
  });

  providerForm = form(this.providerModel, (s) => {
    required(s.name);
    required(s.type);
  });

  providerQuery = httpQuery<GetIdentityProviderResponse>({
    request: () => `${environment.apiUrl}/identity-providers/${this.data.id}`,
    handleSuccess: false,
    handleError: true,
    onSuccess: (response) => {
      const d = response.data;
      if (!d) return;
      this.providerModel.set({
        name: d.name ?? '',
        type: d.type ?? 'OIDC',
        clientId: d.clientId ?? '',
        clientSecret: '',
        authorizationUrl: d.authorizationUrl ?? '',
        tokenUrl: d.tokenUrl ?? '',
        userInfoUrl: d.userInfoUrl ?? '',
        redirectUrl: d.redirectUrl ?? '',
        scopes: d.scopes ?? '',
        iconUrl: d.iconUrl ?? '',
        isEnabled: d.isEnabled ?? true,
        displayOrder: d.displayOrder ?? 0,
        metadata: d.metadata ? JSON.stringify(d.metadata, null, 2) : '',
      });
    },
  });

  updateMutation = httpMutation<UpdateIdentityProviderResponse>({
    request: () => {
      const m = this.providerModel();
      let metadata: any = undefined;
      if (m.metadata.trim()) {
        try {
          metadata = JSON.parse(m.metadata);
        } catch {
          // Invalid JSON — ignore metadata
        }
      }
      return this.apiService.updateIdentityProvider(this.data.id, {
        name: m.name,
        type: m.type as IdentityProviderType,
        clientId: m.clientId || undefined,
        clientSecret: m.clientSecret || undefined,
        authorizationUrl: m.authorizationUrl || undefined,
        tokenUrl: m.tokenUrl || undefined,
        userInfoUrl: m.userInfoUrl || undefined,
        redirectUrl: m.redirectUrl || undefined,
        scopes: m.scopes || undefined,
        iconUrl: m.iconUrl || undefined,
        isEnabled: m.isEnabled,
        displayOrder: m.displayOrder,
        metadata,
      });
    },
    handleSuccess: true,
    onSuccess: (response) => {
      this.dialogRef.close(response);
    },
  });

  isFormValid() {
    return this.providerForm.name().valid() && this.providerForm.type().valid();
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.updateMutation.trigger();
  }
}
