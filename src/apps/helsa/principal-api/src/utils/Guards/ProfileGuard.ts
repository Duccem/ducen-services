import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsError } from '@ducen/core';
import { Observable } from 'rxjs';
//import { AbilityMaker, Profile } from '@ducen/hospital';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const entity = this.reflector.get<string>('entity', context.getClass());
    if (!entity) {
      return true;
    }
    throw new PermissionsError('Route forbidden');
  }
}
