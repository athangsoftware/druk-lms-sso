// ─── Auth ─────────────────────────────────────────────────────────

export interface LoginRequest {
  username: string;
  password: string;
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  state?: string;
}

export interface LoginResponse {
  redirectUrl: string;
}

export interface ForgotPasswordRequest {
  [key: string]: unknown;
}

export interface ForgotPasswordResponse {
  successMessage: string;
}

export interface SetPasswordRequest {
  token: string;
  password: string;
}

export interface SetPasswordResponse {
  successMessage: string;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  successMessage: string;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// ─── User ─────────────────────────────────────────────────────────

export const UserRole = {
  MEMBER: 'MEMBER',
  MODRATOR: 'MODRATOR',
  DEV: 'DEV',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export interface CreateUserRequest {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  username?: string;
  password?: string;
  role?: UserRoleType;
}

export interface CreateUserResponse {
  successMessage: string;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: string;
  };
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
}

export interface UpdateUserResponse {
  successMessage: string;
}

export interface UpdateUserSelfRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface UpdateUserSelfResponse {
  successMessage: string;
}

export interface GetUserListParams {
  pageNumber?: number;
  pageSize?: number;
  sortingDirection?: string;
  orderByPropertyName?: string;
  search?: string;
  firstNameValue?: string;
  firstNameOperation?: string;
  lastNameValue?: string;
  lastNameOperation?: string;
  emailValue?: string;
  emailOperation?: string;
  roleIdValue?: string[];
  roleIdOperation?: string;
  phoneNumberValue?: string;
  phoneNumberOperation?: string;
  isActiveValue?: string;
}

export interface GetUserListItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdDate: string;
  isActive: boolean;
  roleId: string;
  roleName: string;
}

export interface GetUserListResponse {
  successMessage: string;
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  orderByPropertyName: string;
  sortingDirection: string;
  data: GetUserListItem[];
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface GetUserResponse {
  successMessage: string;
  data?: UserData;
}

export interface GetUserSelfResponse {
  successMessage: string;
  data?: UserData;
}

export interface EnableUserResponse {
  successMessage: string;
}

export interface DisableUserResponse {
  successMessage: string;
}

// ─── Role ─────────────────────────────────────────────────────────

export interface RoleItem {
  id?: string;
  name?: string;
}

export interface GetRoleListResponse {
  successMessage: string;
  data: RoleItem[];
}

// ─── OIDC ─────────────────────────────────────────────────────────

export interface AuthorizeParams {
  response_type: string;
  client_id: string;
  redirect_uri: string;
  scope?: string;
  state?: string;
  code_challenge?: string;
  code_challenge_method?: string;
}

export interface AuthorizeResponse {
  [key: string]: unknown;
}

export interface TokenRequest {
  grant_type: string;
  code?: string;
  redirect_uri?: string;
  client_id?: string;
  code_verifier?: string;
  refresh_token?: string;
}

export interface TokenResponse {
  access_token: string;
  id_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
}

export interface ConfigurationResponse {
  [key: string]: unknown;
}

export interface JwksItem {
  kty: string;
  n: string;
  e: string;
  kid?: string;
  use?: string;
  alg?: string;
}

export interface JwksResponse {
  keys: JwksItem[];
}

export interface UserInfoResponse {
  [key: string]: unknown;
}

export interface LogoutParams {
  id_token_hint?: string;
  post_logout_redirect_uri?: string;
}

// ─── NDI ──────────────────────────────────────────────────────────

export interface NdiSignInParams {
  client_id: string;
  redirect_uri: string;
  code_challenge: string;
  code_challenge_method: string;
  state?: string;
  response_type: string;
  scope: string;
}

export interface GetNdiStatusParams {
  threadId: string;
}

export interface BhutanNdiCallbackResponse {
  [key: string]: unknown;
}

export interface NdiRegisterWebhookResponse {
  successMessage: string;
  data?: any;
}

export interface NdiTestConnectionResponse {
  successMessage: string;
  data: { connected: boolean };
}

export interface NdiWebhookLogItem {
  id: string;
  proofRequestId: string;
  processedAt: string;
  createdAt: string;
}

export interface NdiWebhookStatusResponse {
  successMessage: string;
  data: {
    totalWebhookLogs: number;
    recentLogs: NdiWebhookLogItem[];
  };
}

// ─── External ─────────────────────────────────────────────────────

export interface CreateUserExternalRequest {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  username?: string;
  password?: string;
  role?: UserRoleType;
}

export interface CreateUserExternalResponse {
  successMessage: string;
  data?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    username: string;
    isActive: boolean;
    isVerified: boolean;
    ndiIdentifier?: string;
    role: string;
  };
}

// ─── Client ───────────────────────────────────────────────────────

export type ClientType = 'PUBLIC' | 'CONFIDENTIAL';

export interface CreateClientRequest {
  name: string;
  clientId?: string;
  clientType?: ClientType;
  disableStrictUrlValidation?: boolean;
  redirectUrls?: string[];
  postLogoutRedirectUrls?: string[];
}

