/**
 * RBAC Seed Data
 *
 * Default resources, actions, permissions, and roles for the RBAC system.
 */

// Default resources (modules/entities)
export const resourceSeeds = [
  { name: 'user' },
  { name: 'role' },
  { name: 'client' },
  { name: 'auth' },
  { name: 'identity-provider' },
  { name: 'dashboard' },
  { name: 'permission' },
  { name: 'resource' },
  { name: 'action' },
];

// Default actions (operations)
export const actionSeeds = [
  // CRUD
  { name: 'create' },
  { name: 'update' },
  { name: 'delete' },
  { name: 'list' },

  // Data operations
  { name: 'export' },
  { name: 'import' },
  { name: 'download' },
  { name: 'upload' },
  { name: 'share' },
  { name: 'duplicate' },
  { name: 'archive' },
  { name: 'restore' },

  // Access management
  { name: 'assign' },
  { name: 'revoke' },
  { name: 'approve' },
  { name: 'reject' },
  { name: 'invite' },
  { name: 'remove' },

  // System operations
  { name: 'configure' },
  { name: 'manage' },
  { name: 'execute' },
  { name: 'trigger' },
  { name: 'sync' },

  // Wildcard
  { name: '*' },
];

// Permission groups for UI display
export const permissionGroupSeeds = [
  { name: 'User Management', description: 'Manage users, roles, and access', clientId: 'iam' },
  { name: 'Client Management', description: 'Manage OAuth clients', clientId: 'iam' },
  { name: 'Identity Provider', description: 'Manage identity providers and SSO', clientId: 'iam' },
  { name: 'System', description: 'System configuration and monitoring', clientId: 'iam' },
];

// Map permission prefixes to group names
export const permissionGroupMapping: Record<string, string> = {
  'user': 'User Management',
  'role': 'User Management',
  'auth': 'System',
  'client': 'Client Management',
  'identity-provider': 'Identity Provider',
  'dashboard': 'System',
  'permission': 'System',
  'resource': 'System',
  'action': 'System',
};

// Permissions as "resource.action" pairs
export const permissionSeeds = [
  // User
  'user.create',
  'user.list',
  'user.update',
  'user.delete',
  // Role
  'role.create',
  'role.list',
  'role.update',
  'role.assign',
  // Client
  'client.create',
  'client.list',
  'client.update',
  'client.delete',
  // Auth
  'auth.list',
  // Identity Provider
  'identity-provider.create',
  'identity-provider.list',
  'identity-provider.update',
  'identity-provider.delete',
  // Dashboard
  'dashboard.list',
  // Permission
  'permission.create',
  'permission.list',
  // Resource
  'resource.create',
  'resource.list',
  // Action
  'action.create',
  'action.list',
  // Wildcard (ALL) permissions
  'user.*',
  'role.*',
  'client.*',
  'auth.*',
  'identity-provider.*',
  'dashboard.*',
  'permission.*',
  'resource.*',
  'action.*',
];

// Role hierarchy + permission mapping
export const roleSeeds = [
  {
    name: 'USER',
    parentRoleName: null,
    permissions: [
      'user.list',
      'dashboard.list',
    ],
  },
  {
    name: 'MODERATOR',
    parentRoleName: 'USER',
    permissions: [
      'user.create',
      'user.update',
      'client.list',
      'role.list',
      'identity-provider.list',
      'permission.list',
      'resource.list',
      'action.list',
    ],
  },
  {
    name: 'ADMIN',
    parentRoleName: 'MODERATOR',
    permissions: [
      'user.delete',
      'client.create',
      'client.update',
      'client.delete',
      'role.create',
      'role.update',
      'role.assign',
      'identity-provider.create',
      'identity-provider.update',
      'identity-provider.delete',
    ],
  },
  {
    name: 'SUPER_ADMIN',
    parentRoleName: 'ADMIN',
    permissions: [
      'permission.create',
      'resource.create',
      'action.create',
      'auth.list',
      'user.*',
      'role.*',
      'client.*',
      'auth.*',
      'identity-provider.*',
      'dashboard.*',
      'permission.*',
      'resource.*',
      'action.*',
    ],
  },
];
