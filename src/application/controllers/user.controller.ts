import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@domain/services/user.service';
import { User } from '@domain/entities/user';
import { CreateUserDto } from '@application/dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  async register(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }

}