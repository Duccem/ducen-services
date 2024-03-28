import { UuidMother } from '@shared/core';
import { JWTAuthService } from '../../../../src/modules/user/adapters/service/JWTAuthService';
import { UserMother } from './mothers/UserMother';

describe('JWTAuthService', () => {
  let service: JWTAuthService;

  beforeEach(() => {
    service = new JWTAuthService(UuidMother.random());
  });

  it('should generate a token', () => {
    const token = service.generateToken(UserMother.create());
    expect(token).not.toBeNull();
  });

  it('should decode a token', () => {
    const token = service.generateToken(UserMother.create());
    const decoded = service.validateToken(token);
    expect(decoded).not.toBeNull();
  });

  it('should throw error', () => {
    expect(() => service.validateToken(UuidMother.random())).toThrowError();
  });
});
