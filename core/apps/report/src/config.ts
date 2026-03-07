import { ConfigType, registerAs } from '@nestjs/config';
import { Buffer } from 'buffer';

const appConfig = registerAs('app', () => {
  const decodeBase64 = (b64: string): string =>
    Buffer.from(b64, 'base64').toString('utf-8');

  return {
    mode: process.env.MODE!,
    databaseUrl: process.env.DATABASE_URL!,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY
      ? (process.env.JWT_PRIVATE_KEY.startsWith('-----BEGIN')
          ? process.env.JWT_PRIVATE_KEY
          : decodeBase64(process.env.JWT_PRIVATE_KEY))
      : '',
    jwtPublicKey: process.env.JWT_PUBLIC_KEY
      ? (process.env.JWT_PUBLIC_KEY.startsWith('-----BEGIN')
          ? process.env.JWT_PUBLIC_KEY
          : decodeBase64(process.env.JWT_PUBLIC_KEY))
      : '',
    jwtExpire: process.env.JWT_EXPIRE!,
    apiSecretKey: process.env.API_SECRET_KEY!,
    apiKeyHeader: process.env.API_KEY_HEADER!,
    encryptionKey: process.env.ENCRYPTION_KEY!,
    openAiApiKey: process.env.OPENAI_API_KEY,
    openAiModel: process.env.OPENAI_MODEL || 'gpt-4o',
  };
});

export default appConfig;
export type AppConfig = ConfigType<typeof appConfig>;
