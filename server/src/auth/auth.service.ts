import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';

import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.get(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.name, sub: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async get(username: string) {
    return await this.authRepository
      .createQueryBuilder('auth')
      .where('auth.name = :name', { name: username })
      .getOneOrFail();
  }
}
