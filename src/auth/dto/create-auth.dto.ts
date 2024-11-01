import { Transform } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { SingInByEmail } from '../constraints/checkUserByEmail';
import { IsPasswordsMatching } from '../constraints/isPasswordsMatching';

export class SignInDto {
  @IsDefined()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  username: string;

  @IsDefined()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  @SingInByEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!/\_@#$%^&*()]).{8,}$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 number, and 1 symbol: ?=.[!/_@#$%^&()]',
  })
  password: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!/\_@#$%^&*()]).{8,}$/, {
    message:
      'Password repeat must contain at least 1 uppercase letter, 1 number, and 1 symbol: ?=.[!/_@#$%^&()]',
  })
  @IsPasswordsMatching({ message: 'The Passwords does not match' })
  passwordRepeat: string;
}
