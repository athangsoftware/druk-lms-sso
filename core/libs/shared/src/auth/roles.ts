/**
 * User type enum for authorization across all apps.
 * Mirrors the Prisma UserType enum from the SSO schema.
 */
export enum UserType {
    MEMBER = 'MEMBER',
    MODRATOR = 'MODRATOR',
    DEV = 'DEV',
    SUPER_ADMIN = 'SUPER_ADMIN',
}
