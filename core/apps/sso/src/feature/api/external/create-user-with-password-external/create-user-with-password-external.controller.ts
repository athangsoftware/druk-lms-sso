import { Controller, Post, HttpCode, HttpStatus, Body, HttpException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserWithPasswordExternalRequest } from './create-user-with-password-external-request';
import { CreateUserWithPasswordExternalResponse } from './create-user-with-password-external-response';
import { PrismaService } from '@app/prisma-sso';
import { UserType } from '@app/prisma-sso';
import { BcryptService, ApiKeyAuthorization } from '@app/shared';

@ApiTags('External')
@ApiKeyAuthorization()
@Controller('external/users')
export class CreateUserWithPasswordExternalController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  @Post('with-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'createUserWithPasswordExternal' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully created with password', type: CreateUserWithPasswordExternalResponse })
  async execute(@Body() body: CreateUserWithPasswordExternalRequest): Promise<CreateUserWithPasswordExternalResponse> {
    return await this.prismaService.client(async ({ dbContext }) => {
      const existingUserByEmail = await dbContext.user.findFirst({ where: { email: body.email } });
      if (existingUserByEmail) {
        throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
      }

      const existingUserByUsername = await dbContext.user.findFirst({ where: { username: body.email } });
      if (existingUserByUsername) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }

      if (body.ndiIdentifier) {
        const existingUserByNdi = await dbContext.user.findFirst({ where: { ndiIdentifier: body.ndiIdentifier } });
        if (existingUserByNdi) {
          throw new HttpException('User with this NDI identifier already exists', HttpStatus.BAD_REQUEST);
        }
      }

      const salt = await this.bcryptService.genSalt(10);
      const hashedPassword = await this.bcryptService.hash(body.password, salt);

      const user = await dbContext.user.create({
        data: {
          id: body.id,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phoneNumber: body.phoneNumber,
          username: body.email,
          password: hashedPassword,
          userType: UserType.MEMBER,
          ndiIdentifier: body.ndiIdentifier,
          isVerified: true,
        },
      });

      return {
        successMessage: 'User created successfully with password',
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          username: user.username,
          role: user.userType,
          ndiIdentifier: user.ndiIdentifier,
          isVerified: user.isVerified,
          isActive: user.isActive,
        },
      };
    });
  }
}
