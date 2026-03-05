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
    ssoLoginUrl: process.env.SSO_LOGIN_URL!,
    ssoCallbackUrl: process.env.SSO_CALLBACK_URL!,
    googleClientId: process.env.GOOGLE_CLIENT_ID!,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_CALLBACK_URL!,
    oci: {
      tenancyId: process.env.OCI_TENANCY_KEY,
      userId: process.env.OCI_USER_KEY,
      fingerprint: process.env.OCI_FINGERPRINT_KEY,
      privateKey: process.env.OCI_PRIVATE_KEY
        ? (process.env.OCI_PRIVATE_KEY.startsWith('-----BEGIN')
            ? process.env.OCI_PRIVATE_KEY
            : decodeBase64(process.env.OCI_PRIVATE_KEY))
        : undefined,
      region: process.env.OCI_REGION,
      compartmentId: process.env.OCI_COMPARTMENT_OCID,
      approvedSender: process.env.OCI_EMAIL_APPROVED_SENDER,
    },
    ndiConfig: {
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      fixedAccessToken: process.env.FIXED_ACCESS_TOKEN!,
      webhookUrl: process.env.NDI_WEBHOOK_URL!,
      authUrl: process.env.NDI_AUTH_URL!,
      verifierUrl: process.env.NDI_VERIFIER_URL!,
      webhookRegisterUrl: process.env.NDI_WEBHOOK_REGISTER_URL!,
      webhookSubscribeUrl: process.env.NDI_WEBHOOK_SUBSCRIBE_URL!,
    },
  };
});

export default appConfig;
export type AppConfig = ConfigType<typeof appConfig>;
