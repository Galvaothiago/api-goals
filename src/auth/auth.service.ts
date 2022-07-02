import { Injectable } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from 'src/exceptions/unauthorized.exception';

interface PayloadProp {
  sub: string;
  username: string;
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  id: string;
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

    throw new UnauthorizedError();
  }

  login(user: User): LoginResponse {
    const payload: PayloadProp = {
      sub: user.id,
      username: user.username,
      name: `${user.firstName} ${user.lastName}`,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      id: user.id,
      accessToken: jwt,
      username: user.username,
      name: `${user.firstName} ${user.lastName}`,
    };
  }
}
