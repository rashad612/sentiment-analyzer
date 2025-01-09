import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Building Swagger
  const docConfig = new DocumentBuilder()
    .setTitle('Sentiment Analyzer API')
    .setDescription('General API for analyzing sentiments in user text')
    .setVersion('1.0')
    .addTag('sentiments')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api-docs', app, documentFactory);

  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('app.port'));
  Logger.log(`Server running on port ${configService.get('app.port')}`);
}
bootstrap();
