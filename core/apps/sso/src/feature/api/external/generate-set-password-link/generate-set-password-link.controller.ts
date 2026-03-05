import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenerateSetPasswordLinkRequest } from './generate-set-password-link-request';
import { GenerateSetPasswordLinkResponse } from './generate-set-password-link-response';
import { PrismaService } from '@app/prisma';
import { ApiKeyAuthorization, EmailService } from '@app/shared';
import * as crypto from 'crypto';

@ApiTags('External')
@ApiKeyAuthorization()
@Controller('external/generate-set-password-link')
export class GenerateSetPasswordLinkController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'generateSetPasswordLink' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Password link generated successfully', type: GenerateSetPasswordLinkResponse })
  async execute(@Body() body: GenerateSetPasswordLinkRequest): Promise<GenerateSetPasswordLinkResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const user = await dbContext.user.findFirst({
        where: { email: body.email },
        select: { id: true, email: true, firstName: true, lastName: true },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await dbContext.passwordResetToken.updateMany({
        where: { userId: user.id, isUsed: false },
        data: { isUsed: true },
      });

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      await dbContext.passwordResetToken.create({
        data: { token, userId: user.id, expiresAt },
      });

      const passwordLink = `${body.redirectUrl}?token=${token}`;

      try {
        const emailSubject = 'Password Reset Request';
        const emailHtml = this.generatePasswordResetEmailHtml(passwordLink, user.email, expiresAt, user.firstName, user.lastName || undefined);
        await this.emailService.sendHtmlEmail(user.email, emailSubject, emailHtml);
      } catch (emailError) {
        console.error('Failed to send password reset email:', emailError);
      }

      return {
        successMessage: 'Password reset link generated and sent successfully',
        passwordLink,
        expiresAt: expiresAt.toISOString(),
      };
    });
  }

  private generatePasswordResetEmailHtml(passwordLink: string, email: string, expiresAt: Date, firstName?: string, lastName?: string): string {
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
  <title>Password Reset Request</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
    .container { background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    .header { text-align: center; color: #2c5aa0; margin-bottom: 30px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff !important; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
    .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0; color: #856404; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>Password Reset Request</h1></div>
    <p>${greeting}</p>
    <p>We received a request to reset the password for your account associated with <strong>${email}</strong>.</p>
    <p>Click the button below to set your new password:</p>
    <div style="text-align: center;"><a href="${passwordLink}" class="button">Set New Password</a></div>
    <p>If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 3px;">${passwordLink}</p>
    <div class="warning">
      <strong>Important:</strong>
      <ul>
        <li>This link will expire on <strong>${formattedExpiration}</strong></li>
        <li>If you didn't request this password reset, please ignore this email</li>
        <li>For security reasons, this link can only be used once</li>
      </ul>
    </div>
    <p>Best regards,<br>Your App Team</p>
    <div class="footer"><p>This is an automated message, please do not reply to this email.</p></div>
  </div>
</body>
</html>`;
  }
}
