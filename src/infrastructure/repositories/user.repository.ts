import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@infrastructure/entities/user.entity';
import { User } from '@domain/entities/user';
import { CreateUserDto } from '@application/dto/create-user.dto';
import { SentimentEntity } from '@infrastructure/entities/sentiment.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}
  async create(user: CreateUserDto): Promise<User> {
    const newUser = await this.repo.save(user);
    return { username: newUser.username };
  }

  async updateSentiment(
    user: UserEntity,
    sentiment: SentimentEntity,
  ): Promise<void> {
    user.sentiments.push(sentiment);
    await this.repo.save(user);
  }

  async findOne(whereCond: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.repo.findOne({
      where: whereCond,
      relations: { sentiments: true },
    });
    return user;
  }
}
