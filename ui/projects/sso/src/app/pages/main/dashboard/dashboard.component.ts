import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@core/api/api.service';
import {
  DashboardStatsResponse,
} from '@core/api/model';
import { httpQuery } from '@projects/shared-lib';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-8">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-sm text-gray-500 mt-1">System overview and activity summary</p>
      </div>

      <!-- Loading state -->
      @if (stats.isLoading()) {
        <div class="flex items-center justify-center h-48">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      }

      <!-- Error state -->
      @if (isError()) {
        <div class="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          Failed to load dashboard data. Please try again later.
        </div>
      }

      @if (stats.value(); as data) {
        <!-- ─── Summary Stat Cards ─────────────────────────────── -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <!-- Total Users -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Users</p>
            <p class="mt-2 text-3xl font-bold text-gray-900">{{ data.totalUsers }}</p>
            <div class="mt-3 flex gap-3 text-xs text-gray-500">
              <span class="flex items-center gap-1">
                <span class="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                {{ data.activeUsers }} active
              </span>
              <span class="flex items-center gap-1">
                <span class="inline-block w-2 h-2 rounded-full bg-gray-300"></span>
                {{ data.inactiveUsers }} inactive
              </span>
            </div>
          </div>

          <!-- Verified Users -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Verified Users</p>
            <p class="mt-2 text-3xl font-bold text-gray-900">{{ data.verifiedUsers }}</p>
            <p class="mt-3 text-xs text-gray-500">
              {{ verifiedPercent() }}% of all users
            </p>
          </div>

          <!-- Clients -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">OAuth Clients</p>
            <p class="mt-2 text-3xl font-bold text-gray-900">{{ data.totalClients }}</p>
            <div class="mt-3 flex gap-3 text-xs text-gray-500">
              <span>{{ data.publicClients }} public</span>
              <span>{{ data.confidentialClients }} confidential</span>
            </div>
          </div>

          <!-- Active Sessions -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Sessions</p>
            <p class="mt-2 text-3xl font-bold text-gray-900">{{ data.activeSessions }}</p>
            <p class="mt-3 text-xs text-gray-500">Valid refresh tokens</p>
          </div>
        </div>

        <!-- ─── Charts Row ────────────────────────────────────── -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Users by Role Chart -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 class="text-sm font-semibold text-gray-700 mb-4">Users by Role</h2>
            @if (data.usersByRole.length === 0) {
              <p class="text-sm text-gray-400">No data</p>
            } @else {
              <div class="space-y-3">
                @for (item of data.usersByRole; track item.role) {
                  <div>
                    <div class="flex justify-between text-xs text-gray-600 mb-1">
                      <span class="font-medium">{{ item.role }}</span>
                      <span>{{ item.count }}</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        class="h-2.5 rounded-full bg-blue-500"
                        [style.width.%]="roleBarWidth(item.count)"
                      ></div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Login Activity Last 7 Days -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 class="text-sm font-semibold text-gray-700 mb-4">Logins – Last 7 Days</h2>
            @if (maxLoginCount() === 0) {
              <p class="text-sm text-gray-400">No login activity in the past 7 days</p>
            } @else {
              <div class="flex items-end justify-between gap-1 h-28">
                @for (item of data.loginActivityLast7Days; track item.date) {
                  <div class="flex flex-col items-center flex-1 gap-1">
                    <span class="text-xs text-gray-500 font-medium">{{ item.count || '' }}</span>
                    <div
                      class="w-full rounded-t-sm bg-blue-400 transition-all"
                      [style.height.%]="loginBarHeight(item.count)"
                      style="min-height: 2px;"
                    ></div>
                    <span class="text-[10px] text-gray-400 rotate-45 origin-left mt-1 whitespace-nowrap">
                      {{ item.date | date: 'MMM d' }}
                    </span>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <!-- ─── Recent Users Table ────────────────────────────── -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 class="text-sm font-semibold text-gray-700 mb-4">Recently Registered Users</h2>
          @if (data.recentUsers.length === 0) {
            <p class="text-sm text-gray-400">No users found.</p>
          } @else {
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead>
                  <tr class="border-b border-gray-100">
                    <th class="pb-3 font-medium text-gray-500 text-xs uppercase pr-4">Name</th>
                    <th class="pb-3 font-medium text-gray-500 text-xs uppercase pr-4">Email</th>
                    <th class="pb-3 font-medium text-gray-500 text-xs uppercase pr-4">Role</th>
                    <th class="pb-3 font-medium text-gray-500 text-xs uppercase pr-4">Status</th>
                    <th class="pb-3 font-medium text-gray-500 text-xs uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  @for (user of data.recentUsers; track user.id) {
                    <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td class="py-3 pr-4 font-medium text-gray-800">
                        {{ user.firstName }} {{ user.lastName }}
                      </td>
                      <td class="py-3 pr-4 text-gray-600">{{ user.email }}</td>
                      <td class="py-3 pr-4">
                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                          [ngClass]="roleBadgeClass(user.role)">
                          {{ user.role }}
                        </span>
                      </td>
                      <td class="py-3 pr-4">
                        @if (user.isActive) {
                          <span class="inline-flex items-center gap-1 text-xs text-green-700">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
                          </span>
                        } @else {
                          <span class="inline-flex items-center gap-1 text-xs text-gray-400">
                            <span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Inactive
                          </span>
                        }
                      </td>
                      <td class="py-3 text-gray-500 text-xs">
                        {{ user.createdAt | date: 'MMM d, y' }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class DashboardComponent {
  private readonly apiUrl = environment.apiUrl;

  stats = httpQuery<DashboardStatsResponse>({
    request: () => ({ url: `${this.apiUrl}/dashboard/stats` }),
    handleError: true,
  });

  isError = computed(() => this.stats.error() != null);

  verifiedPercent = computed(() => {
    const d = this.stats.value();
    if (!d || d.totalUsers === 0) return 0;
    return Math.round((d.verifiedUsers / d.totalUsers) * 100);
  });

  maxRoleCount = computed(() => {
    const d = this.stats.value();
    if (!d || d.usersByRole.length === 0) return 1;
    return Math.max(...d.usersByRole.map((r) => r.count), 1);
  });

  maxLoginCount = computed(() => {
    const d = this.stats.value();
    if (!d || d.loginActivityLast7Days.length === 0) return 0;
    return Math.max(...d.loginActivityLast7Days.map((a) => a.count), 0);
  });

  roleBarWidth(count: number): number {
    const max = this.maxRoleCount();
    return max === 0 ? 0 : Math.round((count / max) * 100);
  }

  loginBarHeight(count: number): number {
    const max = this.maxLoginCount();
    return max === 0 ? 0 : Math.round((count / max) * 100);
  }

  roleBadgeClass(role: string): Record<string, boolean> {
    return {
      'bg-purple-100 text-purple-700': role === 'SUPER_ADMIN',
      'bg-blue-100 text-blue-700': role === 'MODRATOR',
      'bg-yellow-100 text-yellow-700': role === 'DEV',
      'bg-gray-100 text-gray-700': role === 'MEMBER',
    };
  }
}
