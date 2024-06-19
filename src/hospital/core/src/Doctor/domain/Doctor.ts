import {
  Aggregate,
  DateValueObject,
  NumberValueObject,
  Primitives,
  StringValueObject,
  Uuid,
} from '@ducen/shared';
import { Association } from './Association';
import { ConsultingRoomAddress } from './ConsultingRoomAddress';
import { DoctorCreated } from './DoctorCreated';
import { DoctorRating } from './DoctorRating';
import { Education } from './Education';
import { Experience } from './Experience';
import { Schedule } from './Schedule';

export class Doctor extends Aggregate {
  constructor(
    id: Uuid,
    public userId: Uuid,
    public specialty: StringValueObject,
    public medicalIdentificationNumber: StringValueObject,
    public licenseMedicalNumber: StringValueObject,
    public score: NumberValueObject,
    public consultingRoomAddress: ConsultingRoomAddress,
    public educations: Education[],
    public experiences: Experience[],
    public associations: Association[],
    public schedule: Schedule,
    public ratings: DoctorRating[],
    createdAt?: DateValueObject,
    updatedAt?: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }
  public toPrimitives(): Primitives<Doctor> {
    return {
      id: this.id.value,
      userId: this.userId.value,
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
      new Uuid(data.userId),
      new StringValueObject(data.specialty),
      new StringValueObject(data.medicalIdentificationNumber),
      new StringValueObject(data.licenseMedicalNumber),
      new NumberValueObject(data.score),
      ConsultingRoomAddress.fromPrimitives(data.consultingRoomAddress),
      data.educations.map((education: Primitives<Education>) => Education.fromPrimitives(education)),
      data.experiences.map((experience: Primitives<Experience>) => Experience.fromPrimitives(experience)),
      data.associations.map((association: Primitives<Association>) =>
        Association.fromPrimitives(association)
      ),
      Schedule.fromPrimitives(data.schedule),
      data.ratings.map((rating: Primitives<DoctorRating>) => DoctorRating.fromPrimitives(rating)),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
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
    ratings: Primitives<DoctorRating>[],
    createdAt?: Date,
    updatedAt?: Date
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
      ratings.map((rating) => DoctorRating.fromPrimitives(rating)),
      new DateValueObject(createdAt || new Date()),
      new DateValueObject(updatedAt || new Date())
    );
    doctor.record(
      new DoctorCreated({
        aggregateId: doctor.id.value,
        params: doctor.toPrimitives(),
      })
    );
    return doctor;
  }

  createRating(id: string, rate: number, comment: string): void {
    this.ratings.push(DoctorRating.create(id, this.id.value, rate, comment, new Date(), undefined));
  }
}
