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

    const userCount = await prisma.user.count();
    const clientCount = await (prisma as any).client.count();
    const idpCount = await (prisma as any).identityProvider.count();
    console.log(`📊 Users in database: ${userCount}`);
    console.log(`📊 Clients in database: ${clientCount}`);
    console.log(`📊 Identity providers in database: ${idpCount}`);
    console.log('\n✨ Seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().then();
