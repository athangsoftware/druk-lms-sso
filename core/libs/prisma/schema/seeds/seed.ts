import 'dotenv/config';
import { PrismaClient } from '../../generated/client/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { userSeeds } from './data/users-seed';
import { clientSeeds } from './data/client-seed';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required for seeding.');
}

const url = new URL(databaseUrl);
const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: parseInt(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
});

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

    const userCount = await prisma.user.count();
    const clientCount = await (prisma as any).client.count();
    console.log(`📊 Users in database: ${userCount}`);
    console.log(`📊 Clients in database: ${clientCount}`);
    console.log('\n✨ Seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().then();
