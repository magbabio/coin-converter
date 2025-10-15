import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { createCorsOptions } from './config/cors.config';

type CorsOriginCallback = (err: Error | null, allow: boolean) => void;
type CorsOriginFn = (
  origin: string | undefined,
  callback: CorsOriginCallback,
) => void;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors(createCorsOptions());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.PORT ?? 3000;
  console.log(`Application is running on: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap().catch((err: unknown) => {
  let msg = 'Bootstrap failed';
  if (err instanceof Error) msg = `${msg}: ${err.message}`;
  console.error(msg);
  process.exitCode = 1;
});
