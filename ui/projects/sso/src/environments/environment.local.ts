import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  oidc: {
    issuer: 'http://localhost:3000',
    clientId: 'iam',
    redirectUri: 'http://localhost:7001/callback',
    logoutUri: 'http://localhost:7001',
    validIssuers: ['http://localhost:3000', 'http://localhost:8080'],
    logoutEndpoint: 'http://localhost:3000/protocol/openid-connect/logout',
    postLogoutRedirectUri: 'http://localhost:7001',
  },
};
