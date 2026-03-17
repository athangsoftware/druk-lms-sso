import { Controller, Delete, HttpCode, HttpStatus, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { DeleteActionResponse } from './delete-action-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Actions')
@ApiBearerAuth()
@Controller('rbac/actions')
export class DeleteActionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteAction' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Action deleted', type: DeleteActionResponse })
  @Authorize(UserType.SUPER_ADMIN)
  async execute(@Param('id') id: string): Promise<DeleteActionResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const existing = await dbContext.action.findUnique({ where: { id } });
        if (!existing) {
          throw new HttpException('Action not found', HttpStatus.NOT_FOUND);
        }

        // Check if action is used in any permissions
        const permissionCount = await dbContext.permission.count({ where: { actionId: id } });
        if (permissionCount > 0) {
          throw new HttpException(
            'Cannot delete action that is used in permissions. Remove associated permissions first.',
            HttpStatus.BAD_REQUEST,
          );
        }

        await dbContext.action.delete({ where: { id } });

        return { successMessage: SuccessMessages.deleteSuccess('Action') };
      },
      { isTransaction: true },
    );
  }
}
