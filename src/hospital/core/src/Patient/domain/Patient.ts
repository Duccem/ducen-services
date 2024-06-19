import { Aggregate, DateValueObject, Primitives, Uuid } from '@ducen/shared';
import { Allergy } from './Allergy';
import { ChronicDisease } from './ChronicDisease';
import { DemographicInformation } from './DemographicInformation';
import { EmergencyContact } from './EmergencyContact';
import { FamiliarDisease } from './FamiliarDisease';
import { BloodTypes, OrganDonors, PhysicInformation } from './PhysicInformation';

export class Patient extends Aggregate {
  constructor(
    id: Uuid,
    public userId: Uuid,
    public allergies: Allergy[],
    public chronicDiseases: ChronicDisease[],
    public familiarDiseases: FamiliarDisease[],
    public demographicInformation: DemographicInformation,
    public physicInformation: PhysicInformation,
    public emergencyContact: EmergencyContact[],
    createdAt: DateValueObject,
    updateAt: DateValueObject
  ) {
    super(id, createdAt, updateAt);
  }

  public toPrimitives(): Primitives<Patient> {
    return {
      id: this.id.value,
      userId: this.userId.value,
      allergies: this.allergies.map((allergy) => allergy.toPrimitives()),
      chronicDiseases: this.chronicDiseases.map((chronicDisease) => chronicDisease.toPrimitives()),
      familiarDiseases: this.familiarDiseases.map((familiarDisease) => familiarDisease.toPrimitives()),
      demographicInformation: this.demographicInformation.toPrimitives(),
      physicInformation: this.physicInformation.toPrimitives(),
      emergencyContact: this.emergencyContact.map((emergencyContact) => emergencyContact.toPrimitives()),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(primitives: Primitives<Patient>): Patient {
    return new Patient(
      new Uuid(primitives.id),
      new Uuid(primitives.userId),
      primitives.allergies.map((allergy) => Allergy.fromPrimitives(allergy)),
      primitives.chronicDiseases.map((chronicDisease) => ChronicDisease.fromPrimitives(chronicDisease)),
      primitives.familiarDiseases.map((familiarDisease) => FamiliarDisease.fromPrimitives(familiarDisease)),
      DemographicInformation.fromPrimitives(primitives.demographicInformation),
      PhysicInformation.fromPrimitives(primitives.physicInformation),
      primitives.emergencyContact.map((emergencyContact) =>
        EmergencyContact.fromPrimitives(emergencyContact)
      ),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt)
    );
  }

  static Create(id: string, userId: string): Patient {
    return new Patient(
      new Uuid(id),
      new Uuid(userId),
      [],
      [],
      [],
      DemographicInformation.fromPrimitives({
        civilStatus: 'Single',
        educativeLevel: 'High School',
        occupation: 'Developer',
      }),
      PhysicInformation.fromPrimitives({
        weight: 0,
        height: 0,
        imc: 0,
        bloodPressure: 0,
        heartRate: 0,
        bloodType: BloodTypes.APositive,
        organDonor: OrganDonors.No,
      }),
      [],
      new DateValueObject(new Date()),
      new DateValueObject(new Date())
    );
  }
}
