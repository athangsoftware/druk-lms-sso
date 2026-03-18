import { Controller, Delete, HttpCode, HttpStatus, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../..';
import { PrismaService, UserType } from '@app/prisma-sso';
import { DeleteResourceResponse } from './delete-resource-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Resources')
@ApiBearerAuth()
@Controller('rbac/resources')
export class DeleteResourceController {
  constructor(private readonly prismaService: PrismaService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteResource' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource deleted', type: DeleteResourceResponse })
  @RequirePermission('resource.delete')
  async execute(@Param('id') id: string): Promise<DeleteResourceResponse> {
    return await this.prismaService.client(
      async ({ dbContext }) => {
        const existing = await dbContext.resource.findUnique({ where: { id } });
        if (!existing) {
          throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
        }

        // Check if resource is used in any permissions
        const permissionCount = await dbContext.permission.count({ where: { resourceId: id } });
        if (permissionCount > 0) {
          throw new HttpException(
            'Cannot delete resource that is used in permissions. Remove associated permissions first.',
            HttpStatus.BAD_REQUEST,
          );
        }

        await dbContext.resource.delete({ where: { id } });

        return { successMessage: SuccessMessages.deleteSuccess('Resource') };
      },
      { isTransaction: true },
    );
  }
}
