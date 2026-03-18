import path from 'node:path';
import dotenv from 'dotenv';
import * as crypto from 'crypto';

// Load DATABASE_URL from the app's own .env (no duplication needed)
dotenv.config({ path: path.join(__dirname, '../../../.env') });

import { PrismaClient } from '../../generated/client/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { userSeeds } from './data/users-seed';
import { clientSeeds } from './data/client-seed';
import { identityProviderSeeds } from './data/identity-provider-seed';
import { resourceSeeds, actionSeeds, permissionSeeds, roleSeeds, permissionGroupSeeds, permissionGroupMapping } from './data/rbac-seed';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required for seeding.');
}

const url = new URL(databaseUrl);
// build adapter config from URL, including optional query parameters
const adapterConfig: any = {
  host: url.hostname,
  port: parseInt(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
};

// support extra connection options via query params
if (url.searchParams.has('allowPublicKeyRetrieval')) {
  adapterConfig.allowPublicKeyRetrieval =
    url.searchParams.get('allowPublicKeyRetrieval') === 'true';
}
if (url.searchParams.has('useSSL')) {
  const sslVal = url.searchParams.get('useSSL');
  // mysql2 expects ssl object when true
  if (sslVal === 'true') {
    adapterConfig.ssl = { rejectUnauthorized: false };
  }
}

const adapter = new PrismaMariaDb(adapterConfig);

const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    console.log('🌱 Starting database seeding...\n');

    console.log('👥 Seeding users...');
    for (const user of userSeeds) {
      await prisma.user.upsert({
        where: { username: user.username },
        update: user,
        create: user,
      });
    }
    console.log('✅ Users seeded successfully\n');

    console.log('🔧 Seeding clients...');
    for (const client of clientSeeds) {
      await (prisma as any).client.upsert({
        where: { id: client.id },
        update: client,
        create: client,
      });
    }
    console.log('✅ Clients seeded successfully\n');

    console.log('🔑 Seeding identity providers...');
    for (const idp of identityProviderSeeds) {
      // Encrypt clientSecret if IDP_ENCRYPTION_KEY is set
      const record = { ...idp };
      if (record.clientSecret && process.env.IDP_ENCRYPTION_KEY) {
        const key = crypto.createHash('sha256').update(process.env.IDP_ENCRYPTION_KEY).digest();
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        const encrypted = Buffer.concat([cipher.update(record.clientSecret, 'utf8'), cipher.final()]);
        const authTag = cipher.getAuthTag();
        record.clientSecret = `${iv.toString('base64')}:${authTag.toString('base64')}:${encrypted.toString('base64')}`;
      }
      await (prisma as any).identityProvider.upsert({
        where: { slug: idp.slug },
        update: record,
        create: record,
      });
      console.log(`   ✅ ${idp.name} (${idp.slug})`);
    }
    console.log('✅ Identity providers seeded successfully\n');

    // RBAC Seeding
    console.log('🔐 Seeding RBAC resources...');
    for (const resource of resourceSeeds) {
      await (prisma as any).resource.upsert({
        where: { name: resource.name },
        update: {},
        create: resource,
      });
    }
    console.log('✅ Resources seeded successfully\n');

    console.log('⚡ Seeding RBAC actions...');
    for (const action of actionSeeds) {
      await (prisma as any).action.upsert({
        where: { name: action.name },
        update: {},
        create: action,
      });
    }
    console.log('✅ Actions seeded successfully\n');

    console.log('� Seeding RBAC permission groups...');
    const groupMap = new Map<string, string>();
    for (const group of permissionGroupSeeds) {
      const result = await (prisma as any).permissionGroup.upsert({
        where: { name: group.name },
        update: { description: group.description },
        create: group,
      });
      groupMap.set(group.name, result.id);
    }
    console.log('✅ Permission groups seeded successfully\n');

    console.log('🔑 Seeding RBAC permissions...');
    for (const perm of permissionSeeds) {
      const [resourceName, actionName] = perm.split('.');
      const resource = await (prisma as any).resource.findUnique({ where: { name: resourceName } });
      const action = await (prisma as any).action.findUnique({ where: { name: actionName } });
      if (resource && action) {
        const groupName = permissionGroupMapping[resourceName];
        const groupId = groupName ? groupMap.get(groupName) ?? null : null;
        await (prisma as any).permission.upsert({
          where: { resourceId_actionId: { resourceId: resource.id, actionId: action.id } },
          update: { groupId },
          create: { resourceId: resource.id, actionId: action.id, groupId },
        });
      }
    }
    console.log('✅ Permissions seeded successfully\n');

    console.log('👑 Seeding RBAC roles with hierarchy...');
    const roleMap = new Map<string, string>();
    for (const roleSeed of roleSeeds) {
      const parentRoleId = roleSeed.parentRoleName ? roleMap.get(roleSeed.parentRoleName) ?? null : null;
      const role = await (prisma as any).role.upsert({
        where: { name: roleSeed.name },
        update: { parentRoleId },
        create: { name: roleSeed.name, parentRoleId },
      });
      roleMap.set(roleSeed.name, role.id);

      // Assign permissions to role
      for (const perm of roleSeed.permissions) {
        const [resourceName, actionName] = perm.split('.');
        const resource = await (prisma as any).resource.findUnique({ where: { name: resourceName } });
        const action = await (prisma as any).action.findUnique({ where: { name: actionName } });
        if (resource && action) {
          const permission = await (prisma as any).permission.findUnique({
            where: { resourceId_actionId: { resourceId: resource.id, actionId: action.id } },
          });
          if (permission) {
            await (prisma as any).rolePermission.upsert({
              where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
              update: {},
              create: { roleId: role.id, permissionId: permission.id },
            });
          }
        }
      }
      console.log(`   ✅ ${roleSeed.name}${roleSeed.parentRoleName ? ` (inherits ${roleSeed.parentRoleName})` : ''}`);
    }
    console.log('✅ Roles seeded successfully\n');

    // Assign SUPER_ADMIN role to admin user
    console.log('👑 Assigning SUPER_ADMIN role to admin user...');
    const adminUserId = 'bcbbeda1-c832-4349-829e-de771a4c5fd9';
    const superAdminRoleId = roleMap.get('SUPER_ADMIN');
    if (superAdminRoleId) {
      await (prisma as any).userRole.upsert({
        where: { userId_roleId: { userId: adminUserId, roleId: superAdminRoleId } },
        update: {},
        create: { userId: adminUserId, roleId: superAdminRoleId },
      });
      console.log('✅ Admin user assigned SUPER_ADMIN role\n');
    } else {
      console.warn('⚠️ SUPER_ADMIN role not found, skipping admin role assignment\n');
    }

    const userCount = await prisma.user.count();
    const clientCount = await (prisma as any).client.count();
    const idpCount = await (prisma as any).identityProvider.count();
    const roleCount = await (prisma as any).role.count();
    const permissionCount = await (prisma as any).permission.count();
    console.log(`📊 Users in database: ${userCount}`);
    console.log(`📊 Clients in database: ${clientCount}`);
    console.log(`📊 Identity providers in database: ${idpCount}`);
    console.log(`📊 Roles in database: ${roleCount}`);
    console.log(`📊 Permissions in database: ${permissionCount}`);
    console.log('\n✨ Seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().then();
