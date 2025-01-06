import * as bcrypt from 'bcrypt';
import { Injectable, Logger, UnprocessableEntityException } from "@nestjs/common";
import { UserRepository } from "@infrastructure/repositories/user.repository";
import { User } from '@domain/entities/User';
import { CreateUserDto } from "@application/dto/create-user.dto";
import { UserEntity } from '@infrastructure/entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly repo: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log(`Creating user: ${createUserDto.username}`);
      const hashedPassword = await this._hashPassword(createUserDto.password);
      return await this.repo.create({...createUserDto, password: hashedPassword });
    } catch (err) {
      this.logger.error(`Error creating user: ${err}`);
      throw new UnprocessableEntityException(err);
    }
  }

  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    return await this.repo.findOne({ username });
  }

  private async _hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
}
