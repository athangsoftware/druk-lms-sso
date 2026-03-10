import { Body, Controller, HttpCode, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@app/prisma-sso';
import { ApiKeyAuthorization } from '@app/shared';
import { UpdateUserExternalRequest } from './update-user-external-request';
import { UpdateUserExternalResponse } from './update-user-external-response';

@ApiTags('External')
@ApiKeyAuthorization()
@Controller('external/users')
export class UpdateUserExternalController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateUserExternal' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully updated', type: UpdateUserExternalResponse })
  async execute(@Param('id') id: string, @Body() body: UpdateUserExternalRequest): Promise<UpdateUserExternalResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const user = await dbContext.user.findUnique({ where: { id } });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (body.email && body.email !== user.email) {
        const existingUserByEmail = await dbContext.user.findFirst({ where: { email: body.email, id: { not: id } } });
        if (existingUserByEmail) {
          throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        }

        const existingUserByUsername = await dbContext.user.findFirst({ where: { username: body.email, id: { not: id } } });
        if (existingUserByUsername) {
          throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        }
      }

      if (body.ndiIdentifier && body.ndiIdentifier !== user.ndiIdentifier) {
        const existingUserByNdi = await dbContext.user.findFirst({ where: { ndiIdentifier: body.ndiIdentifier, id: { not: id } } });
        if (existingUserByNdi) {
          throw new HttpException('User with this NDI identifier already exists', HttpStatus.BAD_REQUEST);
        }
      }

      await dbContext.user.update({
        where: { id },
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phoneNumber: body.phoneNumber,
          ndiIdentifier: body.ndiIdentifier,
          username: body.email ? body.email : undefined,
        },
      });

      return {
        successMessage: 'User has been updated successfully',
      };
    });
  }
}
