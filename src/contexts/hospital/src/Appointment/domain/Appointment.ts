import { Aggregate, DateValueObject, Primitives, StringValueObject, Uuid } from '@ducen-services/shared';
import { AppointmentDiagnostic } from './AppointmentDiagnostic';
import { AppointmentDocument } from './AppointmentDocument';
import { AppointmentRating } from './AppointmentRating';
import { AppointmentRecipe } from './AppointmentRecipe';
import { AppointmentRecipeConsultation } from './AppointmentRecipeConsultation';
import { AppointmentRecipePrescription } from './AppointmentRecipePrescription';
import { AppointmentRecipeTest } from './AppointmentRecipeTest';
import { AppointmentRoom } from './AppointmentRoom';
import { AppointmentStatus, AppointmentStatuses } from './AppointmentStatus';
import { AppointmentTelemetry } from './AppointmentTelemetry';
import { AppointmentTest } from './AppointmentTest';
import { AppointmentCancelled } from './Events/AppointmentCancelled';
import { AppointmentFinished } from './Events/AppointmentFinished';
import { AppointmentIsLate } from './Events/AppointmentIsLate';
import { AppointmentReScheduled } from './Events/AppointmentRescheduled';
import { AppointmentScheduled } from './Events/AppointmentScheduled';
import { AppointmentStarted } from './Events/AppointmentStarted';
import { AppointmentWaitingDoctor } from './Events/AppointmentWaitingDoctor';
import { AppointmentWaitingPatient } from './Events/AppointmentWaitingPatient';
import { AppointmentMissed } from './Events/AppointmetMissed';

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
    public rating: AppointmentRating,
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
      AppointmentRating.fromPrimitives(data.rating),
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
    const appointment = new Appointment(
      new Uuid(id),
      new Uuid(patientId),
      new Uuid(doctorId),
      new StringValueObject(type),
      new DateValueObject(initDate),
      new DateValueObject(endDate),
      AppointmentRoom.fromPrimitives(room),
      AppointmentStatus.scheduled(),
      AppointmentRating.waitingForReview(),
      AppointmentTelemetry.waitingForMeasurements(),
      AppointmentDiagnostic.waitingForDiagnostic(),
      AppointmentTest.waitingForTests(),
      AppointmentDocument.waitingForDocuments(),
      AppointmentRecipe.waitingForRecipe(),
      DateValueObject.today(),
      DateValueObject.today(),
    );
    appointment.record(
      new AppointmentScheduled({ appointmentId: id, patientId, doctorId, initDate, endDate, link: room.url }, id),
    );
    return appointment;
  }

  reschedule(initDate: Date, endDate: Date) {
    this.initDate = new DateValueObject(initDate);
    this.endDate = new DateValueObject(endDate);
    this.status = new AppointmentStatus(AppointmentStatuses.RESCHEDULED);
    this.updatedAt = DateValueObject.today();
    this.record(
      new AppointmentReScheduled(
        { appointmentId: this.id.toString(), initDate, endDate, link: this.room.url.toString() },
        this.id.toString(),
      ),
    );
  }

  isLate(): boolean {
    return (
      this.initDate.value.getTime() < Date.now() &&
      [AppointmentStatuses.SCHEDULED, AppointmentStatuses.RESCHEDULED].includes(this.status.value)
    );
  }

  setIsLate() {
    this.status = new AppointmentStatus(AppointmentStatuses.LATE);
    this.record(
      new AppointmentIsLate(
        { appointmentId: this.id.toString(), initDate: this.initDate.value, link: '' },
        this.id.toString(),
      ),
    );
  }

  cancel(reason: string) {
    this.status = new AppointmentStatus(AppointmentStatuses.CANCELLED);
    this.updatedAt = DateValueObject.today();
    this.record(
      new AppointmentCancelled(
        { appointmentId: this.id.toString(), initDate: this.initDate.value, cancelReason: reason },
        this.id.toString(),
      ),
    );
  }

  userWaiting(whoIsWaiting: 'DOCTOR' | 'PATIENT') {
    const payload = {
      appointmentId: this.id.toString(),
      initDate: this.initDate.value,
      link: this.room.url.toString(),
    };
    if (whoIsWaiting === 'PATIENT') {
      this.status = new AppointmentStatus(AppointmentStatuses.WAITING_DOCTOR);
      this.record(new AppointmentWaitingDoctor(payload, this.id.toString()));
    } else {
      this.status = new AppointmentStatus(AppointmentStatuses.WAITING_PATIENT);
      this.record(new AppointmentWaitingPatient(payload, this.id.toString()));
    }
    this.updatedAt = DateValueObject.today();
  }

  miss() {
    if (
      [AppointmentStatuses.WAITING_PATIENT, AppointmentStatuses.LATE].includes(this.status.value) &&
      this.endDate.value.getTime() < Date.now()
    ) {
      this.status = new AppointmentStatus(AppointmentStatuses.MISSED);
      this.updatedAt = DateValueObject.today();
      this.record(
        new AppointmentMissed({ appointmentId: this.id.toString(), endDate: this.endDate.value }, this.id.toString()),
      );
    }
  }

  start() {
    this.status = new AppointmentStatus(AppointmentStatuses.STARTED);
    this.updatedAt = DateValueObject.today();
    this.record(new AppointmentStarted({ appointmentId: this.id.toString() }, this.id.toString()));
  }

  finish() {
    this.status = new AppointmentStatus(AppointmentStatuses.FINISHED);
    this.updatedAt = DateValueObject.today();
    this.record(new AppointmentFinished({ appointmentId: this.id.toString() }, this.id.toString()));
  }
}
