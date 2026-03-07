import { Routes } from '@angular/router';
import { roleGuard } from '@core/role.guard';

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
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/main/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/main/user-list/user-list.component').then((m) => m.UserListComponent),
        canActivate: [roleGuard],
        data: { roles: ['modrator'] },
      },
      {
        path: 'my-profile',
        loadComponent: () =>
          import('./pages/main/account-setting/my-profile/my-profile.component').then(
            (m) => m.MyProfileComponent,
          ),
        canActivate: [roleGuard],
        data: { roles: ['member', 'modrator'] },
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./pages/main/clients/clients.component').then((m) => m.ClientsComponent),
        canActivate: [roleGuard],
        data: { roles: ['modrator'] },
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
