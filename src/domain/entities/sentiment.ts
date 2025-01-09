import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Sentiment {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  magnitude: number;
}
