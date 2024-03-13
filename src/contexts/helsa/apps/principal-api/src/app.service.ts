import { UserRoles } from '@helsa/modules';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return Object.keys(UserRoles).map((key) => UserRoles[key]);
  }
}
