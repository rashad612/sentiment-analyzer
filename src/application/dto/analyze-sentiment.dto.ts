import { IsString, IsNotEmpty } from 'class-validator';

export class AnalyzeSentimentDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
