import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import type {
  CreateUserRequest,
  CreateUserResponse,
  DisableUserResponse,
  EnableUserResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GenerateSetPasswordLinkRequest,
  GenerateSetPasswordLinkResponse,
  GetRoleListResponse,
  GetUserListParams,
  GetUserListResponse,
  GetUserResponse,
  GetUserSelfResponse,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SetPasswordRequest,
  SetPasswordResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserSelfRequest,
  UpdateUserSelfResponse,
  GetNdiStatusParams,
  CreateClientRequest,
  CreateClientResponse,
  UpdateClientRequest,
  UpdateClientResponse,
  DeleteClientResponse,
  GetClientListParams,
  GetClientListResponse,
  GetClientResponse,
  DashboardStatsResponse,
  CreateIdentityProviderRequest,
  CreateIdentityProviderResponse,
  UpdateIdentityProviderRequest,
  UpdateIdentityProviderResponse,
  DeleteIdentityProviderResponse,
  ToggleIdentityProviderResponse,
  GetIdentityProviderListParams,
  GetIdentityProviderListResponse,
  GetIdentityProviderResponse,
  GetEnabledProvidersResponse,
  NdiRegisterWebhookResponse,
  NdiTestConnectionResponse,
  NdiWebhookStatusResponse,
} from './model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // ─── Auth ───────────────────────────────────────────────────────

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, request, { withCredentials: true });
  }

  forgotPassword(id: string, request: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.http.put<ForgotPasswordResponse>(`${this.apiUrl}/forgot-password/${id}`, request);
  }

  setPassword(request: SetPasswordRequest): Observable<SetPasswordResponse> {
    return this.http.post<SetPasswordResponse>(`${this.apiUrl}/users/set-password`, request);
  }

  resetPassword(request: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.put<ResetPasswordResponse>(`${this.apiUrl}/reset-password`, request);
  }

  // ─── User ───────────────────────────────────────────────────────

  getUserList(params?: GetUserListParams): Observable<GetUserListResponse> {
    return this.http.get<GetUserListResponse>(`${this.apiUrl}/users`, {
      params: params as Record<string, string>,
    });
  }

  createUser(request: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(`${this.apiUrl}/users`, request);
  }

  getUser(id: string): Observable<GetUserResponse> {
    return this.http.get<GetUserResponse>(`${this.apiUrl}/users/${id}`);
  }

  updateUser(id: string, request: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.http.put<UpdateUserResponse>(`${this.apiUrl}/users/${id}`, request);
  }

  enableUser(id: string): Observable<EnableUserResponse> {
    return this.http.put<EnableUserResponse>(`${this.apiUrl}/users/${id}/enable`, undefined);
  }

  disableUser(id: string): Observable<DisableUserResponse> {
    return this.http.put<DisableUserResponse>(`${this.apiUrl}/users/${id}/disable`, undefined);
  }

  getUserSelf(): Observable<GetUserSelfResponse> {
    return this.http.get<GetUserSelfResponse>(`${this.apiUrl}/users/me`);
  }

  updateUserSelf(request: UpdateUserSelfRequest): Observable<UpdateUserSelfResponse> {
    return this.http.put<UpdateUserSelfResponse>(`${this.apiUrl}/users/me`, request);
  }

  // ─── Roles ──────────────────────────────────────────────────────

  getRoleList(): Observable<GetRoleListResponse> {
    return this.http.get<GetRoleListResponse>(`${this.apiUrl}/roles`);
  }

  // ─── OIDC ───────────────────────────────────────────────────────

  getConfiguration(): Observable<any> {
    return this.http.get(`${this.apiUrl}/.well-known/openid-configuration`);
  }

  getJwks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/.well-known/jwks.json`);
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/protocol/openid-connect/userinfo`);
  }

  checkSession(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/session/check`);
  }

  // ─── NDI ────────────────────────────────────────────────────────

  getNdiStatus(params: GetNdiStatusParams): Observable<any> {
    return this.http.get(`${this.apiUrl}/ndi/status`, {
      params: params as unknown as Record<string, string>,
    });
  }

  ndiRegisterWebhook(): Observable<NdiRegisterWebhookResponse> {
    return this.http.post<NdiRegisterWebhookResponse>(`${this.apiUrl}/identity-providers/ndi/register-webhook`, {});
  }

  ndiTestConnection(): Observable<NdiTestConnectionResponse> {
    return this.http.post<NdiTestConnectionResponse>(`${this.apiUrl}/identity-providers/ndi/test-connection`, {});
  }

  ndiWebhookStatus(limit = 10): Observable<NdiWebhookStatusResponse> {
    return this.http.get<NdiWebhookStatusResponse>(`${this.apiUrl}/identity-providers/ndi/webhook-status`, {
      params: { limit: limit.toString() },
    });
  }

  // ─── External ──────────────────────────────────────────────────

  generateSetPasswordLink(request: GenerateSetPasswordLinkRequest): Observable<GenerateSetPasswordLinkResponse> {
    return this.http.post<GenerateSetPasswordLinkResponse>(
      `${this.apiUrl}/external/generate-set-password-link`,
      request,
    );
  }

  // ─── Client ────────────────────────────────────────────────────

  getClientList(params?: GetClientListParams): Observable<GetClientListResponse> {
    return this.http.get<GetClientListResponse>(`${this.apiUrl}/clients`, {
      params: params as Record<string, string>,
    });
  }

  createClient(request: CreateClientRequest): Observable<CreateClientResponse> {
    return this.http.post<CreateClientResponse>(`${this.apiUrl}/clients`, request);
  }

  getClient(id: string): Observable<GetClientResponse> {
    return this.http.get<GetClientResponse>(`${this.apiUrl}/clients/${id}`);
  }

  updateClient(id: string, request: UpdateClientRequest): Observable<UpdateClientResponse> {
    return this.http.put<UpdateClientResponse>(`${this.apiUrl}/clients/${id}`, request);
  }

  deleteClient(id: string): Observable<DeleteClientResponse> {
    return this.http.delete<DeleteClientResponse>(`${this.apiUrl}/clients/${id}`);
  }

  // ─── Dashboard ─────────────────────────────────────────────────

  getDashboardStats(): Observable<DashboardStatsResponse> {
    return this.http.get<DashboardStatsResponse>(`${this.apiUrl}/dashboard/stats`);
  }

  // ─── Identity Provider ─────────────────────────────────────────

  getIdentityProviderList(params?: GetIdentityProviderListParams): Observable<GetIdentityProviderListResponse> {
    return this.http.get<GetIdentityProviderListResponse>(`${this.apiUrl}/identity-providers`, {
      params: params as Record<string, string>,
    });
  }

  createIdentityProvider(request: CreateIdentityProviderRequest): Observable<CreateIdentityProviderResponse> {
    return this.http.post<CreateIdentityProviderResponse>(`${this.apiUrl}/identity-providers`, request);
  }

  getIdentityProvider(id: string): Observable<GetIdentityProviderResponse> {
    return this.http.get<GetIdentityProviderResponse>(`${this.apiUrl}/identity-providers/${id}`);
  }

  updateIdentityProvider(id: string, request: UpdateIdentityProviderRequest): Observable<UpdateIdentityProviderResponse> {
    return this.http.put<UpdateIdentityProviderResponse>(`${this.apiUrl}/identity-providers/${id}`, request);
  }

  deleteIdentityProvider(id: string): Observable<DeleteIdentityProviderResponse> {
    return this.http.delete<DeleteIdentityProviderResponse>(`${this.apiUrl}/identity-providers/${id}`);
  }

  toggleIdentityProvider(id: string): Observable<ToggleIdentityProviderResponse> {
    return this.http.put<ToggleIdentityProviderResponse>(`${this.apiUrl}/identity-providers/${id}/toggle`, undefined);
  }

  getEnabledProviders(): Observable<GetEnabledProvidersResponse> {
    return this.http.get<GetEnabledProvidersResponse>(`${this.apiUrl}/identity-providers/enabled`);
  }
}
