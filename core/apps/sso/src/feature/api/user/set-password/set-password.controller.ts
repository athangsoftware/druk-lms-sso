import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SetPasswordRequest } from './set-password-request';
import { SetPasswordResponse } from './set-password-response';
import { PrismaService } from '@app/prisma';
import { BcryptService } from '@app/shared';

@ApiTags('User')
@Controller('users/set-password')
export class SetPasswordController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'setPassword' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Password set successfully', type: SetPasswordResponse })
  async execute(@Body() body: SetPasswordRequest): Promise<SetPasswordResponse> {
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

      const hashedPassword = await this.bcryptService.hash(body.password, 10);

      const updatedUser = await dbContext.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword, isVerified: true },
      });

      await dbContext.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { isUsed: true },
      });

      return {
        successMessage: 'Password set successfully',
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          passwordSet: true,
        },
      };
    });
  }
}
