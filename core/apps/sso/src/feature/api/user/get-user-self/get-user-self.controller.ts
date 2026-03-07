import { Controller, Get, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorize, CurrentUser } from '@app/shared';
import { GetUserSelfResponse, GetUserSelfResponseData } from './get-user-self-response';
import { PrismaService } from '@app/prisma-sso';
import { Role } from '@app/prisma-sso';

@ApiTags('User')
@ApiBearerAuth()
@Controller('/users/me')
export class GetUserSelfController {
  constructor(private readonly prismaService: PrismaService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'getUserSelf' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns user by ID', type: GetUserSelfResponse })
  @Authorize(Role.MODRATOR, Role.MEMBER)
  async execute(@CurrentUser() currentUser: any): Promise<GetUserSelfResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const user = await dbContext.user.findUnique({ where: { id: currentUser.sub } });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const data: GetUserSelfResponseData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber || null,
        username: user.username,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt.toISOString(),
      };

      return { successMessage: 'User has been retrieved successfully', data };
    });
  }
}
