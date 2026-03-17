import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from '@app/shared';
import { PrismaService } from '@app/prisma-report';
import { UserType } from '@app/shared';
import { CreateGlobalFilterRequest } from './create-global-filter-request';
import { CreateGlobalFilterResponse } from './create-global-filter-response';
import { SuccessMessages } from '../../../../core/models/message';
import { validateColumnName } from '../../../../core/utils/filter.util';
import { BadRequestException } from '@nestjs/common';

@ApiTags('Global Filters')
@ApiBearerAuth()
@Controller('/global-filters')
export class CreateGlobalFilterController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createGlobalFilter' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateGlobalFilterResponse })
  @Authorize(UserType.MEMBER, UserType.MODRATOR, UserType.DEV, UserType.SUPER_ADMIN)
  async execute(
    @Body() body: CreateGlobalFilterRequest,
  ): Promise<CreateGlobalFilterResponse> {
    try {
      validateColumnName(body.columnName);
    } catch {
      throw new BadRequestException('Invalid column name.');
    }

    return await this.prismaService.client(async ({ dbContext }) => {
      const count = await dbContext.globalFilter.count();

      const filter = await dbContext.globalFilter.create({
        data: {
          columnName: body.columnName,
          columnValue: body.columnValue,
          missingColumnBehavior: body.missingColumnBehavior ?? null,
          isEnabled: body.isEnabled ?? true,
          order: body.order ?? count,
        },
      });

      return {
        successMessage: SuccessMessages.insertSuccess('Global filter'),
        data: {
          id: filter.id,
          columnName: filter.columnName,
          columnValue: filter.columnValue,
          missingColumnBehavior: filter.missingColumnBehavior,
          isEnabled: filter.isEnabled,
          order: filter.order,
          createdAt: filter.createdAt,
          updatedAt: filter.updatedAt,
        },
      };
    });
  }
}
