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
  { name: 'create' },
  { name: 'read' },
  { name: 'update' },
  { name: 'delete' },
  { name: 'assign' },
];

// Permission groups for UI display
export const permissionGroupSeeds = [
  { name: 'User Management', description: 'Manage users, roles, and access' },
  { name: 'Client Management', description: 'Manage OAuth clients' },
  { name: 'Identity Provider', description: 'Manage identity providers and SSO' },
  { name: 'System', description: 'System configuration and monitoring' },
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
  'user.read',
  'user.update',
  'user.delete',
  // Role
  'role.create',
  'role.read',
  'role.update',
  'role.assign',
  // Client
  'client.create',
  'client.read',
  'client.update',
  'client.delete',
  // Auth
  'auth.read',
  // Identity Provider
  'identity-provider.create',
  'identity-provider.read',
  'identity-provider.update',
  'identity-provider.delete',
  // Dashboard
  'dashboard.read',
  // Permission
  'permission.create',
  'permission.read',
  // Resource
  'resource.create',
  'resource.read',
  // Action
  'action.create',
  'action.read',
];

// Role hierarchy + permission mapping
export const roleSeeds = [
  {
    name: 'USER',
    parentRoleName: null,
    permissions: [
      'user.read',
      'dashboard.read',
    ],
  },
  {
    name: 'MODERATOR',
    parentRoleName: 'USER',
    permissions: [
      'user.create',
      'user.update',
      'client.read',
      'role.read',
      'identity-provider.read',
      'permission.read',
      'resource.read',
      'action.read',
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
      'auth.read',
    ],
  },
];
