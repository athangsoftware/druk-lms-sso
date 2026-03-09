# Database Seeds

## Usage

### Run all seeds
```bash
npm run prisma:seed
```

### Run specific seed scripts
```bash
npx ts-node libs/prisma/schema/seeds/seed.ts
npx ts-node libs/prisma/schema/seeds/post-logout-redirect-urls-seed.ts
```

### Verify seeds
```bash
npx ts-node libs/prisma/schema/seeds/verify-seeds.ts
```

## Seed Data

### Users
- Default admin user (MODRATOR role)

### Clients
- **app1**: Admin Web Application (CONFIDENTIAL)
- **app2**: Marketplace Web Application (CONFIDENTIAL)
- **iam**: Client Web Application (PUBLIC - uses PKCE)

### Redirect URLs
- OAuth redirect URIs for each client (dev + prod)

### Post-Logout Redirect URLs (OIDC RFC 8904)
- RP-Initiated Logout redirect URIs for each client (dev + prod)
