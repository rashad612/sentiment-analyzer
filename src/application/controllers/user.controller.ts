import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UserService } from '@domain/services/user.service';
import { User } from '@domain/entities/user';
import { Sentiment } from '@domain/entities/sentiment';
import { CreateUserDto } from '@application/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: User,
  })
  @ApiResponse({ status: 422, description: '422 Unprocessable Entity.' })
  @Post('/register')
  async register(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Get('/:username/sentiments')
  @ApiOperation({ summary: `Get a list of user's sentiment analysis` })
  @ApiResponse({
    status: 200,
    description: 'A full list or empty one is returned.',
    type: [Sentiment],
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getSentiments(
    @Param('username') username: string,
  ): Promise<Sentiment[]> {
    return await this.userService.getSentiments(username);
  }
}
