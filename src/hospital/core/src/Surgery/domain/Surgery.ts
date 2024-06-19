import { Aggregate, DateValueObject, Primitives, StringValueObject, Uuid } from '@ducen/shared';

export class Surgery extends Aggregate {
  constructor(
    id: Uuid,
    public patientId: Uuid,
    public date: DateValueObject,
    public type: StringValueObject,
    public details: StringValueObject,
    public surgeon: StringValueObject,
    public clinic: StringValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Surgery> {
    return {
      id: this.id.toString(),
      patientId: this.patientId.toString(),
      date: this.date.getValue(),
      type: this.type.toString(),
      details: this.details.toString(),
      surgeon: this.surgeon.toString(),
      clinic: this.clinic.toString(),
    };
  }

  static fromPrimitives(data: Primitives<Surgery>): Surgery {
    return new Surgery(
      new Uuid(data.id),
      new Uuid(data.patientId),
      new DateValueObject(data.date),
      new StringValueObject(data.type),
      new StringValueObject(data.details),
      new StringValueObject(data.surgeon),
      new StringValueObject(data.clinic),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  static Create(
    id: string,
    patientId: string,
    date: Date,
    type: string,
    details: string,
    surgeon: string,
    clinic: string
  ): Surgery {
    return new Surgery(
      new Uuid(id),
      new Uuid(patientId),
      new DateValueObject(date),
      new StringValueObject(type),
      new StringValueObject(details),
      new StringValueObject(surgeon),
      new StringValueObject(clinic),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
}
