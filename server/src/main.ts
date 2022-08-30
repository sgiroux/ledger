import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { LoggingInterceptor } from './shared/interceptors/logging-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));

  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //app.useGlobalFilters(new ErrorFilter(app.get(HttpAdapterHost)));

  // Use our logging service
  //app.useLogger(new LoggingService());

  // Enable Helmet (https://github.com/helmetjs/helmet)
  app.use(helmet());

  // Enable autovalidation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Enable versioning (https://docs.nestjs.com/techniques/versioning)
  /*app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });*/

  // Enable openAPI (https://docs.nestjs.com/openapi/introduction)
  const config = new DocumentBuilder()
    .setTitle('Vault API')
    .setDescription('Vault API')
    //.setVersion('1.0')
    //.addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Run it
  await app.listen(5000, '0.0.0.0');
}
bootstrap();
