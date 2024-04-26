import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(@Inject('OAUTH2_CONFIGURATION') config: any) {
    super({
      clientID: config.facebookClientID,
      clientSecret: config.facebookClientSecret,
      callbackURL: 'http://localhost:3000/auth/facebook/redirect',
      scope: 'email',
      profileFields: ['email', 'name', 'gender', 'birthday', 'picture', 'hometown'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any> {
    const payload = {
      profile,
      accessToken,
    };

    done(null, payload);
  }
}
