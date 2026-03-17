import { Controller, Put, HttpCode, HttpStatus, Body, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { UpdateActionRequest } from './update-action-request';
import { UpdateActionResponse } from './update-action-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Actions')
@ApiBearerAuth()
@Controller('rbac/actions')
export class UpdateActionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateAction' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Action updated', type: UpdateActionResponse })
  @Authorize(UserType.SUPER_ADMIN)
  async execute(
    @Param('id') id: string,
    @Body() body: UpdateActionRequest,
  ): Promise<UpdateActionResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.action.findUnique({ where: { id } });
      if (!existing) {
        throw new HttpException('Action not found', HttpStatus.NOT_FOUND);
      }

      if (body.name && body.name !== existing.name) {
        const duplicate = await dbContext.action.findUnique({ where: { name: body.name } });
        if (duplicate) {
          throw new HttpException('Action with this name already exists', HttpStatus.BAD_REQUEST);
        }
      }

      const action = await dbContext.action.update({
        where: { id },
        data: { ...(body.name && { name: body.name }) },
      });

      return {
        successMessage: SuccessMessages.updateSuccess('Action'),
        data: action,
      };
    });
  }
}
