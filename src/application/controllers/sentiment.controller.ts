import { Body, Controller, Post } from '@nestjs/common';
import { SentimentService } from '@domain/services/sentiment.service';
import { AnalyzeSentimentDto } from '@application/dto/analyze-sentiment.dto';
import { Sentiment } from '@domain/entities/sentiment';

@Controller('sentiment')
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}
  @Post('/analyze')
  async analyze(@Body() payload: AnalyzeSentimentDto): Promise<Sentiment> {
    return await this.sentimentService.analyze(payload);
  }
}
