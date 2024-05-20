import { Primitives, StringValueObject } from '@ducen-services/shared';

export class AppointmentDiagnosticTreatmentMedication {
  constructor(
    public name: StringValueObject,
    public dose: StringValueObject,
    public frequency: StringValueObject,
    public compounds: StringValueObject[],
  ) {}

  public toPrimitives(): Primitives<AppointmentDiagnosticTreatmentMedication> {
    return {
      name: this.name.toString(),
      dose: this.dose.toString(),
      frequency: this.frequency.toString(),
      compounds: this.compounds.map((compound) => compound.toString()),
    };
  }

  public static fromPrimitives(
    primitive: Primitives<AppointmentDiagnosticTreatmentMedication>,
  ): AppointmentDiagnosticTreatmentMedication {
    return new AppointmentDiagnosticTreatmentMedication(
      new StringValueObject(primitive.name),
      new StringValueObject(primitive.dose),
      new StringValueObject(primitive.frequency),
      primitive.compounds.map((compound) => new StringValueObject(compound)),
    );
  }
}
