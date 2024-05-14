import { AuthorizationError } from '@ducen-services/shared';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserSearcher } from '../../application/SearchUser/UserSearcher';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('SERVER_CONFIGURATION') conf: any,
    private userSearcher: UserSearcher,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: conf.authKey,
    });
  }
  async validate(payload: any) {
    const user = await this.userSearcher.run(payload.userId);
    if (!user) {
      throw new AuthorizationError('User not authenticated');
    }
    return user;
  }
}
