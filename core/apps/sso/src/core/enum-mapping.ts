import { UserType } from '@app/prisma-sso';

export function getUserType(status: UserType): string {
  const statusMap: Record<keyof typeof UserType, string> = {
    [UserType.InternalUser]: 'Internal User',
    [UserType.OrganizationUser]: 'Organization User',
  };

  return statusMap[status] || 'Unknown Status';
}

export const userTypes = [
  { id: UserType.InternalUser, name: 'Internal User' },
  { id: UserType.OrganizationUser, name: 'Organization User' },
];
