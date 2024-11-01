import { Transform } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { LoginByEmail } from '../constraints/checkUserLogin';

export class LoginDto {
  @IsDefined()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  @LoginByEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsDefined()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!/\_@#$%^&*()]).{8,}$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 number, and 1 symbol: ?=.[!/_@#$%^&()]',
  })
  password: string;
}
