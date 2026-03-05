import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://sso.one.athang.com',
  oidc: {
    issuer: 'https://sso.one.athang.com',
    clientId: 'iam',
    redirectUri: 'https://sso.one.athang.com/callback',
    logoutUri: 'https://sso.one.athang.com',
    validIssuers: ['https://sso.one.athang.com'],
    logoutEndpoint: 'https://sso.one.athang.com/protocol/openid-connect/logout',
    postLogoutRedirectUri: 'https://sso.one.athang.com',
  },
};
