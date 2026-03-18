import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../..';
import { PrismaService, UserType } from '@app/prisma-sso';
import { CreateActionRequest } from './create-action-request';
import { CreateActionResponse } from './create-action-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Actions')
@ApiBearerAuth()
@Controller('rbac/actions')
export class CreateActionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createAction' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Action successfully created', type: CreateActionResponse })
  @RequirePermission('action.create')
  async execute(@Body() body: CreateActionRequest): Promise<CreateActionResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.action.findUnique({ where: { name: body.name } });
      if (existing) {
        throw new HttpException('Action already exists', HttpStatus.BAD_REQUEST);
      }

      const action = await dbContext.action.create({ data: { name: body.name } });
      return {
        successMessage: SuccessMessages.insertSuccess('Action'),
        data: action,
      };
    });
  }
}
