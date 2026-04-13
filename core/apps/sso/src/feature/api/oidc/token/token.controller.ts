/* eslint-disable @typescript-eslint/naming-convention */
import { Controller, Post, HttpCode, HttpStatus, Body, BadRequestException } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenResponse } from './token-response';
import { PrismaService } from '@app/prisma-sso';
import { AuthService } from '@app/shared';
import { TokenRequest } from './token-request';
import { RbacService } from '../../rbac/rbac.service';

@ApiTags('OIDC')
@Controller('protocol/openid-connect/token')
export class TokenController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly rbacService: RbacService,
  ) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({ status: HttpStatus.OK, description: '', type: TokenResponse })
  @ApiOperation({ operationId: 'token' })
  @HttpCode(200)
  async execute(@Body() body: TokenRequest): Promise<TokenResponse> {
    const { grant_type, code, code_verifier, redirect_uri, client_id, client_secret, refresh_token } = body;

    return await this.prismaService.client(async ({ dbContext }) => {
      if (grant_type === 'authorization_code') {
        if (!code || !redirect_uri) {
          throw new BadRequestException('Missing required parameters: code, redirect_uri');
        }

        const authCode = await dbContext.authorizationCode.findUnique({
          where: { code, isUsed: false },
          include: { client: true },
        });

        if (!authCode || authCode.expiresAt < new Date()) {
          throw new BadRequestException('Invalid or expired authorization code');
        }

        if (authCode.redirectUri !== redirect_uri) {
          throw new BadRequestException('redirect_uri mismatch');
        }

        if (authCode.clientId !== client_id) {
          throw new BadRequestException('client_id mismatch');
        }

        if (authCode.client.clientType === 'CONFIDENTIAL') {
          if (!client_secret) {
            throw new BadRequestException('client_secret is required for confidential clients');
          }
          const isValid = await this.authService.validateClientCredentials(client_id, client_secret);
          if (!isValid) {
            throw new BadRequestException('Invalid client_secret');
          }
          if (authCode.codeChallenge) {
            throw new BadRequestException('PKCE is not allowed for confidential clients');
          }
        } else if (authCode.client.clientType === 'PUBLIC') {
          if (client_secret) {
            throw new BadRequestException('client_secret is not allowed for public clients');
          }
          if (!code_verifier || !authCode.codeChallenge) {
            throw new BadRequestException('PKCE is required for public clients: missing code_verifier or code_challenge');
          }
        }

        await dbContext.authorizationCode.update({
          where: { id: authCode.id },
          data: { isUsed: true },
        });

        const user = await dbContext.user.findUnique({ where: { id: authCode.userId ?? '' } });
        if (!user) {
          throw new BadRequestException('User not found');
        }

        const roles = await this.rbacService.getUserRoleNames(user.id);
        const permissions = await this.rbacService.getUserPermissions(user.id);
        const requestedScopes = authCode?.scope?.split(' ') ?? [];
        const hasRoleScope = requestedScopes.includes('role') || requestedScopes.includes('roles');
        const hasPermissionsScope = requestedScopes.includes('permissions') || requestedScopes.includes('permission');
        const tokenPayload: any = { sub: user.id };
        if (authCode?.scope) {
          tokenPayload.scope = authCode.scope;
        }
        if (hasRoleScope) {
          tokenPayload.role = user.userType;
          tokenPayload.roles = roles;
        }
        if (hasPermissionsScope) {
          tokenPayload.permissions = permissions;
        }

        const accessToken = await this.authService.sign(tokenPayload);
        const refreshTokenPayload: any = { sub: user.id, type: 'refresh' };
        if (authCode?.scope) {
          refreshTokenPayload.scope = authCode.scope;
        }
        const newRefreshToken = await this.authService.sign(refreshTokenPayload);

        await dbContext.refreshToken.create({
          data: {
            token: newRefreshToken,
            userId: user.id,
            clientId: authCode.clientId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            revoked: false,
          },
        });

        return {
          access_token: accessToken,
          refresh_token: newRefreshToken,
          token_type: 'Bearer',
          expires_in: 3600,
        };
      } else if (grant_type === 'refresh_token') {
        if (!refresh_token) {
          throw new BadRequestException('Missing refresh_token');
        }

        const storedToken = await dbContext.refreshToken.findFirst({
          where: { token: refresh_token },
          include: { user: true, client: true },
        });

        if (!storedToken || storedToken.revoked) {
          throw new BadRequestException('Invalid or revoked refresh_token');
        }

        if (storedToken.expiresAt < new Date()) {
          throw new BadRequestException('Refresh token expired');
        }

        if (storedToken.clientId !== client_id) {
          throw new BadRequestException('client_id mismatch');
        }

        if (storedToken.client.clientType === 'CONFIDENTIAL') {
          if (!client_secret) {
            throw new BadRequestException('client_secret is required for confidential clients');
          }
          const isValid = await this.authService.validateClientCredentials(client_id, client_secret);
          if (!isValid) {
            throw new BadRequestException('Invalid client_secret');
          }
        }

        let decoded: any;
        try {
          decoded = await this.authService.verify(refresh_token);
        } catch {
          throw new BadRequestException('Invalid refresh_token signature');
        }

        if (decoded.type !== 'refresh') {
          throw new BadRequestException('Invalid token type');
        }

        const refreshRoles = await this.rbacService.getUserRoleNames(storedToken.user.id);
        const refreshPermissions = await this.rbacService.getUserPermissions(storedToken.user.id);
        const decodedScopes = decoded.scope?.split(' ') ?? [];
        const hasRefreshRoleScope = decodedScopes.includes('role') || decodedScopes.includes('roles');
        const hasRefreshPermissionsScope = decodedScopes.includes('permissions') || decodedScopes.includes('permission');
        const accessTokenPayload: any = { sub: storedToken.user.id };
        if (decoded.scope) {
          accessTokenPayload.scope = decoded.scope;
        }
        if (hasRefreshRoleScope) {
          accessTokenPayload.role = storedToken.user.userType;
          accessTokenPayload.roles = refreshRoles;
        }
        if (hasRefreshPermissionsScope) {
          accessTokenPayload.permissions = refreshPermissions;
        }

        const accessToken = await this.authService.sign(accessTokenPayload);
        const newRefreshTokenPayload: any = { sub: storedToken.user.id, type: 'refresh' };
        if (decoded.scope) {
          newRefreshTokenPayload.scope = decoded.scope;
        }
        const newRefreshToken = await this.authService.sign(newRefreshTokenPayload);

        await dbContext.refreshToken.update({
          where: { id: storedToken.id },
          data: { revoked: true },
        });

        await dbContext.refreshToken.create({
          data: {
            token: newRefreshToken,
            userId: storedToken.userId,
            clientId: storedToken.clientId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            revoked: false,
          },
        });

        return {
          access_token: accessToken,
          refresh_token: newRefreshToken,
          token_type: 'Bearer',
          expires_in: 3600,
        };
      } else if (grant_type === 'client_credentials') {
        if (!client_id || !client_secret) {
          throw new BadRequestException('Missing client_id or client_secret');
        }

        const client = await dbContext.client.findUnique({ where: { clientId: client_id } });
        if (!client) {
          throw new BadRequestException('Invalid client_id');
        }

        if (client.clientType !== 'CONFIDENTIAL') {
          throw new BadRequestException('client_credentials grant is only available for confidential clients');
        }

        const isValid = await this.authService.validateClientCredentials(client_id, client_secret);
        if (!isValid) {
          throw new BadRequestException('Invalid client_secret');
        }

        const accessToken = await this.authService.sign({ sub: client_id, client_id, type: 'client' });

        return {
          access_token: accessToken,
          refresh_token: '',
          token_type: 'Bearer',
          expires_in: 3600,
        };
      }

      throw new BadRequestException('Unsupported grant_type');
    });
  }

  private async generateCodeChallenge(verifier: string): Promise<string> {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return this.base64urlEncode(new Uint8Array(digest));
  }

  private base64urlEncode(data: Uint8Array): string {
    return Buffer.from(data)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}
