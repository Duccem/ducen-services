import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Entity } from '@ducen/core';
import { Observable, map } from 'rxjs';

export class GQLResponseModeler implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        if (data instanceof Entity) return data.toPrimitives();
        return data;
      }),
    );
  }
}