export interface CreateClientResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    clientId: string;
    clientSecret: string | null;
    clientType: string;
  };
}

export interface UpdateClientRequest {
  name?: string;
  clientType?: ClientType;
  disableStrictUrlValidation?: boolean;
  redirectUrls?: string[];
  postLogoutRedirectUrls?: string[];
}

export interface UpdateClientResponse {
  successMessage: string;
}

export interface DeleteClientResponse {
  successMessage: string;
}

export interface GetClientListParams {
  pageNumber?: number;
  pageSize?: number;
  sortingDirection?: string;
  orderByPropertyName?: string;
  search?: string;
  nameValue?: string;
  nameOperation?: string;
  clientIdValue?: string;
  clientIdOperation?: string;
  clientTypeValue?: string;
}

export interface GetClientListItem {
  id: string;
  name: string;
  clientId: string;
  clientType: string;
  disableStrictUrlValidation: boolean;
  redirectUrls: string[];
  postLogoutRedirectUrls: string[];
  createdAt: string;
}

export interface GetClientListResponse {
  successMessage: string;
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  orderByPropertyName: string;
  sortingDirection: string;
  data: GetClientListItem[];
}

export interface GetClientResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    clientId: string;
    clientSecret: string | null;
    clientType: string;
    disableStrictUrlValidation: boolean;
    redirectUrls: string[];
    postLogoutRedirectUrls: string[];
    createdAt: string;
  };
}


export interface GenerateSetPasswordLinkRequest {
  email: string;
  redirectUrl: string;
}

export interface GenerateSetPasswordLinkResponse {
  successMessage: string;
}

// ─── Dashboard ────────────────────────────────────────────────────

export interface DashboardUsersByRoleItem {
  role: string;
  count: number;
}

export interface DashboardLoginActivityItem {
  date: string;
  count: number;
}

export interface DashboardRecentUserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface DashboardStatsResponse {
  successMessage: string;
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  verifiedUsers: number;
  totalClients: number;
  publicClients: number;
  confidentialClients: number;
  activeSessions: number;
  usersByRole: DashboardUsersByRoleItem[];
  loginActivityLast7Days: DashboardLoginActivityItem[];
  recentUsers: DashboardRecentUserItem[];
}

// ─── Google ───────────────────────────────────────────────────────

export interface GoogleSignInParams {
  response_type: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  state?: string;
  code_challenge?: string;
  code_challenge_method?: string;
}

export interface GoogleCallbackParams {
  code: string;
  state?: string;
}

// ─── Identity Provider ───────────────────────────────────────────

export type IdentityProviderType = 'GOOGLE' | 'NDI' | 'OIDC' | 'CUSTOM';

export interface CreateIdentityProviderRequest {
  name: string;
  slug?: string;
  type?: IdentityProviderType;
  clientId?: string;
  clientSecret?: string;
  authorizationUrl?: string;
  tokenUrl?: string;
  userInfoUrl?: string;
  redirectUrl?: string;
  scopes?: string;
  iconUrl?: string;
  isEnabled?: boolean;
  displayOrder?: number;
  metadata?: any;
}

export interface CreateIdentityProviderResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    slug: string;
    type: string;
    isEnabled: boolean;
  };
}

export interface UpdateIdentityProviderRequest {
  name?: string;
  type?: IdentityProviderType;
  clientId?: string;
  clientSecret?: string;
  authorizationUrl?: string;
  tokenUrl?: string;
  userInfoUrl?: string;
  redirectUrl?: string;
  scopes?: string;
  iconUrl?: string;
  isEnabled?: boolean;
  displayOrder?: number;
  metadata?: any;
}

export interface UpdateIdentityProviderResponse {
  successMessage: string;
}

export interface DeleteIdentityProviderResponse {
  successMessage: string;
}

export interface ToggleIdentityProviderResponse {
  successMessage: string;
}

export interface GetIdentityProviderListParams {
  pageNumber?: number;
  pageSize?: number;
  sortingDirection?: string;
  orderByPropertyName?: string;
  search?: string;
  nameValue?: string;
  nameOperation?: string;
  slugValue?: string;
  slugOperation?: string;
  typeValue?: string;
  isEnabledValue?: string;
}

export interface GetIdentityProviderListItem {
  id: string;
  name: string;
  slug: string;
  type: string;
  iconUrl: string | null;
  isEnabled: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface GetIdentityProviderListResponse {
  successMessage: string;
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  orderByPropertyName: string;
  sortingDirection: string;
  data: GetIdentityProviderListItem[];
}

export interface GetIdentityProviderResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    slug: string;
    type: string;
    clientId: string | null;
    authorizationUrl: string | null;
    tokenUrl: string | null;
    userInfoUrl: string | null;
    redirectUrl: string | null;
    scopes: string | null;
    iconUrl: string | null;
    isEnabled: boolean;
    displayOrder: number;
    metadata: any;
    hasClientSecret: boolean;
    createdAt: string;
  };
}

