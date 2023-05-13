import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { Repository } from 'typeorm';

import * as jwt from 'jsonwebtoken';
import authConfig from 'src/config/authConfig';

import { Auth } from './entities/auth.entity';

interface User {
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.get(username, pass);
    if (!user) {
      throw new UnauthorizedException(
        '잘못된 아이디를 입력했거나 비밀번호가 맞지 않습니다.',
      );
    }
    const payload = { name: user.name };
    return {
      token: await this.login(payload),
    };
  }

  private async get(username: string, pass: string) {
    return await this.authRepository
      .createQueryBuilder('auth')
      .where('auth.name = :name', { name: username })
      .andWhere('auth.password = :password', { password: pass })
      .getOne();
  }

  async login(payload: User) {
    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: '30m',
      audience: 'example.com',
      issuer: 'example.com',
    });
  }

  verfiy(token: string) {
    try {
      const payload = jwt.verify(token, this.config.jwtSecret) as (
        | jwt.JwtPayload
        | string
      ) &
        User;

      const { name } = payload;

      return {
        name: name,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
