import { ProjectField } from './ProjectField';

export class Projection {
  constructor(public readonly fields: ProjectField[]) {}

  public add(field: ProjectField): Projection {
    return new Projection([...this.fields, field]);
  }

  public remove(field: ProjectField): Projection {
    return new Projection(this.fields.filter((f) => f !== field));
  }

  public static create(fields: string[]): Projection {
    return new Projection(fields.map((field) => new ProjectField(field)));
  }

  public isEmpty(): boolean {
    return this.fields.length === 0;
  }
}
