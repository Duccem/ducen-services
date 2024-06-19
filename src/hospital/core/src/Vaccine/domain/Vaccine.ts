import {
  Aggregate,
  BooleanValueObject,
  DateValueObject,
  Primitives,
  StringValueObject,
  Uuid,
} from '@ducen/shared';

export class Vaccine extends Aggregate {
  constructor(
    id: Uuid,
    public patientId: Uuid,
    public name: StringValueObject,
    public dose: StringValueObject,
    public date: DateValueObject,
    public notes: StringValueObject[],
    public nextDose: DateValueObject,
    public effective: BooleanValueObject,
    public required: BooleanValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Vaccine> {
    return {
      id: this.id.toString(),
      patientId: this.patientId.toString(),
      name: this.name.value,
      dose: this.dose.value,
      date: this.date.value,
      notes: this.notes.map((note) => note.value),
      nextDose: this.nextDose.value,
      effective: this.effective.value,
      required: this.required.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(data: Primitives<Vaccine>): Vaccine {
    return new Vaccine(
      new Uuid(data.id),
      new Uuid(data.patientId),
      new StringValueObject(data.name),
      new StringValueObject(data.dose),
      new DateValueObject(data.date),
      data.notes.map((note: string) => new StringValueObject(note)),
      new DateValueObject(data.nextDose),
      new BooleanValueObject(data.effective),
      new BooleanValueObject(data.required),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  static Create(
    id: string,
    patientId: string,
    name: string,
    dose: string,
    date: Date,
    notes: string[],
    nextDose: Date,
    effective: boolean,
    required: boolean
  ) {
    return new Vaccine(
      new Uuid(id),
      new Uuid(patientId),
      new StringValueObject(name),
      new StringValueObject(dose),
      new DateValueObject(date),
      notes.map((note) => new StringValueObject(note)),
      new DateValueObject(nextDose),
      new BooleanValueObject(effective),
      new BooleanValueObject(required),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
}
