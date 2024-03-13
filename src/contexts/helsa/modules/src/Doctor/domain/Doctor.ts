import { Aggregate, DateValueObject, NumberValueObject, Primitives, StringValueObject, Uuid } from '@shared/core';
import { Association } from './Association';
import { ConsultingRoomAddress } from './ConsultingRoomAddress';
import { DoctorCreated } from './DoctorCreated';
import { Education } from './Education';
import { Experience } from './Experience';
import { Rating } from './Rating';
import { Schedule } from './Schedule';

export class Doctor extends Aggregate {
  constructor(
    id: Uuid,
    public user: Uuid,
    public specialty: StringValueObject,
    public medicalIdentificationNumber: StringValueObject,
    public licenseMedicalNumber: StringValueObject,
    public score: NumberValueObject,
    public consultingRoomAddress: ConsultingRoomAddress,
    public educations: Education[],
    public experiences: Experience[],
    public associations: Association[],
    public schedule: Schedule,
    public ratings: Rating[],
    createdAt?: DateValueObject,
    updatedAt?: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }
  public toPrimitives(): Primitives<Doctor> {
    return {
      id: this.id.value,
      user: this.user.value,
      specialty: this.specialty.value,
      medicalIdentificationNumber: this.medicalIdentificationNumber.value,
      licenseMedicalNumber: this.licenseMedicalNumber.value,
      score: this.score.value,
      consultingRoomAddress: this.consultingRoomAddress.toPrimitives(),
      educations: this.educations.map((education) => education.toPrimitives()),
      experiences: this.experiences.map((experience) => experience.toPrimitives()),
      associations: this.associations.map((association) => association.toPrimitives()),
      schedule: this.schedule.toPrimitives(),
      ratings: this.ratings.map((rating) => rating.toPrimitives()),
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
    };
  }

  static fromPrimitives(data: Primitives<Doctor>): Doctor {
    return new Doctor(
      new Uuid(data.id),
      new Uuid(data.user),
      new StringValueObject(data.specialty),
      new StringValueObject(data.medicalIdentificationNumber),
      new StringValueObject(data.licenseMedicalNumber),
      new NumberValueObject(data.score),
      ConsultingRoomAddress.fromPrimitives(data.consultingRoomAddress),
      data.educations.map((education: Primitives<Education>) => Education.fromPrimitives(education)),
      data.experiences.map((experience: Primitives<Experience>) => Experience.fromPrimitives(experience)),
      data.associations.map((association: Primitives<Association>) => Association.fromPrimitives(association)),
      Schedule.fromPrimitives(data.schedule),
      data.ratings.map((rating: Primitives<Rating>) => Rating.fromPrimitives(rating)),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
    );
  }

  static create(
    id: string,
    user: string,
    specialty: string,
    medicalIdentificationNumber: string,
    licenseMedicalNumber: string,
    score: number,
    consultingRoomAddress: Primitives<ConsultingRoomAddress>,
    educations: Primitives<Education>[],
    experiences: Primitives<Experience>[],
    associations: Primitives<Association>[],
    schedule: Primitives<Schedule>,
    ratings: Primitives<Rating>[],
    createdAt?: Date,
    updatedAt?: Date,
  ): Doctor {
    const doctor = new Doctor(
      new Uuid(id),
      new Uuid(user),
      new StringValueObject(specialty),
      new StringValueObject(medicalIdentificationNumber),
      new StringValueObject(licenseMedicalNumber),
      new NumberValueObject(score),
      ConsultingRoomAddress.fromPrimitives(consultingRoomAddress),
      educations.map((education) => Education.fromPrimitives(education)),
      experiences.map((experience) => Experience.fromPrimitives(experience)),
      associations.map((association) => Association.fromPrimitives(association)),
      Schedule.fromPrimitives(schedule),
      ratings.map((rating) => Rating.fromPrimitives(rating)),
      new DateValueObject(createdAt || new Date()),
      new DateValueObject(updatedAt || new Date()),
    );
    doctor.record(
      new DoctorCreated({
        aggregateId: doctor.id.value,
        params: doctor.toPrimitives(),
      }),
    );
    return doctor;
  }

  createRating(id: string, rate: number, comment: string): void {
    this.ratings.push(Rating.create(id, this.id.value, rate, comment, new Date(), undefined));
  }
}
