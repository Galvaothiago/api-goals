import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateGoalDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  title: string;

  url_img: string;

  @IsNumber()
  @IsPositive()
  final_amount: number;

  @IsNumber()
  @IsPositive()
  current_amount: number;
}
