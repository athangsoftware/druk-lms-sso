export interface Environment {
  production: boolean;
  apiUrl: string;
  oidc: {
    issuer: string;
    clientId: string;
    redirectUri: string;
    logoutUri: string;
    logoutEndpoint: string;
    postLogoutRedirectUri: string;
  };
}
