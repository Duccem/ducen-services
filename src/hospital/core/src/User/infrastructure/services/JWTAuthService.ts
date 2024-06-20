import { AuthService } from '../../domain/AuthService';
import { User } from '../../domain/User';

export class JWTAuthService implements AuthService {
  constructor() {}
  generateToken(user: User): string {
    throw new Error('Method not implemented.');
  }
  validateToken(token: string): boolean {
    throw new Error('Method not implemented.');
  }
}
