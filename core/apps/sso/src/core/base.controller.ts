import { PrismaService } from '@app/prisma';
import { Inject } from '@nestjs/common';
import appConfig from '../config';
import type { AppConfig } from '../config';

export class BaseController {
  @Inject(appConfig.KEY) public readonly appConfig: AppConfig;
  @Inject() public prismaService: PrismaService;
}
