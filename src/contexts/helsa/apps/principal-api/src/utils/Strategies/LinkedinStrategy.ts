import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-linkedin-oauth2';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(@Inject('OAUTH2_CONFIGURATION') config: any) {
    super({
      clientID: config.linkedinClientID,
      clientSecret: config.linkedinClientSecret,
      callbackURL: 'http://localhost:3000/auth/linkedin/redirect',
      scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any) => void): Promise<any> {
    const payload = {
      profile,
      accessToken,
    };

    done(null, payload);
  }
}
