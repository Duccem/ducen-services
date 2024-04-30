import { Enum, NumberValueObject, Primitives } from '@ducen-services/shared';

export class PhysicInformation {
  constructor(
    public weight: NumberValueObject,
    public height: NumberValueObject,
    public imc: NumberValueObject,
    public bloodPressure: NumberValueObject,
    public heartRate: NumberValueObject,
    public bloodType: BloodType,
    public organDonor: OrganDonor,
  ) {}
  toPrimitives() {
    return {
      weight: this.weight.value,
      height: this.height.value,
      imc: this.imc.value,
      bloodPressure: this.bloodPressure.value,
      heartRate: this.heartRate.value,
      bloodType: this.bloodType.value,
      organDonor: this.organDonor.value,
    };
  }

  static fromPrimitives(primitives: Primitives<PhysicInformation>): PhysicInformation {
    return new PhysicInformation(
      new NumberValueObject(primitives.weight),
      new NumberValueObject(primitives.height),
      new NumberValueObject(primitives.imc),
      new NumberValueObject(primitives.bloodPressure),
      new NumberValueObject(primitives.heartRate),
      new BloodType(primitives.bloodType),
      new OrganDonor(primitives.organDonor),
    );
  }
}

export enum BloodTypes {
  APositive = 'A+',
  ANegative = 'A-',
  BPositive = 'B+',
  BNegative = 'B-',
  ABPositive = 'AB+',
  ABNegative = 'AB-',
  OPositive = 'O+',
  ONegative = 'O-',
}

export class BloodType extends Enum<BloodTypes> {
  constructor(value: BloodTypes) {
    super(value, Object.values(BloodTypes));
  }
}

export enum OrganDonors {
  Yes = 'Yes',
  No = 'No',
}

export class OrganDonor extends Enum<OrganDonors> {
  constructor(value: OrganDonors) {
    super(value, Object.values(OrganDonors));
  }
}
