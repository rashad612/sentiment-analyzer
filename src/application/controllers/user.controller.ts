import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UserService } from '@domain/services/user.service';
import { User } from '@domain/entities/user';
import { Sentiment } from '@domain/entities/sentiment';
import { CreateUserDto } from '@application/dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  async register(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Get('/:username/sentiments')
  async getSentiments(@Param('username') username: string): Promise<Sentiment[]> {
    return await this.userService.getSentiments(username);
  }

}