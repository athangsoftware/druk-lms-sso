import { Routes } from '@angular/router';
import { authGuard } from '@core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
      {
        path: 'dashboards',
        loadComponent: () =>
          import('./pages/main/dashboard-list/dashboard-list.component').then(
            (m) => m.DashboardListComponent,
          ),
      },
      {
        path: 'dashboards/create',
        loadComponent: () =>
          import('./pages/main/dashboard-form/dashboard-form.component').then(
            (m) => m.DashboardFormComponent,
          ),
      },
      {
        path: 'dashboards/:id',
        loadComponent: () =>
          import('./pages/main/dashboard-view/dashboard-view.component').then(
            (m) => m.DashboardViewComponent,
          ),
      },
      {
        path: 'dashboards/:id/edit',
        loadComponent: () =>
          import('./pages/main/dashboard-form/dashboard-form.component').then(
            (m) => m.DashboardFormComponent,
          ),
      },
      {
        path: 'charts',
        loadComponent: () =>
          import('./pages/main/chart-list/chart-list.component').then((m) => m.ChartListComponent),
      },
      {
        path: 'charts/create',
        loadComponent: () =>
          import('./pages/main/chart-create/chart-create.component').then(
            (m) => m.ChartCreateComponent,
          ),
      },
      {
        path: 'charts/:id',
        loadComponent: () =>
          import('./pages/main/chart-view/chart-view.component').then((m) => m.ChartViewComponent),
      },
      {
        path: 'charts/:id/edit',
        loadComponent: () =>
          import('./pages/main/chart-edit/chart-edit.component').then((m) => m.ChartEditComponent),
      },
      {
        path: 'db-connections',
        loadComponent: () =>
          import('./pages/main/db-connection-list/db-connection-list.component').then(
            (m) => m.DbConnectionListComponent,
          ),
      },
      {
        path: 'ai-providers',
        loadComponent: () =>
          import('./pages/main/ai-provider-list/ai-provider-list.component').then(
            (m) => m.AiProviderListComponent,
          ),
      },
    ],
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent),
  },
  {
    path: 'callback',
    loadComponent: () =>
      import('./core/callback/callback.component').then((m) => m.CallbackComponent),
  },
  { path: '**', redirectTo: 'main' },
];
