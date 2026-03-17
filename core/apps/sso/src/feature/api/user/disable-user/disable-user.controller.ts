import { Controller, Put, HttpCode, HttpStatus, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { DisableUserResponse } from './disable-user-response';
import { PrismaService } from '@app/prisma-sso';
import { UserType } from '@app/prisma-sso';

@ApiTags('User')
@ApiBearerAuth()
@Controller('/users/:id/disable')
export class DisableUserController {
  constructor(private readonly prismaService: PrismaService) {}
  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'disableUser' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully disabled', type: DisableUserResponse })
  @Authorize(UserType.MODRATOR)
  async execute(@Param('id') id: string): Promise<DisableUserResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const user = await dbContext.user.findUnique({ where: { id } });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await dbContext.user.update({ where: { id }, data: { isActive: false } });

      return { successMessage: 'User has been disabled successfully' };
    });
  }
}
