import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface UserFromJwt {
  id: string;
  username: string;
  name: string;
}

interface PayloadProp {
  sub: string;
  username: string;
  name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadProp): Promise<UserFromJwt> {
    return {
      id: payload.sub,
      username: payload.username,
      name: payload.name,
    };
  }
}
