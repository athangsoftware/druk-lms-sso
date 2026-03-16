import { IdentityProvider, IdentityProviderType } from '../../../generated/client';

type IdentityProviderSeed = Omit<
  IdentityProvider,
  'createdBy' | 'createdAt' | 'createdIp' | 'updatedBy' | 'updatedAt' | 'updatedIp'
> & Partial<IdentityProvider>;

export const identityProviderSeeds: IdentityProviderSeed[] = [
  {
    id: 'idp-google',
    name: 'Google',
    slug: 'google',
    type: 'OIDC' as IdentityProviderType,
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID ?? 'REPLACE_WITH_GOOGLE_OAUTH_CLIENT_ID',
    clientSecret:
      process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? 'REPLACE_WITH_GOOGLE_OAUTH_CLIENT_SECRET',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
    redirectUrl: 'http://localhost:3000/auth/google/callback',
    scopes: 'openid profile email',
    iconUrl: 'https://www.svgrepo.com/show/475656/google-color.svg',
    isEnabled: true,
    displayOrder: 0,
    metadata: null,
  },
  {
    id: 'idp-bhutan-ndi',
    name: 'Bhutan NDI',
    slug: 'bhutan-ndi',
    type: 'CUSTOM' as IdentityProviderType,
    clientId: process.env.NDI_CLIENT_ID ?? 'REPLACE_WITH_NDI_CLIENT_ID',
    clientSecret: process.env.NDI_CLIENT_SECRET ?? 'REPLACE_WITH_NDI_CLIENT_SECRET',
    authorizationUrl: 'https://staging.bhutanndi.com/authentication/v1/authenticate',
    tokenUrl: null,
    userInfoUrl: null,
    redirectUrl: null,
    scopes: 'openid profile',
    iconUrl: '/icons/ndi-icon-logo.jpeg',
    isEnabled: true,
    displayOrder: 1,
    metadata: {
      fixedAccessToken: process.env.NDI_FIXED_ACCESS_TOKEN ?? 'REPLACE_WITH_NDI_FIXED_ACCESS_TOKEN',
      webhookUrl: 'https://druk-lms-sso-api.mythimphu.com/ndi/callback',
      verifierUrl: 'https://demo-client.bhutanndi.com/verifier',
      webhookRegisterUrl: 'https://demo-client.bhutanndi.com/webhook/v1/register',
      webhookSubscribeUrl: 'https://demo-client.bhutanndi.com/webhook/v1/subscribe',
    } as any,
  },
];
