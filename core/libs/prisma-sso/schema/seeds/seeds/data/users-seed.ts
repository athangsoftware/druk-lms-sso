import { Role, User } from '@prisma/client';

type UserSeed = Omit<
  User,
  'createdBy' | 'createdAt' | 'createdIp' | 'updatedBy' | 'updatedAt' | 'updatedIp'
> & Partial<User>;

export const userSeeds: UserSeed[] = [
  {
    id: 'bcbbeda1-c832-4349-829e-de771a4c5fd9',
    username: 'admin',
    email: 'admin@example.com',
    password: '$2a$12$jXnoL4/UeVJVkpiQplnJJugC7DTJ8pdRWXOZ2uiqWVzn5EwsTJzxu', // password: computer
    firstName: 'Super',
    lastName: 'Admin',
    phoneNumber: null,
    ndiIdentifier: null,
    isVerified: true,
    isActive: true,
    role: Role.MODRATOR,
  },
];
