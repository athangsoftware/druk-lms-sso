import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@app/prisma';

/**
 * OIDC RP-Initiated Logout Service
 * Implements OpenID Connect RP-Initiated Logout 1.0 (RFC 8904)
 */
@Injectable()
export class LogoutService {
  private readonly logger = new Logger(LogoutService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async validatePostLogoutRedirectUri(
    postLogoutRedirectUri: string,
    clientId?: string,
  ): Promise<boolean> {
    try {
      const url = new URL(postLogoutRedirectUri);

      const isProduction = this.configService.get('NODE_ENV') === 'production';
      if (isProduction && url.protocol !== 'https:' && url.hostname !== 'localhost') {
        this.logger.warn(`Post-logout redirect URI must use HTTPS in production: ${postLogoutRedirectUri}`);
        return false;
      }

      if (clientId) {
        return await this.validateAgainstClientRegistration(postLogoutRedirectUri, clientId);
      }

      return this.validateAgainstAllowedDomains(url);
    } catch (error) {
      this.logger.error(`Invalid post_logout_redirect_uri format: ${postLogoutRedirectUri}`, error);
      return false;
    }
  }

  private async validateAgainstClientRegistration(uri: string, clientId: string): Promise<boolean> {
    try {
      const client = await this.prismaService.client(async ({ dbContext }) => {
        return await dbContext.client.findUnique({
          where: { clientId },
          include: { redirectUrls: true, postLogoutRedirectUrls: true },
        });
      });

      if (!client) {
        this.logger.warn(`Client not found: ${clientId}`);
        return false;
      }

      if (client.disableStrictUrlValidation) {
        this.logger.log(`Strict URL validation disabled for client ${clientId}, skipping post_logout_redirect_uri check`);
        return true;
      }

      const isRegistered = client.postLogoutRedirectUrls.some((redirect) => redirect.url === uri);
      if (isRegistered) {
        this.logger.log(`Validated post_logout_redirect_uri for client ${clientId}: ${uri}`);
        return true;
      }

      const isRedirectUri = client.redirectUrls.some(
        (redirect) => redirect.url === uri || uri.startsWith(redirect.url),
      );
      if (isRedirectUri) {
        this.logger.warn(
          `Post-logout redirect URI matches redirect_uri for client ${clientId}: ${uri}. Consider adding to post_logout_redirect_uris.`,
        );
        return true;
      }

      this.logger.warn(`Post-logout redirect URI not registered for client ${clientId}: ${uri}`);
      return false;
    } catch (error) {
      this.logger.error(`Error validating post_logout_redirect_uri against client registration`, error);
      return false;
    }
  }

  private validateAgainstAllowedDomains(url: URL): boolean {
    const allowedDomains = this.getAllowedDomains();
    const isAllowed = allowedDomains.some(
      (domain) => url.hostname === domain || url.hostname.endsWith(`.${domain}`),
    );

    if (!isAllowed) {
      this.logger.warn(`Post-logout redirect URI not in allowed domains: ${url.toString()}`);
      return false;
    }

    this.logger.log(`Validated post_logout_redirect_uri: ${url.toString()}`);
    return true;
  }

  private getAllowedDomains(): string[] {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    const domains = [
      'athang.com',
      'one.athang.com',
      'admin.one.athang.com',
      'sso.one.athang.com',
      'marketplace.one.athang.com',
    ];

    if (!isProduction) {
      domains.push('localhost');
    }

    return domains;
  }

  getFrontChannelLogoutUris(sessionId: string): Array<{ name: string; uri: string }> {
    const issuer = this.getIssuer();
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    const apps = [
      { name: 'Admin Web', baseUrl: isProduction ? 'https://admin.one.athang.com' : 'http://localhost:4201' },
      { name: 'Client Web', baseUrl: isProduction ? 'https://one.athang.com' : 'http://localhost:4200' },
      { name: 'Marketplace Web', baseUrl: isProduction ? 'https://marketplace.one.athang.com' : 'http://localhost:4202' },
      { name: 'SSO Web', baseUrl: isProduction ? 'https://sso.one.athang.com' : 'http://localhost:4203' },
    ];

    return apps.map((app) => ({
      name: app.name,
      uri: `${app.baseUrl}/logout?frontchannel=true&iss=${encodeURIComponent(issuer)}&sid=${encodeURIComponent(sessionId)}`,
    }));
  }

  getIssuer(): string {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    return isProduction ? 'https://sso.one.athang.com' : 'https://api.sso.one.athang.com';
  }

  getDefaultLogoutRedirectUrl(): string {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    return isProduction ? 'https://sso.one.athang.com' : 'http://localhost:4203';
  }

  generateFrontChannelLogoutHtml(sessionId: string, postLogoutRedirectUri?: string): string {
    const logoutUris = this.getFrontChannelLogoutUris(sessionId);
    const redirectTarget = postLogoutRedirectUri || this.getDefaultLogoutRedirectUrl();

    const iframesHtml = logoutUris
      .map(
        (app, index) =>
          `<iframe id="logout-frame-${index}" src="${app.uri}" style="display:none;" onload="frameLoaded(${index})" onerror="frameError(${index})"></iframe>`,
      )
      .join('\n        ');

    const appListHtml = logoutUris
      .map(
        (app, index) =>
          `<div id="app-${index}" class="app-item">📱 ${app.name}</div>`,
      )
      .join('\n              ');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Single Sign-Out in Progress</title>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      text-align: center;
      padding: 50px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logout-container {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      max-width: 500px;
      width: 100%;
    }
    h2 { color: #333; margin-bottom: 20px; font-size: 24px; }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 20px auto;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .status { margin: 20px 0; color: #666; font-size: 14px; }
    .countdown { font-size: 32px; color: #667eea; font-weight: bold; margin: 20px 0; }
    .app-list { text-align: left; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
    .app-item {
      padding: 8px 0; color: #666; font-size: 14px;
      transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;
    }
    .app-item.completed { color: #28a745; font-weight: 500; }
    .app-item.failed { color: #dc3545; }
    .app-item.completed::after { content: '✓'; margin-left: auto; }
    .app-item.failed::after { content: '✗'; margin-left: auto; }
  </style>
</head>
<body>
  <div class="logout-container">
    <h2>🔒 Single Sign-Out</h2>
    <div class="spinner"></div>
    <div id="status" class="status">Logging out from all applications...</div>
    <div id="countdown" class="countdown">10</div>
    <div class="app-list">
      ${appListHtml}
    </div>
  </div>

  ${iframesHtml}

  <script>
    (function() {
      'use strict';
      var TIMEOUT_SECONDS = 10;
      var TOTAL_FRAMES = ${logoutUris.length};
      var REDIRECT_URL = '${redirectTarget}';
      var completedFrames = 0;
      var countdown = TIMEOUT_SECONDS;
      var countdownInterval;
      var timeoutId;

      countdownInterval = setInterval(function() {
        countdown--;
        document.getElementById('countdown').textContent = countdown;
        if (countdown <= 0) { clearInterval(countdownInterval); completeLogout(); }
      }, 1000);

      timeoutId = setTimeout(function() {
        completeLogout();
      }, TIMEOUT_SECONDS * 1000);

      window.frameLoaded = function(frameIndex) {
        completedFrames++;
        var el = document.getElementById('app-' + frameIndex);
        if (el) el.classList.add('completed');
        checkCompletion();
      };

      window.frameError = function(frameIndex) {
        completedFrames++;
        var el = document.getElementById('app-' + frameIndex);
        if (el) el.classList.add('failed');
        checkCompletion();
      };

      function checkCompletion() {
        if (completedFrames >= TOTAL_FRAMES) {
          clearTimeout(timeoutId);
          clearInterval(countdownInterval);
          document.getElementById('status').textContent = 'Logout completed successfully!';
          setTimeout(completeLogout, 1000);
        }
      }

      function completeLogout() {
        window.location.href = REDIRECT_URL;
      }
    })();
  </script>
</body>
</html>`;
  }
}
