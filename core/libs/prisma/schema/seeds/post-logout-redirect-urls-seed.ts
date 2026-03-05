import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPostLogoutRedirectUrls() {
  console.log('🌱 Seeding post-logout redirect URLs...');

  try {
    const clients = await prisma.client.findMany({ select: { id: true, clientId: true, name: true } });

    if (clients.length === 0) {
      console.warn('⚠️  No clients found. Please seed clients first.');
      return;
    }

    console.log(`📋 Found ${clients.length} clients`);

    const postLogoutRedirectUrls = [
      { clientName: 'Admin Web', urls: ['https://admin.one.athang.com', 'http://localhost:4201'] },
      { clientName: 'Client Web', urls: ['https://one.athang.com', 'http://localhost:4200'] },
      { clientName: 'Marketplace Web', urls: ['https://marketplace.one.athang.com', 'http://localhost:4202'] },
      { clientName: 'SSO Web', urls: ['https://sso.one.athang.com', 'http://localhost:4203'] },
    ];

    for (const client of clients) {
      const config = postLogoutRedirectUrls.find((c) =>
        client.name.toLowerCase().includes(c.clientName.toLowerCase().split(' ')[0]),
      );

      if (!config) {
        console.log(`⏭️  Skipping client: ${client.name} (no matching configuration)`);
        continue;
      }

      console.log(`\n📝 Adding post-logout redirect URLs for: ${client.name}`);

      for (const url of config.urls) {
        const existing = await prisma.postLogoutRedirectURL.findFirst({
          where: { clientId: client.id, url },
        });

        if (existing) {
          console.log(`   ⏭️  Already exists: ${url}`);
          continue;
        }

        await prisma.postLogoutRedirectURL.create({
          data: { url, clientId: client.id, createdBy: 'system-seed' },
        });

        console.log(`   ✅ Added: ${url}`);
      }
    }

    const totalUrls = await prisma.postLogoutRedirectURL.count();
    console.log(`\n✨ Seeding complete! Total post-logout redirect URLs: ${totalUrls}`);
  } catch (error) {
    console.error('❌ Error seeding post-logout redirect URLs:', error);
    throw error;
  }
}

seedPostLogoutRedirectUrls()
  .catch((error) => { console.error('❌ Seed failed:', error); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
