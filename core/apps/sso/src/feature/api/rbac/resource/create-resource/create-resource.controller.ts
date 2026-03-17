import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService, UserType } from '@app/prisma-sso';
import { CreateResourceRequest } from './create-resource-request';
import { CreateResourceResponse } from './create-resource-response';
import { SuccessMessages } from '../../../../../core/models/message';

@ApiTags('RBAC - Resources')
@ApiBearerAuth()
@Controller('rbac/resources')
export class CreateResourceController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createResource' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource successfully created', type: CreateResourceResponse })
  @Authorize(UserType.SUPER_ADMIN)
  async execute(@Body() body: CreateResourceRequest): Promise<CreateResourceResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.resource.findUnique({ where: { name: body.name } });
      if (existing) {
        throw new HttpException('Resource already exists', HttpStatus.BAD_REQUEST);
      }

      const resource = await dbContext.resource.create({ data: { name: body.name } });
      return {
        successMessage: SuccessMessages.insertSuccess('Resource'),
        data: resource,
      };
    });
  }
}
