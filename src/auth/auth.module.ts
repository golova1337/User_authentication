import { Module } from '@nestjs/common';
import { SingInByEmailConstraint } from './constraints/checkUserByEmail';
import { LoginByEmailConstraint } from './constraints/checkUserLogin';
import { IsPasswordsMatchingConstraint } from './constraints/isPasswordsMatching';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    SingInByEmailConstraint,
    IsPasswordsMatchingConstraint,
    LoginByEmailConstraint,
  ],
})
export class AuthModule {}
