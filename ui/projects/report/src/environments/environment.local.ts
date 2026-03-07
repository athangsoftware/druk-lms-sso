import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3001',
  oidc: {
    issuer: 'http://localhost:3000',
    clientId: 'report',
    redirectUri: 'http://localhost:7002/callback',
    logoutUri: 'http://localhost:7002',
    logoutEndpoint: 'http://localhost:3000/protocol/openid-connect/logout',
    postLogoutRedirectUri: 'http://localhost:7002',
  },
};
