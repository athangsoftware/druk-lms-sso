/**
 * User roles for authorization across all apps.
 * Mirrors the Prisma Role enum from the SSO schema.
 */
export enum Role {
    MEMBER = 'MEMBER',
    MODRATOR = 'MODRATOR',
    DEV = 'DEV',
    SUPER_ADMIN = 'SUPER_ADMIN',
}
