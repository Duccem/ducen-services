import { DateValueObject, Entity, Primitives, Uuid } from '@ducen/shared';
import { TemplateName } from './TemplateName';
import { TemplateSource } from './TemplateSource';
import { TemplateType } from './TemplateType';

export class Template extends Entity {
  constructor(
    id: Uuid,
    public name: TemplateName,
    public source: TemplateSource,
    public type: TemplateType,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  public toPrimitives(): Primitives<Template> {
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      source: this.source.toString(),
      type: this.type.toString(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  public static Create(id: string, name: string, source: string, type: string): Template {
    return new Template(
      new Uuid(id),
      new TemplateName(name),
      new TemplateSource(source),
      new TemplateType(type),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
}
