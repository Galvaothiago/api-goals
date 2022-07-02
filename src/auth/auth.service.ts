import { Injectable } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from 'src/exceptions/unauthorized.exception';

interface PayloadProp {
  sub: string;
  username: string;
}

export interface LoginResponse {
  accessToken: string;
  username: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUsernameAndPassword(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    const hasUser = user.length > 0;

    if (hasUser) {
      const isValidPassword = await bcrypt.compare(password, user[0].password);

      if (isValidPassword) {
        return {
          ...user[0],
          password: undefined,
        };
      }
    }

    throw new UnauthorizedException('Username or password is incorrect');
  }

  login(user: User): LoginResponse {
    const payload: PayloadProp = {
      sub: user.username,
      username: user.username,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      accessToken: jwt,
      username: user.username,
      name: `${user.firstName} ${user.lastName}`,
    };
  }
}
