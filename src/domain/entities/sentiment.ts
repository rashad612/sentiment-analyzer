import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Sentiment {
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
