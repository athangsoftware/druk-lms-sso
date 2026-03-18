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
  CreateRbacResourceRequest,
  CreateRbacResourceResponse,
  GetRbacResourceListResponse,
  UpdateRbacResourceRequest,
  UpdateRbacResourceResponse,
  DeleteRbacResourceResponse,
  CreateRbacActionRequest,
  CreateRbacActionResponse,
  GetRbacActionListResponse,
  UpdateRbacActionRequest,
  UpdateRbacActionResponse,
  DeleteRbacActionResponse,
  CreateRbacPermissionRequest,
  CreateRbacPermissionResponse,
  GetRbacPermissionListResponse,
  CreatePermissionGroupRequest,
  CreatePermissionGroupResponse,
  UpdatePermissionGroupRequest,
  UpdatePermissionGroupResponse,
  GetPermissionGroupListResponse,
  GetPermissionGroupResponse,
  CreateRbacRoleRequest,
  CreateRbacRoleResponse,
  UpdateRbacRoleRequest,
  UpdateRbacRoleResponse,
  GetRbacRoleListResponse,
  GetRbacRoleResponse,
  AssignRolePermissionsRequest,
  AssignRolePermissionsResponse,
  AssignUserRolesRequest,
  AssignUserRolesResponse,
  GetUserRoleListResponse,
  GetMyPermissionsResponse,
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

  // ─── RBAC Resource ────────────────────────────────────────────────

  getRbacResourceList(): Observable<GetRbacResourceListResponse> {
    return this.http.get<GetRbacResourceListResponse>(`${this.apiUrl}/rbac/resources`);
  }

  createRbacResource(request: CreateRbacResourceRequest): Observable<CreateRbacResourceResponse> {
    return this.http.post<CreateRbacResourceResponse>(`${this.apiUrl}/rbac/resources`, request);
  }

  updateRbacResource(id: string, request: UpdateRbacResourceRequest): Observable<UpdateRbacResourceResponse> {
    return this.http.put<UpdateRbacResourceResponse>(`${this.apiUrl}/rbac/resources/${id}`, request);
  }

  deleteRbacResource(id: string): Observable<DeleteRbacResourceResponse> {
    return this.http.delete<DeleteRbacResourceResponse>(`${this.apiUrl}/rbac/resources/${id}`);
  }

  // ─── RBAC Action ──────────────────────────────────────────────────

  getRbacActionList(): Observable<GetRbacActionListResponse> {
    return this.http.get<GetRbacActionListResponse>(`${this.apiUrl}/rbac/actions`);
  }

  createRbacAction(request: CreateRbacActionRequest): Observable<CreateRbacActionResponse> {
    return this.http.post<CreateRbacActionResponse>(`${this.apiUrl}/rbac/actions`, request);
  }

  updateRbacAction(id: string, request: UpdateRbacActionRequest): Observable<UpdateRbacActionResponse> {
    return this.http.put<UpdateRbacActionResponse>(`${this.apiUrl}/rbac/actions/${id}`, request);
  }

  deleteRbacAction(id: string): Observable<DeleteRbacActionResponse> {
    return this.http.delete<DeleteRbacActionResponse>(`${this.apiUrl}/rbac/actions/${id}`);
  }

  // ─── RBAC Permission ─────────────────────────────────────────────

  getRbacPermissionList(): Observable<GetRbacPermissionListResponse> {
    return this.http.get<GetRbacPermissionListResponse>(`${this.apiUrl}/rbac/permissions`);
  }

  createRbacPermission(request: CreateRbacPermissionRequest): Observable<CreateRbacPermissionResponse> {
    return this.http.post<CreateRbacPermissionResponse>(`${this.apiUrl}/rbac/permissions`, request);
  }

  // ─── RBAC Permission Group ────────────────────────────────────────

  getPermissionGroupList(): Observable<GetPermissionGroupListResponse> {
    return this.http.get<GetPermissionGroupListResponse>(`${this.apiUrl}/rbac/permission-groups`);
  }

  getPermissionGroup(id: string): Observable<GetPermissionGroupResponse> {
    return this.http.get<GetPermissionGroupResponse>(`${this.apiUrl}/rbac/permission-groups/${id}`);
  }

  createPermissionGroup(request: CreatePermissionGroupRequest): Observable<CreatePermissionGroupResponse> {
    return this.http.post<CreatePermissionGroupResponse>(`${this.apiUrl}/rbac/permission-groups`, request);
  }

  updatePermissionGroup(id: string, request: UpdatePermissionGroupRequest): Observable<UpdatePermissionGroupResponse> {
    return this.http.put<UpdatePermissionGroupResponse>(`${this.apiUrl}/rbac/permission-groups/${id}`, request);
  }

  // ─── RBAC Role ────────────────────────────────────────────────────

  getRbacRoleList(): Observable<GetRbacRoleListResponse> {
    return this.http.get<GetRbacRoleListResponse>(`${this.apiUrl}/rbac/roles`);
  }

  getRbacRole(id: string): Observable<GetRbacRoleResponse> {
    return this.http.get<GetRbacRoleResponse>(`${this.apiUrl}/rbac/roles/${id}`);
  }

  createRbacRole(request: CreateRbacRoleRequest): Observable<CreateRbacRoleResponse> {
    return this.http.post<CreateRbacRoleResponse>(`${this.apiUrl}/rbac/roles`, request);
  }

  updateRbacRole(id: string, request: UpdateRbacRoleRequest): Observable<UpdateRbacRoleResponse> {
    return this.http.put<UpdateRbacRoleResponse>(`${this.apiUrl}/rbac/roles/${id}`, request);
  }

  assignRolePermissions(roleId: string, request: AssignRolePermissionsRequest): Observable<AssignRolePermissionsResponse> {
    return this.http.post<AssignRolePermissionsResponse>(`${this.apiUrl}/rbac/roles/${roleId}/permissions`, request);
  }

  // ─── RBAC User Role ──────────────────────────────────────────────

  getUserRoleList(userId: string): Observable<GetUserRoleListResponse> {
    return this.http.get<GetUserRoleListResponse>(`${this.apiUrl}/rbac/users/${userId}/roles`);
  }

  assignUserRoles(userId: string, request: AssignUserRolesRequest): Observable<AssignUserRolesResponse> {
    return this.http.post<AssignUserRolesResponse>(`${this.apiUrl}/rbac/users/${userId}/roles`, request);
  }

  // ─── RBAC Me ────────────────────────────────────────────────────────

  getMyPermissions(): Observable<GetMyPermissionsResponse> {
    return this.http.get<GetMyPermissionsResponse>(`${this.apiUrl}/rbac/me/permissions`);
  }
}
