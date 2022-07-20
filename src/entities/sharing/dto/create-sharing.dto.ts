import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class CreateSharingDto {
  @IsNotEmpty()
  goal_shared: string;

  username_from: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(25)
  username_to: string;

  sharing_verify: boolean;
}
