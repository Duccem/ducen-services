import { Aggregate, DateValueObject, Primitives, StringValueObject, Uuid } from '@ducen/shared';
import { NoteDoctor } from './NoteDoctor';

export class Note extends Aggregate {
  constructor(
    id: Uuid,
    public patientId: Uuid,
    public doctor: NoteDoctor,
    public content: StringValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  public toPrimitives(): Primitives<Note> {
    return {
      id: this.id.toString(),
      patientId: this.patientId.toString(),
      doctor: this.doctor.toPrimitives(),
      content: this.content.toString(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  static fromPrimitives(primitives: Primitives<Note>): Note {
    return new Note(
      new Uuid(primitives.id),
      new Uuid(primitives.patientId),
      NoteDoctor.fromPrimitives(primitives.doctor),
      new StringValueObject(primitives.content),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt)
    );
  }

  static Create(
    id: string,
    patientId: string,
    doctor: {
      id: string;
      fullName: string;
      photo: string;
      specialty: string;
    },
    content: string
  ): Note {
    return new Note(
      new Uuid(id),
      new Uuid(patientId),
      NoteDoctor.fromPrimitives(doctor),
      new StringValueObject(content),
      new DateValueObject(new Date()),
      new DateValueObject(new Date())
    );
  }
}
