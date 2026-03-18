import { Controller, Put, HttpCode, HttpStatus, Body, Param, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../../rbac';
import { UpdateUserRequest } from './update-user-request';
import { UpdateUserResponse } from './update-user-response';
import { PrismaService } from '@app/prisma-sso';
import { UserType } from '@app/prisma-sso';

@ApiTags('User')
@ApiBearerAuth()
@Controller('/users')
export class UpdateUserController {
  constructor(private readonly prismaService: PrismaService) {}
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateUser' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully updated', type: UpdateUserResponse })
  @RequirePermission('user.update')
  async execute(@Param('id') id: string, @Body() body: UpdateUserRequest): Promise<UpdateUserResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const user = await dbContext.user.findUnique({ where: { id } });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await dbContext.user.update({
        where: { id },
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phoneNumber: body.phoneNumber,
          userType: body.userType ?? body.role,
        },
      });

      return { successMessage: 'User has been updated successfully' };
    });
  }
}
