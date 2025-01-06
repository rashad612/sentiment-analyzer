import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './infrastructure/config';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { UserController } from '@application/controllers/user.controller';
import { UserService } from '@domain/services/user.service';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    DatabaseModule,
  ],
  controllers: [AppController, UserController],
  providers: [UserRepository, UserService],
})
export class AppModule {}
