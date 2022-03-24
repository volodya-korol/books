import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { RedocModule } from 'nestjs-redoc';
import { AppModule } from './app/app.module';
import { ExcludeNullInterceptor } from './common/interceptors/excludeNull.interceptor';
import { redocOptions } from './config/docs/redocOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class-validation validation
  app.useGlobalPipes(new ValidationPipe());
  // exclude null
  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  // exclude @Exclude in entity
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // get cookie
  app.use(cookieParser());
  // docs
  const config = new DocumentBuilder()
    .setTitle('Books rest API docs')
    .setContact('Email', '', 'volodyakorol48@gmail.com')
    .addCookieAuth('session-id', {
      type: 'http',
      in: 'Header',
      scheme: 'Bearer'
    })
    .setVersion('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // @ts-ignore
  await RedocModule.setup('/docs', app, document, redocOptions);
  // port
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
