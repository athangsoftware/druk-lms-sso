import { RequirePermission } from '../rbac';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PrismaService } from '@app/prisma-sso';
import { UserType } from '@app/prisma-sso';
import { DashboardStatsResponse } from './dashboard-response';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('/dashboard')
export class DashboardController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getDashboardStats', summary: 'Get aggregated dashboard statistics' })
  @ApiResponse({ status: HttpStatus.OK, type: DashboardStatsResponse })
  @RequirePermission('dashboard.list')
  async getStats(): Promise<DashboardStatsResponse> {
    return this.prismaService.client(async ({ dbContext }) => {
      // ─── User counts ────────────────────────────────────────
      const [totalUsers, activeUsers, inactiveUsers, verifiedUsers] = await Promise.all([
        dbContext.user.count(),
        dbContext.user.count({ where: { isActive: true } }),
        dbContext.user.count({ where: { isActive: false } }),
        dbContext.user.count({ where: { isVerified: true } }),
      ]);

      // ─── Client counts ──────────────────────────────────────
      const [totalClients, publicClients, confidentialClients] = await Promise.all([
        dbContext.client.count(),
        dbContext.client.count({ where: { clientType: 'PUBLIC' } }),
        dbContext.client.count({ where: { clientType: 'CONFIDENTIAL' } }),
      ]);

      // ─── Active sessions ────────────────────────────────────
      const activeSessions = await dbContext.refreshToken.count({
        where: { revoked: false, expiresAt: { gt: new Date() } },
      });

      // ─── Users grouped by role ──────────────────────────────
      const usersByRoleRaw = await dbContext.user.groupBy({
        by: ['userType'],
        _count: { userType: true },
        orderBy: { userType: 'asc' },
      });

      const usersByRole = usersByRoleRaw.map((r) => ({
        role: r.userType as string,
        count: r._count.userType,
      }));

      // ─── Login activity last 7 days ─────────────────────────
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      const recentAuthorizations = await dbContext.authorizationCode.findMany({
        where: {
          isUsed: true,
          createdAt: { gte: sevenDaysAgo },
        },
        select: { createdAt: true },
      });

      // Build a map from YYYY-MM-DD → count
      const activityMap = new Map<string, number>();
      for (let i = 0; i < 7; i++) {
        const d = new Date(sevenDaysAgo);
        d.setDate(d.getDate() + i);
        activityMap.set(d.toISOString().slice(0, 10), 0);
      }
      for (const auth of recentAuthorizations) {
        const key = auth.createdAt.toISOString().slice(0, 10);
        if (activityMap.has(key)) {
          activityMap.set(key, (activityMap.get(key) ?? 0) + 1);
        }
      }

      const loginActivityLast7Days = Array.from(activityMap.entries()).map(([date, count]) => ({
        date,
        count,
      }));

      // ─── Recent users (last 5) ──────────────────────────────
      const recentUsersRaw = await dbContext.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          userType: true,
          isActive: true,
          isVerified: true,
          createdAt: true,
        },
      });

      const recentUsers = recentUsersRaw.map((u) => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName ?? '',
        email: u.email,
        role: u.userType as string,
        isActive: u.isActive,
        isVerified: u.isVerified,
        createdAt: u.createdAt,
      }));

      return {
        successMessage: 'Dashboard statistics retrieved successfully',
        totalUsers,
        activeUsers,
        inactiveUsers,
        verifiedUsers,
        totalClients,
        publicClients,
        confidentialClients,
        activeSessions,
        usersByRole,
        loginActivityLast7Days,
        recentUsers,
      };
    });
  }
}
