import { NestFactory } from '@nestjs/core';
import { SsoModule } from './sso.module';
import { setupSwagger, SanitizeUndefinedPipe, AppValidationPipe } from '@app/shared';
import { AppExceptionFilter } from './app-exception.filter';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SsoModule);

  app.set('trust proxy', 1);

  setupSwagger(
    'IAM',
    ['/', '/common/'],
    'API',
    `
  <h3>📌 Welcome to the <strong>IAM</strong> 🚀</h3>
  `,
    'docs',
    app,
  );

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

  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on('error', (err) => console.error('Redis Error:', err));
  await redisClient.connect();

  const store = new RedisStore({
    client: redisClient,
    prefix: 'sess:',
  });

  app.use(
    session({
      store: store,
      secret: process.env.SESSION_SECRET || 'default_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );

  const port = process.env.PORT || 4001;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
