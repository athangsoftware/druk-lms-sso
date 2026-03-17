import { UserType } from '@app/prisma-sso';

export function getUserType(status: UserType): string {
  const statusMap: Record<keyof typeof UserType, string> = {
    [UserType.MEMBER]: 'Member',
    [UserType.MODRATOR]: 'Moderator',
    [UserType.DEV]: 'Developer',
    [UserType.SUPER_ADMIN]: 'Super Admin',
  };

  return statusMap[status] || 'Unknown Status';
}

export const userTypes = [
  { id: UserType.MEMBER, name: 'Member' },
  { id: UserType.MODRATOR, name: 'Modrator' },
  { id: UserType.DEV, name: 'Developer' },
  { id: UserType.SUPER_ADMIN, name: 'Super Admin' },
];
