import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@infrastructure/entities/user.entity';
@Module({
  imports: [
    ...databaseProviders,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
