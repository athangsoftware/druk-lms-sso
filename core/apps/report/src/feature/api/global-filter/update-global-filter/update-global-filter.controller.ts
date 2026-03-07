import {
  Controller,
  Put,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma';
import { Role } from '@app/prisma';
import { UpdateGlobalFilterRequest } from './update-global-filter-request';
import { UpdateGlobalFilterResponse } from './update-global-filter-response';
import { SuccessMessages } from '../../../../core/models/message';
import { validateColumnName } from '../../../../core/utils/filter.util';

@ApiTags('Global Filters')
@ApiBearerAuth()
@Controller('/global-filters')
export class UpdateGlobalFilterController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateGlobalFilter' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateGlobalFilterResponse })
  @Authorize(Role.MEMBER, Role.MODRATOR, Role.DEV, Role.SUPER_ADMIN)
  async execute(
    @Param('id') id: string,
    @Body() body: UpdateGlobalFilterRequest,
  ): Promise<UpdateGlobalFilterResponse> {
    if (body.columnName) {
      try {
        validateColumnName(body.columnName);
      } catch {
        throw new BadRequestException('Invalid column name.');
      }
    }

    return await this.prismaService.client(async ({ dbContext }) => {
      const existing = await dbContext.globalFilter.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Global filter not found.');
      }

      await dbContext.globalFilter.update({
        where: { id },
        data: {
          ...(body.columnName !== undefined && { columnName: body.columnName }),
          ...(body.columnValue !== undefined && { columnValue: body.columnValue }),
          ...(body.missingColumnBehavior !== undefined && { missingColumnBehavior: body.missingColumnBehavior }),
          ...(body.isEnabled !== undefined && { isEnabled: body.isEnabled }),
          ...(body.order !== undefined && { order: body.order }),
        },
      });

      return {
        successMessage: SuccessMessages.updateSuccess('Global filter'),
      };
    });
  }
}