export interface EnabledProvider {
  id: string;
  name: string;
  slug: string;
  type: IdentityProviderType;
  iconUrl: string | null;
  displayOrder: number;
}

export interface GetEnabledProvidersResponse {
  data: EnabledProvider[];
}

// ─── RBAC Resource ────────────────────────────────────────────────

export interface CreateRbacResourceRequest {
  name: string;
}

export interface CreateRbacResourceResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    createdAt: string;
  };
}

export interface RbacResourceItem {
  id: string;
  name: string;
  createdAt: string;
}

export interface GetRbacResourceListResponse {
  successMessage: string;
  data: RbacResourceItem[];
}

export interface UpdateRbacResourceRequest {
  name?: string;
}

export interface UpdateRbacResourceResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    createdAt: string;
  };
}

export interface DeleteRbacResourceResponse {
  successMessage: string;
}

// ─── RBAC Action ──────────────────────────────────────────────────

export interface CreateRbacActionRequest {
  name: string;
}

export interface CreateRbacActionResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    createdAt: string;
  };
}

export interface RbacActionItem {
  id: string;
  name: string;
  createdAt: string;
}

export interface GetRbacActionListResponse {
  successMessage: string;
  data: RbacActionItem[];
}

export interface UpdateRbacActionRequest {
  name?: string;
}

export interface UpdateRbacActionResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    createdAt: string;
  };
}

export interface DeleteRbacActionResponse {
  successMessage: string;
}

// ─── RBAC Permission ─────────────────────────────────────────────

export interface CreateRbacPermissionRequest {
  resourceId: string;
  actionId: string;
  groupId?: string;
}

export interface RbacPermissionItem {
  id: string;
  resourceId: string;
  actionId: string;
  groupId: string | null;
  resourceName: string;
  actionName: string;
  groupName: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface CreateRbacPermissionResponse {
  successMessage: string;
  data?: RbacPermissionItem;
}

export interface GetRbacPermissionListResponse {
  successMessage: string;
  data: RbacPermissionItem[];
}

// ─── RBAC Permission Group ───────────────────────────────────────

export interface CreatePermissionGroupRequest {
  name: string;
  description?: string;
}

export interface CreatePermissionGroupResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
  };
}

export interface UpdatePermissionGroupRequest {
  name?: string;
  description?: string;
}

export interface UpdatePermissionGroupResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
  };
}

export interface PermissionGroupPermissionItem {
  id: string;
  resourceId: string;
  actionId: string;
  groupId: string | null;
  resourceName: string;
  actionName: string;
  isActive: boolean;
  createdAt: string;
}

export interface PermissionGroupItem {
  id: string;
  name: string;
  description: string | null;
  permissions: PermissionGroupPermissionItem[];
  createdAt: string;
}

export interface GetPermissionGroupListResponse {
  successMessage: string;
  data: PermissionGroupItem[];
}

export interface GetPermissionGroupResponse {
  successMessage: string;
  data?: PermissionGroupItem;
}

// ─── RBAC Role ────────────────────────────────────────────────────

export interface CreateRbacRoleRequest {
  name: string;
  parentRoleId?: string;
}

export interface RbacRoleChildItem {
  id: string;
  name: string;
  parentRoleId: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface RbacRoleItem {
  id: string;
  name: string;
  parentRoleId: string | null;
  parentRoleName: string | null;
  isActive: boolean;
  createdAt: string;
  permissions: string[];
  children: RbacRoleChildItem[];
}

export interface CreateRbacRoleResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    parentRoleId: string | null;
    parentRoleName: string | null;
    isActive: boolean;
    createdAt: string;
  };
}

export interface UpdateRbacRoleRequest {
  name?: string;
  parentRoleId?: string | null;
  isActive?: boolean;
}

export interface UpdateRbacRoleResponse {
  successMessage: string;
  data?: {
    id: string;
    name: string;
    parentRoleId: string | null;
    parentRoleName: string | null;
    isActive: boolean;
    createdAt: string;
  };
}

export interface GetRbacRoleListResponse {
  successMessage: string;
  data: RbacRoleItem[];
}

export interface GetRbacRoleResponse {
  successMessage: string;
  data?: RbacRoleItem;
}

export interface AssignRolePermissionsRequest {
  permissionIds: string[];
}

export interface AssignRolePermissionsResponse {
  successMessage: string;
}

// ─── RBAC User Role ──────────────────────────────────────────────

export interface AssignUserRolesRequest {
  roleIds: string[];
}

export interface AssignUserRolesResponse {
  successMessage: string;
}

export interface GetUserRoleListResponse {
  successMessage: string;
  data?: {
    userId: string;
    roles: string[];
    permissions: string[];
  };
}

// ─── Column Filters ──────────────────────────────────────────────

export interface ColumnFilter {
  value?: string;
  operation?: string;
}

export interface ColumnFilters {
  firstName?: ColumnFilter;
  lastName?: ColumnFilter;
  email?: ColumnFilter;
  roleId?: ColumnFilter;
}
