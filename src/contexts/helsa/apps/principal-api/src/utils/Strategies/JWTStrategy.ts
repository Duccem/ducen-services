import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject('AUTH_CONFIGURATION') conf: any) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: conf.authKey,
    });
  }
  async validate(payload: any): Promise<any> {
    return { userId: payload.userId, administrativeData: payload.administrativeData, profile: payload.profile };
  }
}
