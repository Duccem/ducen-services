import { sign, verify } from 'jsonwebtoken';
import { AuthService } from '../../domain/AuthService';
import { User } from '../../domain/User';

export class JWTAuthService implements AuthService {
  constructor(private readonly secretKey: string) {}
  generateToken(user: User): string {
    const payload = user.generateToken();
    const token = sign(payload, this.secretKey, { expiresIn: 60 * 60 * 24 });
    return token;
  }
  validateToken(token: string): any {
    const payload = verify(token, this.secretKey);
    return payload;
  }
}
