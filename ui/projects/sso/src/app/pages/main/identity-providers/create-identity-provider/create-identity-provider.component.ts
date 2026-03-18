import { Component, inject, signal, computed, effect, untracked } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, SelectDropdownField, httpMutation, CheckboxField } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { IdentityProviderType, CreateIdentityProviderResponse } from '@core/api/model';

interface CreateIdentityProviderData {
  name: string;
  slug: string;
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

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || '';
}

function sanitizeSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+/, '');
}

@Component({
  selector: 'app-create-identity-provider',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, SelectDropdownField, FormField, CheckboxField],
  templateUrl: './create-identity-provider.component.html',
})
export class CreateIdentityProviderComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);

  typeOptions = [
    { id: 'GOOGLE', name: 'Google' },
    { id: 'NDI', name: 'NDI' },
    { id: 'OIDC', name: 'Other OIDC' },
  ];

  providerModel = signal<CreateIdentityProviderData>({
    name: '',
    slug: '',
    type: 'OIDC',
    clientId: '',
    clientSecret: '',
    authorizationUrl: '',
    tokenUrl: '',
    userInfoUrl: '',
    redirectUrl: '',
    scopes: 'openid profile email',
    iconUrl: '',
    isEnabled: true,
    displayOrder: 0,
    metadata: '',
  });

  providerForm = form(this.providerModel, (s) => {
    required(s.name);
    required(s.slug);
    required(s.type);
  });

  private readonly _lastSuggested = signal('');
  private readonly _suggested = computed(() => toSlug(this.providerModel().name));
  private readonly _rawSlug = computed(() => this.providerModel().slug);

  constructor() {
    effect(() => {
      const suggested = this._suggested();
      untracked(() => {
        const current = this.providerModel().slug;
        const last = this._lastSuggested();
        if (current === last || current === '') {
          this.providerModel.update((m) => ({ ...m, slug: suggested }));
          this._lastSuggested.set(suggested);
        }
      });
    }, { allowSignalWrites: true });

    effect(() => {
      const raw = this._rawSlug();
      const sanitized = sanitizeSlug(raw);
      if (raw !== sanitized) {
        this.providerModel.update((m) => ({ ...m, slug: sanitized }));
      }
    }, { allowSignalWrites: true });
  }

  createMutation = httpMutation<CreateIdentityProviderResponse>({
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
      return this.apiService.createIdentityProvider({
        name: m.name,
        slug: m.slug || undefined,
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
    return (
      this.providerForm.name().valid() &&
      this.providerForm.slug().valid() &&
      this.providerForm.type().valid()
    );
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.createMutation.trigger();
  }
}
