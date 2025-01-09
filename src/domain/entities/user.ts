import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
}
