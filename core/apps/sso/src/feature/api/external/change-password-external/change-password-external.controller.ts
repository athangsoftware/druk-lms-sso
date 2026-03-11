import { Body, Controller, HttpCode, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@app/prisma-sso';
import { BcryptService, ApiKeyAuthorization } from '@app/shared';
import { ChangePasswordExternalRequest } from './change-password-external-request';
import { ChangePasswordExternalResponse } from './change-password-external-response';

@ApiTags('External')
@ApiKeyAuthorization()
@Controller('external/users')
export class ChangePasswordExternalController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  @Put(':id/change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'changePasswordExternal' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Password changed successfully', type: ChangePasswordExternalResponse })
  async execute(@Param('id') id: string, @Body() body: ChangePasswordExternalRequest): Promise<ChangePasswordExternalResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const user = await dbContext.user.findUnique({ where: { id } });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (!user.password) {
        throw new HttpException('User does not have a password set', HttpStatus.BAD_REQUEST);
      }

      const isCurrentPasswordValid = await this.bcryptService.comparePassword(body.currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        throw new HttpException('Current password is incorrect', HttpStatus.BAD_REQUEST);
      }

      const salt = await this.bcryptService.genSalt(10);
      const hashedPassword = await this.bcryptService.hash(body.newPassword, salt);

      await dbContext.user.update({
        where: { id },
        data: { password: hashedPassword },
      });

      return {
        successMessage: 'Password has been changed successfully',
      };
    });
  }
}
