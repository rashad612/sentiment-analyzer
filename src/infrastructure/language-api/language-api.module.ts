import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LanguageApiService } from './language-api.service';

@Module({
  imports: [ConfigModule],
  providers: [LanguageApiService],
  exports: [LanguageApiService],
})
export class LanguageApiModule {}
