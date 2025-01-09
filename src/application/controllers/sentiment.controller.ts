import { Body, Controller, Post } from '@nestjs/common';
import { SentimentService } from '@domain/services/sentiment.service';
import { AnalyzeSentimentDto } from '@application/dto/analyze-sentiment.dto';
import { Sentiment } from '@domain/entities/sentiment';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('sentiment')
@ApiTags('sentiment')
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}

  @ApiOperation({ summary: `Analyze sentiments in provided text` })
  @ApiResponse({ status: 201, description: 'Analysis is fetched and stored.' })
  @ApiResponse({ status: 422, description: '422 Unprocessable Entity.' })
  @Post('/analyze')
  async analyze(@Body() payload: AnalyzeSentimentDto): Promise<Sentiment> {
    return await this.sentimentService.analyze(payload);
  }
}
