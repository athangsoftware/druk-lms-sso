import { NestFactory } from '@nestjs/core';
import { setupSwagger, SanitizeUndefinedPipe, AppValidationPipe } from '@app/shared';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppExceptionFilter } from './app-exception.filter';
import { ReportModule } from './report.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ReportModule);

  app.set('trust proxy', 1);

  

  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new SanitizeUndefinedPipe(),
    new AppValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new AppExceptionFilter());

  app.use(cookieParser());

  setupSwagger(
    'Report',
    ['/', '/common/'],
    'API',
    `
  <h3>📌 Welcome to the <strong>Report</strong> 🚀</h3>
  `,
    'docs',
    app,
  );

  const port = process.env.PORT || 4002;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
