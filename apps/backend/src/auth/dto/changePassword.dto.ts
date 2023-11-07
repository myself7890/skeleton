import { IsNotEmpty, Matches } from 'class-validator';
import { Match } from 'validation/match.decorator';

export class ChangePasswordDto {
  hash: string;

  @IsNotEmpty()
  @Matches(/\S/, { message: 'The password cannot contain spaces' })
  password: string;

  @IsNotEmpty()
  @Match('password')
  passwordValidation: string;
}
