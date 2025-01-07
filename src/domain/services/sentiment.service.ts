import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { SentimentRepository } from '@infrastructure/repositories/sentiment.repository';
import { Sentiment } from '@domain/entities/sentiment';
import { AnalyzeSentimentDto } from '@application/dto/analyze-sentiment.dto';
import { CreateSentimentDto } from '@application/dto/create-sentiment.dto';
import { LanguageApiService } from '@infrastructure/language-api/language-api.service';


@Injectable()
export class SentimentService {
  private readonly logger = new Logger(SentimentService.name);
  constructor(
    private readonly userRepo: UserRepository,
    private readonly sentimentRepo: SentimentRepository,
    private readonly languageApiService: LanguageApiService,
  ) {}

  async analyze(input: AnalyzeSentimentDto): Promise<Sentiment> {
    try {
      this.logger.log(`Looking up user: ${input.username}`);
      const user = await this.userRepo.findOne({ username: input.username });
      if (!user) {
        throw new Error('User not found');
      }
      const analyzedSentiment = await this.languageApiService.analyzeSentiment(input.text);
      this.logger.debug(`Analyzed:`, { analyzedSentiment });
      
      const sentiment: CreateSentimentDto = {
        text: input.text,
        score: analyzedSentiment.score,
        magnitude: analyzedSentiment.magnitude,
      }

      this.logger.log('Saving sentiment to DB:', { sentiment });
      const savedSentiment = await this.sentimentRepo.create(sentiment);

      this.logger.log(`Update user ${input.username} sentiment:`, { savedSentiment });
      await this.userRepo.updateSentiment(user, savedSentiment);

      return {
        text: savedSentiment.text,
        score: savedSentiment.score,
        magnitude: savedSentiment.magnitude,
      };
    } catch (err) {
      this.logger.error(`Error analyzing sentiment: ${err}`);
      throw new UnprocessableEntityException(err);
    }
  }
}
