import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { UserRepository } from "@infrastructure/repositories/user.repository";
import { User } from '@domain/entities/user';
import { CreateUserDto } from "@application/dto/create-user.dto";
import { UserEntity } from '@infrastructure/entities/user.entity';
import { Sentiment } from "@domain/entities/sentiment";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly repo: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log(`Creating user: ${createUserDto.username}`);
      return await this.repo.create(createUserDto);
    } catch (err) {
      this.logger.error(`Error creating user ${createUserDto.username}: ${err}`);
      throw new UnprocessableEntityException(err);
    }
  }

  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    try {
      const user = await this.repo.findOne({ username });
      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
      return user;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async getSentiments(username: string): Promise<Sentiment[]> {
    try {
      this.logger.log(`Getting sentiments for user: ${username}`);
      const user = await this.findOneByUsername(username);
      return user?.sentiments
        .map(s => ({ text: s.text, score: s.score, magnitude: s.magnitude })) || [];  
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
