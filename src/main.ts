import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
const bodyParser = require('body-parser');
const port = process.env.API_PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  // const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('v1');

  const swaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'list', defaultModelsExpandDepth: -1, filter: true, cacheControl: "no-cache" },
  };
  const setVersion = '2.0 build 20210819.0159';

  const config = new DocumentBuilder()
    .addServer(`${process.env.API_HOST}`, 'Local: COJ Migration')
    .addServer(`${process.env.API_HOST_PUBLIC}`, 'Public: COJ Migration')
    .setTitle('COJ Migration')
    .setDescription('The COJ Migration API description')
    .setVersion(setVersion)
    .addBearerAuth()
    .setContact('COJ Migration Developer', `${process.env.API_HOST}`, `${process.env.API_EMAIL}`)
    .addTag('Authentication & Access')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, swaggerCustomOptions);

  await app.listen(port);
  await Logger.log("==============================")
  await Logger.log(`Server running on ${process.env.API_HOST}`, 'Bootstrap');
  await Logger.log("==============================")
}
bootstrap();
