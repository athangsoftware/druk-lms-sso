import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserExternalRequest } from './create-user-external-request';
import { CreateUserExternalResponse } from './create-user-external-response';
import { PrismaService } from '@app/prisma';
import { Role } from '@app/prisma';
import { BcryptService, ApiKeyAuthorization, EmailService } from '@app/shared';
import * as crypto from 'crypto';

@ApiTags('External')
@ApiKeyAuthorization()
@Controller('external/users')
export class CreateUserExternalController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
    private readonly bcryptService: BcryptService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createUserExternal' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully created', type: CreateUserExternalResponse })
  async execute(@Body() body: CreateUserExternalRequest): Promise<CreateUserExternalResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existingUserByEmail = await dbContext.user.findFirst({ where: { email: body.email } });
      if (existingUserByEmail) {
        throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
      }

      if (body.email) {
        const existingUserByUsername = await dbContext.user.findFirst({ where: { username: body.email } });
        if (existingUserByUsername) {
          throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        }
      }

      if (body.ndiIdentifier) {
        const existingUserByNdi = await dbContext.user.findFirst({ where: { ndiIdentifier: body.ndiIdentifier } });
        if (existingUserByNdi) {
          throw new HttpException('User with this NDI identifier already exists', HttpStatus.BAD_REQUEST);
        }
      }

      const user = await dbContext.user.create({
        data: {
          id: body.id,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phoneNumber: body.phoneNumber,
          username: body.email,
          role: Role.MEMBER,
          ndiIdentifier: body.ndiIdentifier,
        },
      });

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      await dbContext.passwordResetToken.create({
        data: { token, userId: user.id, expiresAt },
      });

      const passwordLink = `${body.redirectUrl}/${token}`;

      try {
        const emailSubject = 'Welcome! Please Set Your Password';
        const emailHtml = this.generateWelcomeEmailHtml(passwordLink, user.email, expiresAt, user.firstName, user.lastName || undefined);
        await this.emailService.sendHtmlEmail(user.email, emailSubject, emailHtml);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
      }

      return {
        successMessage: 'User created successfully and welcome email sent',
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          username: user.username,
          role: user.role,
          ndiIdentifier: user.ndiIdentifier,
          isVerified: user.isVerified,
          isActive: user.isActive,
        },
        passwordLink,
        expiresAt: expiresAt.toISOString(),
      };
    });
  }

  private generateWelcomeEmailHtml(passwordLink: string, email: string, expiresAt: Date, firstName?: string, lastName?: string): string {
    const formattedExpiration = expiresAt.toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
    });
    const greeting = firstName ? `Hello ${firstName}${lastName ? ` ${lastName}` : ''},` : 'Hello,';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome! Please Set Your Password</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
    .container { background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .header { text-align: center; color: #2c5aa0; margin-bottom: 30px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff !important; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
    .info { background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 5px; padding: 15px; margin: 20px 0; color: #0c5460; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>Welcome to Our Platform!</h1></div>
    <p>${greeting}</p>
    <p>Welcome! Your account has been successfully created with the email address <strong>${email}</strong>.</p>
    <p>To get started, please set your password by clicking the button below:</p>
    <div style="text-align: center;"><a href="${passwordLink}" class="button">Set Your Password</a></div>
    <p>If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 3px;">${passwordLink}</p>
    <div class="info">
      <strong>Important Information:</strong>
      <ul>
        <li>This link will expire on <strong>${formattedExpiration}</strong></li>
        <li>For security reasons, this link can only be used once</li>
        <li>After setting your password, you'll be able to access all platform features</li>
      </ul>
    </div>
    <p>Best regards,<br>Your App Team</p>
    <div class="footer"><p>This is an automated message, please do not reply to this email.</p></div>
  </div>
</body>
</html>`;
  }
}
