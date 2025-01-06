import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@infrastructure/entities/user.entity";
import { User } from "@domain/entities/User";
import { CreateUserDto } from "@application/dto/create-user.dto";

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

  async findOne(whereCond: Partial<UserEntity>): Promise<UserEntity> {
    return await this.repo.findOne({ where: whereCond });
  }
}
