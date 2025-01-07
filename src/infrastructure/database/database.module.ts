import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@infrastructure/entities/user.entity';
import { SentimentEntity } from '@infrastructure/entities/sentiment.entity';
@Module({
  imports: [
    ...databaseProviders,
    TypeOrmModule.forFeature([UserEntity, SentimentEntity]),
  ],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
