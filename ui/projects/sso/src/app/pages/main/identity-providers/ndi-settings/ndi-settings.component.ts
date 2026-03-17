import { Component, inject, signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { BaseOverlay, Button, httpMutation, httpQuery, Spinner } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { NdiTestConnectionResponse, NdiRegisterWebhookResponse, NdiWebhookStatusResponse, GetIdentityProviderListItem } from '@core/api/model';
import { environment } from '@environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ndi-settings',
  standalone: true,
  imports: [BaseOverlay, Button, Spinner, DatePipe],
  templateUrl: './ndi-settings.component.html',
})
export class NdiSettingsComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);
  data: GetIdentityProviderListItem = inject(DIALOG_DATA);

  connectionStatus = signal<'idle' | 'testing' | 'success' | 'error'>('idle');
  registerStatus = signal<'idle' | 'registering' | 'success' | 'error'>('idle');

  webhookStatus = httpQuery<NdiWebhookStatusResponse>({
    request: () => `${environment.apiUrl}/identity-providers/ndi/webhook-status?limit=10`,
    handleSuccess: false,
    handleError: true,
  });

  testConnectionMutation = httpMutation<NdiTestConnectionResponse>({
    request: () => this.apiService.ndiTestConnection(),
    handleSuccess: true,
    handleError: true,
    onSuccess: () => {
      this.connectionStatus.set('success');
    },
    onFailed: () => {
      this.connectionStatus.set('error');
    },
  });

  registerWebhookMutation = httpMutation<NdiRegisterWebhookResponse>({
    request: () => this.apiService.ndiRegisterWebhook(),
    handleSuccess: true,
    handleError: true,
    onSuccess: () => {
      this.registerStatus.set('success');
      this.webhookStatus.refetch();
    },
    onFailed: () => {
      this.registerStatus.set('error');
    },
  });

  onTestConnection() {
    this.connectionStatus.set('testing');
    this.testConnectionMutation.trigger();
  }

  onRegisterWebhook() {
    this.registerStatus.set('registering');
    this.registerWebhookMutation.trigger();
  }
}
