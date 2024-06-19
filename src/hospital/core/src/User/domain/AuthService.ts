import { User } from './User';

export interface AuthService {
  generateToken(user: User): string;
  validateToken(token: string): boolean;
}
