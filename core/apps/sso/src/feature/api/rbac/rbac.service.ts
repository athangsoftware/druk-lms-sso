import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma-sso';

@Injectable()
export class RbacService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get all permissions for a user by resolving role hierarchy.
   * Returns permissions as "resource.action" strings.
   */
  async getUserPermissions(userId: string): Promise<string[]> {
    return await this.prismaService.client<string[]>(async ({ dbContext }) => {
      const userRoles = await dbContext.userRole.findMany({
        where: { userId },
        include: { role: true },
      });

      const activeRoleIds = userRoles
        .filter((ur) => ur.role.isActive)
        .map((ur) => ur.roleId);

      // Resolve hierarchy: collect all role IDs including ancestors
      const allRoleIds = await this.resolveRoleHierarchy(activeRoleIds, dbContext);

      const rolePermissions = await dbContext.rolePermission.findMany({
        where: { roleId: { in: allRoleIds } },
        include: {
          permission: {
            include: { resource: true, action: true },
          },
        },
      });

      const permissions: string[] = rolePermissions
        .filter((rp: any) => rp.permission.isActive)
        .map((rp: any) => `${rp.permission.resource.name}.${rp.permission.action.name}`);

      return [...new Set(permissions)] as string[];
    });
  }

  /**
   * Get all active role names directly assigned to a user.
   */
  async getUserRoleNames(userId: string): Promise<string[]> {
    return await this.prismaService.client<string[]>(async ({ dbContext }) => {
      const userRoles = await dbContext.userRole.findMany({
        where: { userId },
        include: { role: true },
      });

      return userRoles
        .filter((ur) => ur.role.isActive)
        .map((ur) => ur.role.name);
    });
  }

  /**
   * Resolve role hierarchy by walking up parent roles.
   */
  private async resolveRoleHierarchy(roleIds: string[], dbContext: any): Promise<string[]> {
    const allIds = new Set<string>(roleIds);
    const queue = [...roleIds];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const role = await dbContext.role.findUnique({
        where: { id: currentId },
        select: { parentRoleId: true },
      });

      if (role?.parentRoleId && !allIds.has(role.parentRoleId)) {
        allIds.add(role.parentRoleId);
        queue.push(role.parentRoleId);
      }
    }

    return [...allIds];
  }

  /**
   * Check if a user has a specific permission (resource.action format).
   * Supports wildcard matching (e.g., user.* matches user.read).
   */
  async hasPermission(userId: string, permission: string): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId);
    if (permissions.includes(permission)) return true;
    const [resource] = permission.split('.');
    return permissions.includes(`${resource}.*`);
  }
}
