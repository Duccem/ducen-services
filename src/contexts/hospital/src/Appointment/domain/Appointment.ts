import { Aggregate, DateValueObject, Primitives, StringValueObject, Uuid } from '@ducen-services/shared';
import { AppointmentDiagnostic } from './AppointmentDiagnostic';
import { AppointmentDocument } from './AppointmentDocument';
import { AppointmentRecipe } from './AppointmentRecipe';
import { AppointmentRecipeConsultation } from './AppointmentRecipeConsultation';
import { AppointmentRecipePrescription } from './AppointmentRecipePrescription';
import { AppointmentRecipeTest } from './AppointmentRecipeTest';
import { AppointmentRoom } from './AppointmentRoom';
import { AppointmentStatus } from './AppointmentStatus';
import { AppointmentTelemetry } from './AppointmentTelemetry';
import { AppointmentTest } from './AppointmentTest';
import { Rating } from './Rating';

export class Appointment extends Aggregate {
  constructor(
    id: Uuid,
    public patientId: Uuid,
    public doctorId: Uuid,
    public type: StringValueObject,
    public initDate: DateValueObject,
    public endDate: DateValueObject,
    public room: AppointmentRoom,
    public status: AppointmentStatus,
    public rating: Rating,
    public telemetry: AppointmentTelemetry,
    public diagnostic: AppointmentDiagnostic,
    public reviewedTests: AppointmentTest[],
    public documents: AppointmentDocument[],
    public recipes: Array<AppointmentRecipeConsultation | AppointmentRecipeTest | AppointmentRecipePrescription>,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Appointment> {
    return {
      id: this.id.toString(),
      patientId: this.patientId.toString(),
      doctorId: this.doctorId.toString(),
      type: this.type.value,
      initDate: this.initDate.value,
      endDate: this.endDate.value,
      status: this.status.value,
      room: this.room.toPrimitives(),
      diagnostic: this.diagnostic.toPrimitives(),
      reviewedTests: this.reviewedTests.map((labResult) => labResult.toPrimitives()),
      documents: this.documents.map((document) => document.toPrimitives()),
      telemetry: this.telemetry.toPrimitives(),
      rating: this.rating.toPrimitives(),
      recipes: this.recipes.map((recipe) => recipe.toPrimitives()),
    };
  }

  static fromPrimitives(data: Primitives<Appointment>): Appointment {
    return new Appointment(
      new Uuid(data.id),
      new Uuid(data.patientId),
      new Uuid(data.doctorId),
      new StringValueObject(data.type),
      new DateValueObject(data.initDate),
      new DateValueObject(data.endDate),
      AppointmentRoom.fromPrimitives(data.room),
      new AppointmentStatus(data.status),
      Rating.fromPrimitives(data.rating),
      AppointmentTelemetry.fromPrimitives(data.telemetry),
      AppointmentDiagnostic.fromPrimitives(data.diagnostic),
      data.reviewedTests.map((labResult) => AppointmentTest.fromPrimitives(labResult)),
      data.documents.map((document) => AppointmentDocument.fromPrimitives(document)),
      data.recipes.map((recipe: any) => {
        switch (recipe.type) {
          case 'TEST':
            return AppointmentRecipeTest.fromPrimitives(recipe);
          case 'CONSULTATION':
            return AppointmentRecipeConsultation.fromPrimitives(recipe);
          case 'PRESCRIPTION':
            return AppointmentRecipePrescription.fromPrimitives(recipe);
        }
      }),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
    );
  }

  static Schedule(
    id: string,
    patientId: string,
    doctorId: string,
    type: string,
    initDate: Date,
    endDate: Date,
    room: {
      token: string;
      room: string;
      url: string;
    },
  ) {
    return new Appointment(
      new Uuid(id),
      new Uuid(patientId),
      new Uuid(doctorId),
      new StringValueObject(type),
      new DateValueObject(initDate),
      new DateValueObject(endDate),
      AppointmentRoom.fromPrimitives(room),
      AppointmentStatus.scheduled(),
      Rating.waitingForReview(),
      AppointmentTelemetry.waitingForMeasurements(),
      AppointmentDiagnostic.waitingForDiagnostic(),
      AppointmentTest.waitingForTests(),
      AppointmentDocument.waitingForDocuments(),
      AppointmentRecipe.waitingForRecipe(),
      DateValueObject.today(),
      DateValueObject.today(),
    );
  }
}
