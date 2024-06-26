import { Aggregate, DateValueObject, Primitives, Uuid } from '@ducen/shared';
import { NotificationBody } from './NotificationBody';
import { NotificationData } from './NotificationData';
import { NotificationTitle } from './NotificationTitle';
import { NotificationType } from './NotificationType';

export class Notification extends Aggregate {
  constructor(
    id: Uuid,
    public userId: Uuid,
    public title: NotificationTitle,
    public body: NotificationBody,
    public types: NotificationType[],
    public data: NotificationData,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }

  public toPrimitives(): Primitives<Notification> {
    return {
      id: this.id.toString(),
      userId: this.userId.toString(),
      title: this.title.toString(),
      body: this.body.toString(),
      types: this.types.map((type) => type.toString()),
      data: this.data,
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  public static Create(
    userId: string,
    title: string,
    body: string,
    types: string[],
    data: { [key: string]: any },
  ): Notification {
    return new Notification(
      Uuid.random(),
      new Uuid(userId),
      new NotificationTitle(title),
      new NotificationBody(body),
      types.map((type) => new NotificationType(type)),
      new NotificationData(data),
      DateValueObject.today(),
      DateValueObject.today(),
    );
  }

  static fromPrimitives(data: Primitives<Notification>): Notification {
    return new Notification(
      new Uuid(data.id),
      new Uuid(data.userId),
      new NotificationTitle(data.title),
      new NotificationBody(data.body),
      data.types.map((type) => new NotificationType(type)),
      new NotificationData(data.data),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
    );
  }
}
