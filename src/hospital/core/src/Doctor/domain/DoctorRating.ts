import {
  DateValueObject,
  Entity,
  NumberValueObject,
  Primitives,
  StringValueObject,
  Uuid,
} from '@ducen/shared';

export class DoctorRating extends Entity {
  constructor(
    id: Uuid,
    public doctor: Uuid,
    public rate: NumberValueObject,
    public comment: StringValueObject,
    createdAt?: DateValueObject,
    updatedAt?: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  public toPrimitives(): Primitives<DoctorRating> {
    return {
      id: this.id.value,
      doctor: this.doctor.value,
      rate: this.rate.value,
      comment: this.comment.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
    };
  }

  static fromPrimitives(data: any) {
    return new DoctorRating(
      new Uuid(data.id),
      new Uuid(data.doctor),
      new NumberValueObject(data.rate),
      new StringValueObject(data.comment),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  static create(
    id: string,
    doctor: string,
    rate: number,
    comment: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    return new DoctorRating(
      new Uuid(id),
      new Uuid(doctor),
      new NumberValueObject(rate),
      new StringValueObject(comment),
      new DateValueObject(createdAt || new Date()),
      new DateValueObject(updatedAt || new Date())
    );
  }
}
