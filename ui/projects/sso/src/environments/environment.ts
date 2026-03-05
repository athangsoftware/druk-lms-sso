import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  apiUrl: 'https://druk-lms-sso-api.mythimphu.com',
  oidc: {
    issuer: 'https://druk-lms-sso-api.mythimphu.com',
    clientId: 'iam',
    redirectUri: 'https://druk-lms-sso.mythimphu.com/callback',
    logoutUri: 'https://druk-lms-sso.mythimphu.com',
    validIssuers: ['https://druk-lms-sso.mythimphu.com', 'https://druk-lms-sso-api.mythimphu.com'],
    logoutEndpoint: 'https://druk-lms-sso-api.mythimphu.com/protocol/openid-connect/logout',
    postLogoutRedirectUri: 'https://druk-lms-sso.mythimphu.com',
  },
};
