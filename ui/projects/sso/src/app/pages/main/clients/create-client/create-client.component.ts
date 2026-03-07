import { Component, inject, signal, computed, effect, untracked } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { DialogRef } from '@angular/cdk/dialog';
import { BaseOverlay, Button, TextInputComponent, SingleSelectionFieldComponent, httpMutation, CheckboxField } from '@projects/shared-lib';
import { ApiService } from '@core/api/api.service';
import { ClientType, CreateClientResponse } from '@core/api/model';

interface CreateClientData {
  name: string;
  clientId: string;
  clientType: string;
  disableStrictUrlValidation: boolean;
  redirectUrls: string;
  postLogoutRedirectUrls: string;
}

/** Derives an OIDC-safe client ID from a display name:
 *  lowercase · strip diacritics · non-alphanumeric → hyphens · trim hyphens */
function toOidcClientId(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || '';
}

/** Enforce OIDC case standard on a manually typed value */
function sanitizeClientId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+/, '');
}

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [BaseOverlay, TextInputComponent, Button, SingleSelectionFieldComponent, FormField, CheckboxField],
  templateUrl: './create-client.component.html',
})
export class CreateClientComponent {
  private apiService = inject(ApiService);
  dialogRef = inject(DialogRef);

  clientTypeOptions = [
    { id: 'PUBLIC', name: 'Public (SPA / Mobile — PKCE)' },
    { id: 'CONFIDENTIAL', name: 'Confidential (Backend — Client Secret)' },
  ];

  clientModel = signal<CreateClientData>({
    name: '',
    clientId: '',
    clientType: 'PUBLIC',
    disableStrictUrlValidation: false,
    redirectUrls: '',
    postLogoutRedirectUrls: '',
  });

  clientForm = form(this.clientModel, (s) => {
    required(s.name);
    required(s.clientId);
    required(s.clientType);
  });

  // ── Auto-suggest logic ────────────────────────────────────────────────────

  /** Stores the last value we auto-suggested so we can detect manual overrides */
  private readonly _lastSuggested = signal('');

  /** Computed: derives suggested clientId from name only (string equality memoises → no loop) */
  private readonly _suggested = computed(() => toOidcClientId(this.clientModel().name));

  /** Computed: extracts raw clientId string (changes only when clientId changes) */
  private readonly _rawClientId = computed(() => this.clientModel().clientId);

  constructor() {
    // 1. Auto-fill clientId when name changes, as long as the user hasn't manually overridden it.
    //    Using _suggested (computed from name only) ensures this effect does NOT re-run
    //    when clientId changes — breaking any potential loop.
    effect(() => {
      const suggested = this._suggested();
      untracked(() => {
        const current = this.clientModel().clientId;
        const last = this._lastSuggested();
        if (current === last || current === '') {
          this.clientModel.update((m) => ({ ...m, clientId: suggested }));
          this._lastSuggested.set(suggested);
        }
      });
    }, { allowSignalWrites: true });

    // 2. Enforce OIDC case standard: always sanitize whatever is typed into the clientId field.
    //    _rawClientId only re-notifies when clientId string actually changes → at most 2 runs.
    effect(() => {
      const raw = this._rawClientId();
      const sanitized = sanitizeClientId(raw);
      if (raw !== sanitized) {
        this.clientModel.update((m) => ({ ...m, clientId: sanitized }));
      }
    }, { allowSignalWrites: true });
  }

  // ── Form ─────────────────────────────────────────────────────────────────

  createClientMutation = httpMutation<CreateClientResponse>({
    request: () => this.apiService.createClient({
      name: this.clientModel().name,
      clientId: this.clientModel().clientId || undefined,
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
    return (
      this.clientForm.name().valid() &&
      this.clientForm.clientId().valid() &&
      this.clientForm.clientType().valid()
    );
  }

  async onSubmit() {
    if (!this.isFormValid()) return;
    await this.createClientMutation.trigger();
  }

  private parseUrls(value: string): string[] {
    return value
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u.length > 0);
  }
}


