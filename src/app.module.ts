import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './infrastructure/config';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { LanguageApiModule } from '@infrastructure/language-api/language-api.module';
import { UserController } from '@application/controllers/user.controller';
import { SentimentController } from '@application/controllers/sentiment.controller';
import { UserService } from '@domain/services/user.service';
import { SentimentService } from '@domain/services/sentiment.service';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { AppController } from './app.controller';
import { SentimentRepository } from '@infrastructure/repositories/sentiment.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    DatabaseModule,
    LanguageApiModule,
  ],
  controllers: [AppController, UserController, SentimentController],
  providers: [UserRepository, SentimentRepository, UserService, SentimentService],
})
export class AppModule {}
