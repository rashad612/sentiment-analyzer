import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSentimentDto {
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
