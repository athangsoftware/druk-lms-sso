import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifySeeds() {
  console.log('🔍 Verifying seeded data...\n');

  try {
    const clients = await prisma.client.findMany({
      include: { redirectUrls: true, postLogoutRedirectUrls: true },
    });

    console.log(`📋 Found ${clients.length} clients:\n`);

    for (const client of clients) {
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`🔧 Client: ${client.name}`);
      console.log(`   ID: ${client.id}`);
      console.log(`   Client ID: ${client.clientId}`);
      console.log(`   Type: ${client.clientType}`);

      console.log(`\n   📍 OAuth Redirect URIs (${client.redirectUrls.length}):`);
      if (client.redirectUrls.length > 0) {
        client.redirectUrls.forEach((url) => console.log(`      • ${url.url}`));
      } else {
        console.log(`      ⚠️  No redirect URIs configured`);
      }

      console.log(`\n   🚪 OIDC Post-Logout Redirect URIs (${client.postLogoutRedirectUrls.length}):`);
      if (client.postLogoutRedirectUrls.length > 0) {
        const devUrls = client.postLogoutRedirectUrls.filter((u) => u.url.includes('localhost'));
        const prodUrls = client.postLogoutRedirectUrls.filter((u) => !u.url.includes('localhost'));

        if (devUrls.length > 0) {
          console.log(`      📱 Development:`);
          devUrls.forEach((url) => console.log(`         • ${url.url}`));
        }
        if (prodUrls.length > 0) {
          console.log(`      🌐 Production:`);
          prodUrls.forEach((url) => console.log(`         • ${url.url}`));
        }
      } else {
        console.log(`      ⚠️  No post-logout redirect URIs configured`);
      }
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    const totalRedirectUrls = await prisma.redirectURL.count();
    const totalPostLogoutUrls = await prisma.postLogoutRedirectURL.count();
    const devPostLogoutUrls = await prisma.postLogoutRedirectURL.count({ where: { url: { contains: 'localhost' } } });
    const prodPostLogoutUrls = totalPostLogoutUrls - devPostLogoutUrls;

    console.log(`📊 Summary Statistics:`);
    console.log(`   • Total OAuth Redirect URIs: ${totalRedirectUrls}`);
    console.log(`   • Total Post-Logout Redirect URIs: ${totalPostLogoutUrls}`);
    console.log(`     - Development (localhost): ${devPostLogoutUrls}`);
    console.log(`     - Production (athang.com): ${prodPostLogoutUrls}`);

    console.log(`\n✅ OIDC RFC 8904 Compliance:`);
    const clientsWithoutPostLogout = clients.filter((c) => c.postLogoutRedirectUrls.length === 0);
    if (clientsWithoutPostLogout.length === 0) {
      console.log(`   ✓ All clients have post-logout redirect URIs configured`);
    } else {
      console.log(`   ⚠️  ${clientsWithoutPostLogout.length} client(s) missing post-logout redirect URIs:`);
      clientsWithoutPostLogout.forEach((c) => console.log(`      - ${c.name} (${c.clientId})`));
    }

    console.log(`\n✨ Verification complete!`);
  } catch (error) {
    console.error('❌ Error verifying seeds:', error);
    throw error;
  }
}

verifySeeds()
  .catch((error) => { console.error('❌ Verification failed:', error); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
