import { AuthService } from "../../../src/User/domain/AuthService";
import { User } from "../../../src/User/domain/User";

export class MockAuthService implements AuthService {
  generateTokenMock: jest.Mock = jest.fn();
  generateToken(user: User): string {
    return this.generateTokenMock(user);
  }
  validateToken(token: string): boolean {
    return true;
  }
  returnOnGenerateToken(hash: string): void {
    this.generateTokenMock.mockReturnValue(hash);
  }
}
