import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateGoalDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  title: string;

  url_img: string;

  @IsNumber()
  @IsPositive()
  final_value: number;

  @IsNumber()
  @IsPositive()
  current_value: number;

  @IsNotEmpty()
  share_id: string;
}
