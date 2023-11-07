import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Match } from 'validation/match.decorator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/\S/, { message: 'The password cannot contain spaces' })
  password: string;

  @IsNotEmpty()
  @Match('password')
  passwordValidation: string;
}
