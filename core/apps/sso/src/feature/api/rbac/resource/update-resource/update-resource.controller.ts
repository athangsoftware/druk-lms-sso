import { Controller, Put, HttpCode, HttpStatus, Body, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../..';
import { PrismaService, UserType } from '@app/prisma-sso';
import { UpdateResourceRequest } from './update-resource-request';
import { UpdateResourceResponse } from './update-resource-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Resources')
@ApiBearerAuth()
@Controller('rbac/resources')
export class UpdateResourceController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateResource' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource updated', type: UpdateResourceResponse })
  @RequirePermission('resource.update')
  async execute(
    @Param('id') id: string,
    @Body() body: UpdateResourceRequest,
  ): Promise<UpdateResourceResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.resource.findUnique({ where: { id } });
      if (!existing) {
        throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
      }

      if (body.name && body.name !== existing.name) {
        const duplicate = await dbContext.resource.findUnique({ where: { name: body.name } });
        if (duplicate) {
          throw new HttpException('Resource with this name already exists', HttpStatus.BAD_REQUEST);
        }
      }

      const resource = await dbContext.resource.update({
        where: { id },
        data: { ...(body.name && { name: body.name }) },
      });

      return {
        successMessage: SuccessMessages.updateSuccess('Resource'),
        data: resource,
      };
    });
  }
}
