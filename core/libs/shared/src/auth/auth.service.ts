import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import type { AuthModuleOptions } from './auth.module';
import { PrismaService } from '../prisma';
import { BcryptService } from '../bcrypt/bcrypt.service';

interface JwtPayload {
  exp?: number;
  [key: string]: unknown;
}

@Injectable()
export class AuthService {
  @Inject() jwtService: JwtService;
  @Inject() prismaService: PrismaService;
  @Inject() bcryptService: BcryptService;
  @Inject('AUTH_OPTIONS') private readonly appConfig: AuthModuleOptions;

  sign(
    payload: Record<string, unknown>,
    jwtPrivateKey?: string,
    expiresIn?: string,
  ) {
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      privateKey: jwtPrivateKey ?? this.appConfig.jwtPrivateKey,
      expiresIn: (expiresIn ?? this.appConfig.jwtExpire) as StringValue,
    });
  }

  verify(token: string, jwtPublicKey?: string): JwtPayload {
    return this.jwtService.verify(token, {
      algorithms: ['RS256'],
      publicKey: jwtPublicKey ?? this.appConfig.jwtPublicKey,
    });
  }

  decode(token: string): JwtPayload | null {
    return this.jwtService.decode(token);
  }

  isExpired(token: string): boolean {
    try {
      const decoded = this.decode(token);
      if (!decoded || !decoded.exp) {
        throw new Error('Invalid token or missing expiration (exp) field');
      }
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return currentTimestamp >= decoded.exp;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error in isExpired:', message);
      throw new Error('Unable to determine token expiration');
    }
  }

  async validateClientCredentials(
    clientId: string,
    clientSecret: string,
  ): Promise<boolean> {
    return this.prismaService.client(async ({ dbContext }) => {
      const client = await dbContext.client.findUnique({
        where: { clientId },
      });
      if (!client) {
        return false;
      }
      return this.bcryptService.comparePassword(
        clientSecret,
        client.clientSecret ?? '',
      );
    });
  }
}
