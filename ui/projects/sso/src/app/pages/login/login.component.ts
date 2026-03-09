import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { Button, OverlayStore, TextInputComponent, httpMutation, httpQuery } from '@projects/shared-lib';
import { LoginResponse, EnabledProvider, GetEnabledProvidersResponse } from '@core/api/model';
import { ApiService } from '@core/api/api.service';
import { OAuthService } from '@core/oauth.service';
import { BhutanNdiComponent } from './bhutan-ndi/bhutan-ndi.component';
import { environment } from '@environments/environment';

interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormField, TextInputComponent, Button],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private apiService = inject(ApiService);
  private authService = inject(OAuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  overlayService = inject(OverlayStore);

  enabledProviders = signal<EnabledProvider[]>([]);

  providersQuery = httpQuery<GetEnabledProvidersResponse>({
    request: () => `${environment.apiUrl}/identity-providers/enabled`,
    handleSuccess: false,
    handleError: false,
    onSuccess: (response) => {
      this.enabledProviders.set(response.data ?? []);
    },
  });

  loginModel = signal<LoginData>({ username: '', password: '' });

  loginForm = form(this.loginModel, (s) => {
    required(s.username);
    required(s.password);
  });

  loginMutation = httpMutation<LoginResponse>({
    request: () => {
      const { username, password } = this.loginModel();
      const queryParams = this.route.snapshot.queryParams;
      const { client_id, redirect_uri, code_challenge, code_challenge_method, state } = queryParams;
      return this.apiService.login({
        username,
        password,
        client_id,
        redirect_uri,
        code_challenge,
        code_challenge_method,
        ...(state && { state }),
      } as any);
    },
    handleError: true,
    handleSuccess: false,
    onSuccess: (response) => {
      if (response.redirectUrl) {
        window.location.href = response.redirectUrl;
      } else {
        this.router.navigate(['/']);
      }
    },
  });

  isFormValid() {
    return this.loginForm.username().valid() && this.loginForm.password().valid();
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.isFormValid()) return;
    await this.loginMutation.trigger();
  }

  loginWithProvider(provider: EnabledProvider): void {
    if (provider.slug === 'bhutan-ndi') {
      this.overlayService.openModal(BhutanNdiComponent, { disableClose: false });
    } else {
      this.authService.initiateProviderLogin(provider.slug);
    }
  }
}
