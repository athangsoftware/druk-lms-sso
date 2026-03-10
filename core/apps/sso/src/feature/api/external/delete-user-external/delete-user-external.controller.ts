import { Controller, Delete, HttpCode, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@app/prisma-sso';
import { ApiKeyAuthorization } from '@app/shared';
import { DeleteUserExternalResponse } from './delete-user-external-response';

@ApiTags('External')
@ApiKeyAuthorization()
@Controller('external/users')
export class DeleteUserExternalController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteUserExternal' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully deleted', type: DeleteUserExternalResponse })
  async execute(@Param('id') id: string): Promise<DeleteUserExternalResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const user = await dbContext.user.findUnique({ where: { id } });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await dbContext.authorizationCode.deleteMany({ where: { userId: id } });
      await dbContext.refreshToken.deleteMany({ where: { userId: id } });
      await dbContext.user.delete({ where: { id } });

      return {
        successMessage: 'User has been deleted successfully',
      };
    });
  }
}
