import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://druk-lms-report-api.mythimphu.com',
  oidc: {
    issuer: 'https://druk-lms-sso-api.mythimphu.com',
    clientId: 'report',
    redirectUri: 'https://druk-lms-report.mythimphu.com/callback',
    logoutUri: 'https://druk-lms-report.mythimphu.com',
    logoutEndpoint: 'https://druk-lms-sso-api.mythimphu.com/protocol/openid-connect/logout',
    postLogoutRedirectUri: 'https://druk-lms-report.mythimphu.com',
  },
};
