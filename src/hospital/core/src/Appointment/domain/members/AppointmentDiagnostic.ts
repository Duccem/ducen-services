import { StringValueObject } from '@ducen/shared';
import { AppointmentDiagnosticTreatment } from './AppointmentDiagnosticTreatment';

export class AppointmentDiagnostic {
  constructor(
    public description: StringValueObject,
    public code: StringValueObject,
    public treatment: AppointmentDiagnosticTreatment
  ) {}

  public toPrimitives() {
    return {
      description: this.description.toString(),
      code: this.code.toString(),
      treatment: this.treatment.toPrimitives(),
    };
  }

  public static fromPrimitives(primitive: any): AppointmentDiagnostic {
    return new AppointmentDiagnostic(
      new StringValueObject(primitive.description),
      new StringValueObject(primitive.code),
      AppointmentDiagnosticTreatment.fromPrimitives(primitive.treatment)
    );
  }

  static waitingForDiagnostic(): AppointmentDiagnostic {
    return new AppointmentDiagnostic(
      new StringValueObject(''),
      new StringValueObject(''),
      AppointmentDiagnosticTreatment.waitingForTreatment()
    );
  }
}
