import { Module } from '@nestjs/common';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { JwtTokenModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './infrastructure/db/db.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
import { MyAppRedisModule } from './infrastructure/redis/redis.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    JwtTokenModule,
    ConfigurationModule,
    AuthModule,
    DrizzleModule,
    LoggerModule,
    MyAppRedisModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: AccessTokenGuard,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
