import { Controller, Put, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordRequest } from './reset-password-request';
import { ResetPasswordResponse } from './reset-password-response';
import { PrismaService } from '@app/prisma';
import { Authorize, BcryptService } from '@app/shared';
import { Role } from '@app/prisma';

@ApiTags('User')
@ApiBearerAuth()
@Controller('/reset-password')
export class ResetPasswordController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'resetPassword' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Password successfully reset', type: ResetPasswordResponse })
  @Authorize(Role.MODRATOR)
  async execute(@Body() body: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const resetToken = await dbContext.passwordResetToken.findFirst({
        where: { token: body.token, isUsed: false },
        include: { user: true },
      });

      if (!resetToken) {
        throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
      }

      if (new Date() > resetToken.expiresAt) {
        throw new HttpException('Token has expired', HttpStatus.BAD_REQUEST);
      }

      if (resetToken.user.role !== Role.MEMBER) {
        throw new HttpException('Can only reset passwords for MEMBER users', HttpStatus.FORBIDDEN);
      }

      const hashedPassword = await this.bcryptService.hash(body.newPassword, 10);

      const updatedUser = await dbContext.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword, isVerified: true },
      });

      await dbContext.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { isUsed: true },
      });

      return {
        successMessage: 'Password has been reset successfully',
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          passwordReset: true,
        },
      };
    });
  }
}
