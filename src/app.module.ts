import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './infrastructure/config';

import { DatabaseModule } from '@infrastructure/database/database.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
