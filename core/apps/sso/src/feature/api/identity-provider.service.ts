import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/prisma-sso';
import * as crypto from 'crypto';

interface CachedProvider {
  data: any;
  expiresAt: number;
}

@Injectable()
export class IdentityProviderService {
  private readonly logger = new Logger(IdentityProviderService.name);
  private cache = new Map<string, CachedProvider>();
  private readonly CACHE_TTL = 60_000; // 60 seconds

  constructor(private readonly prismaService: PrismaService) {}

  private getEncryptionKey(): Buffer {
    const key = process.env.IDP_ENCRYPTION_KEY;
    if (!key) {
      this.logger.warn('IDP_ENCRYPTION_KEY not set — secrets stored in plaintext');
      return null as any;
    }
    // Derive a 32-byte key from the env var
    return crypto.createHash('sha256').update(key).digest();
  }

  encrypt(plaintext: string): string {
    const key = this.getEncryptionKey();
    if (!key) return plaintext;

    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();

    // Format: base64(iv):base64(authTag):base64(encrypted)
    return `${iv.toString('base64')}:${authTag.toString('base64')}:${encrypted.toString('base64')}`;
  }

  decrypt(ciphertext: string): string {
    const key = this.getEncryptionKey();
    if (!key) return ciphertext;

    const parts = ciphertext.split(':');
    if (parts.length !== 3) {
      // Not encrypted (legacy/plaintext)
      return ciphertext;
    }

    const [ivB64, authTagB64, encryptedB64] = parts;
    const iv = Buffer.from(ivB64, 'base64');
    const authTag = Buffer.from(authTagB64, 'base64');
    const encrypted = Buffer.from(encryptedB64, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    return decipher.update(encrypted) + decipher.final('utf8');
  }

  invalidateCache(): void {
    this.cache.clear();
  }

  async getProviderBySlug(slug: string): Promise<any | null> {
    const cacheKey = `slug:${slug}`;
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    const provider = await this.prismaService.client(async ({ dbContext }) => {
      return dbContext.identityProvider.findUnique({ where: { slug } });
    });

    if (provider) {
      this.cache.set(cacheKey, { data: provider, expiresAt: Date.now() + this.CACHE_TTL });
    }

    return provider;
  }

  async getEnabledProviders(): Promise<any[]> {
    const cacheKey = 'enabled';
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    const providers = await this.prismaService.client(async ({ dbContext }) => {
      return dbContext.identityProvider.findMany({
        where: { isEnabled: true },
        orderBy: { displayOrder: 'asc' },
        select: {
          id: true,
          name: true,
          slug: true,
          type: true,
          iconUrl: true,
          displayOrder: true,
        },
      });
    });

    this.cache.set(cacheKey, { data: providers, expiresAt: Date.now() + this.CACHE_TTL });
    return providers;
  }

  decryptProviderSecret(provider: any): string | null {
    if (!provider?.clientSecret) return null;
    return this.decrypt(provider.clientSecret);
  }
}
