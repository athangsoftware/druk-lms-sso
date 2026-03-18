import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { AuthHelperService } from '@core/auth-helper.service';
import { roleGuard } from '@core/role.guard';

const mainRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthHelperService);
  const router = inject(Router);
  return authService.isMember()
    ? router.createUrlTree(['/main/my-profile'])
    : router.createUrlTree(['/main/dashboard']);
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'callback',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'set-password/:token',
    loadComponent: () => import('./pages/set-password/set-password.component').then((m) => m.SetPasswordComponent),
  },
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.component').then((m) => m.MainComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [mainRedirectGuard],
        children: [],
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/main/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        data: { permissions: ['dashboard.read'] },
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/main/user-list/user-list.component').then((m) => m.UserListComponent),
        data: { permissions: ['user.read'] },
      },
      {
        path: 'my-profile',
        loadComponent: () =>
          import('./pages/main/account-setting/my-profile/my-profile.component').then(
            (m) => m.MyProfileComponent,
          ),
        data: { permissions: ['user.read'] },
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./pages/main/clients/clients.component').then((m) => m.ClientsComponent),
        data: { permissions: ['client.read'] },
      },
      {
        path: 'identity-providers',
        loadComponent: () =>
          import('./pages/main/identity-providers/identity-providers.component').then((m) => m.IdentityProvidersComponent),
        data: { permissions: ['identity-provider.read'] },
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./pages/main/roles/roles.component').then((m) => m.RolesComponent),
        data: { permissions: ['role.read'] },
      },
      {
        path: 'permissions',
        loadComponent: () =>
          import('./pages/main/permissions/permissions.component').then((m) => m.PermissionsComponent),
        data: { permissions: ['permission.read'] },
      },
      {
        path: 'permission-groups',
        loadComponent: () =>
          import('./pages/main/permission-groups/permission-groups.component').then((m) => m.PermissionGroupsComponent),
        data: { permissions: ['permission.read'] },
      },
      {
        path: 'resources',
        loadComponent: () =>
          import('./pages/main/resources/resources.component').then((m) => m.ResourcesComponent),
        data: { permissions: ['resource.read'] },
      },
      {
        path: 'actions',
        loadComponent: () =>
          import('./pages/main/actions/actions.component').then((m) => m.ActionsComponent),
        data: { permissions: ['action.read'] },
      },
    ],
  },
  {
    path: 'callback',
    loadComponent: () => import('./core/callback/callback.component').then((m) => m.CallbackComponent),
  },
  {
    path: 'logout',
    loadComponent: () => import('./pages/logout/logout.component').then((m) => m.LogoutComponent),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent),
  },
];
