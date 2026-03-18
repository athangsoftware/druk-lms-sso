/**
 * User type enum for authorization across all apps.
 * Mirrors the Prisma UserType enum from the SSO schema.
 */
export enum UserType {
    InternalUser = 'InternalUser',
    OrganizationUser = 'OrganizationUser',
}
