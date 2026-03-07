import { ApiProperty } from '@nestjs/swagger';

class UsersByRoleItem {
  @ApiProperty()
  role: string;

  @ApiProperty()
  count: number;
}

class LoginActivityItem {
  @ApiProperty()
  date: string;

  @ApiProperty()
  count: number;
}

class RecentUserItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty()
  createdAt: Date;
}

export class DashboardStatsResponse {
  @ApiProperty()
  successMessage: string;

  // ─── User Stats ────────────────────────────────────────
  @ApiProperty()
  totalUsers: number;

  @ApiProperty()
  activeUsers: number;

  @ApiProperty()
  inactiveUsers: number;

  @ApiProperty()
  verifiedUsers: number;

  // ─── Client Stats ─────────────────────────────────────
  @ApiProperty()
  totalClients: number;

  @ApiProperty()
  publicClients: number;

  @ApiProperty()
  confidentialClients: number;

  // ─── Session Stats ────────────────────────────────────
  @ApiProperty()
  activeSessions: number;

  // ─── Charts ───────────────────────────────────────────
  @ApiProperty({ type: [UsersByRoleItem] })
  usersByRole: UsersByRoleItem[];

  @ApiProperty({ type: [LoginActivityItem] })
  loginActivityLast7Days: LoginActivityItem[];

  // ─── Recent Users ─────────────────────────────────────
  @ApiProperty({ type: [RecentUserItem] })
  recentUsers: RecentUserItem[];
}
