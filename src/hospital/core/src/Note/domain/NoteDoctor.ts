import { File, StringValueObject, Uuid } from '@ducen/shared';

export class NoteDoctor {
  constructor(
    public id: Uuid,
    public fullName: StringValueObject,
    public photo: File,
    public specialty: StringValueObject
  ) {}

  public toPrimitives() {
    return {
      id: this.id.value,
      fullName: this.fullName.value,
      photo: this.photo.value,
      specialty: this.specialty.value,
    };
  }

  static fromPrimitives(data: any): NoteDoctor {
    return new NoteDoctor(
      new Uuid(data.id),
      new StringValueObject(data.fullName),
      new File(data.photo),
      new StringValueObject(data.specialty)
    );
  }
}
