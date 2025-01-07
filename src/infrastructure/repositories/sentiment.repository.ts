import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SentimentEntity } from '@infrastructure/entities/sentiment.entity';
import { CreateSentimentDto } from '@application/dto/create-sentiment.dto';

@Injectable()
export class SentimentRepository {
  constructor(
    @InjectRepository(SentimentEntity)
    private repo: Repository<SentimentEntity>,
  ) {}
  async create(sentiment: CreateSentimentDto): Promise<SentimentEntity> {
    return await this.repo.save(sentiment);
  }
}
