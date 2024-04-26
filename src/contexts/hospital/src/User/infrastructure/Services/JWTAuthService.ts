import * as jwt from 'jsonwebtoken';
import { AuthService } from '../../domain/AuthService';
import { User } from '../../domain/User';

export class JWTAuthService implements AuthService {
  constructor(private readonly secretKey: string) {}
  generateToken(user: User): string {
    const payload = user.generateToken();
    const token = jwt.sign(payload, this.secretKey, { expiresIn: 60 * 60 * 24 });
    return token;
  }
  validateToken(token: string): any {
    const payload = jwt.verify(token, this.secretKey);
    return payload;
  }
}
