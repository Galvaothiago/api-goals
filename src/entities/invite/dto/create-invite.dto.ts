import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateInviteDto {
  @IsNotEmpty()
  @MinLength(6)
  invite_code: string;

  @IsNotEmpty()
  issued_by: string;

  created_at: Date;

  consumed_by: string;

  checked_at: Date;

  code_used: boolean;
}
