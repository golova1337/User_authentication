import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Redis } from 'ioredis';
import { JwtTokenService } from 'src/jwt/jwt.service';
import { MyLogger } from 'src/infrastructure/logger/logger.service';
import { SignInDto } from '../dto/create-auth.dto';
import { UserRepository } from '../../user/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: MyLogger,
    private readonly jwtService: JwtTokenService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async signIn(signInDto: SignInDto) {
    try {
      signInDto.password = await bcrypt.hash(signInDto.password, 10);
      delete signInDto.passwordRepeat;
      return this.userRepository.create(signInDto);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Server Error');
    }
  }

  async login(body) {
    try {
      const { email, password } = body;
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new BadRequestException('Bad Request');

      const compare = bcrypt.compare(password, user[0].password);
      if (!compare) throw new InternalServerErrorException('Server Error');
      const { accessToken, refreshToken } = await this.jwtService.getTokens(
        user[0].id,
        user[0].role,
      );

      await this.redis.set(`${user[0].id}`, refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Server Error');
    }
  }

  gitInfo(id: number) {
    return `This action returns a #${id} auth`;
  }
}
