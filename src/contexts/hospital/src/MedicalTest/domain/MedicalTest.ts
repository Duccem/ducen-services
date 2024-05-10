import { Aggregate, DateValueObject, Primitives, Uuid } from '@ducen-services/shared';
import { Attribute } from './Attribute';
import { MedicalTestLaboratory } from './MedicalTestLaboratory';
import { MedicalTestType, MedicalTestTypes } from './MedicalTestType';

export class MedicalTest extends Aggregate {
  constructor(
    id: Uuid,
    public patientId: Uuid,
    public type: MedicalTestType,
    public laboratory: MedicalTestLaboratory,
    public date: DateValueObject,
    public attributes: Attribute[],
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }
  public toPrimitives(): Primitives<MedicalTest> {
    return {
      id: this.id.value,
      patientId: this.patientId.value,
      type: this.type.value,
      laboratory: this.laboratory.value,
      date: this.date.value,
      attributes: this.attributes.map((attribute) => attribute.toPrimitives()),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(primitives: Primitives<MedicalTest>): MedicalTest {
    return new MedicalTest(
      new Uuid(primitives.id),
      new Uuid(primitives.patientId),
      new MedicalTestType(primitives.type),
      new MedicalTestLaboratory(primitives.laboratory),
      new DateValueObject(primitives.date),
      primitives.attributes.map((attribute: Primitives<Attribute>) => Attribute.fromPrimitives(attribute)),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt),
    );
  }

  static Create(
    id: string,
    patientId: string,
    type: string,
    laboratory: string,
    date: Date,
    attributes: {
      category: string;
      name: string;
      metric: string;
      unit: string;
      referenceRange: string;
    }[],
  ): MedicalTest {
    return new MedicalTest(
      new Uuid(id),
      new Uuid(patientId),
      new MedicalTestType(type as MedicalTestTypes),
      new MedicalTestLaboratory(laboratory),
      new DateValueObject(date),
      attributes.map(Attribute.fromPrimitives),
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
    );
  }
}
