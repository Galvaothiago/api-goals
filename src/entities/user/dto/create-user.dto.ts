import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IsPasswordValid } from 'src/decorators/password-validator.decorator';

export class CreateUserDto {
  id?: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(25)
  username: string;

  @IsNotEmpty()
  @MaxLength(30)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(30)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  @IsPasswordValid()
  password: string;
}
