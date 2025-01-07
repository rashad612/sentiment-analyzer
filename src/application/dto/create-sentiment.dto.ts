import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSentimentDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  magnitude: number;
}
