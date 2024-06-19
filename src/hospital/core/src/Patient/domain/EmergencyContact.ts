import { Enum, Primitives, StringValueObject } from '@ducen/shared';

export class EmergencyContact {
  constructor(
    public name: ContactName,
    public relationship: ContactRelationship,
    public phone: ContactPhone
  ) {}

  toPrimitives() {
    return {
      name: this.name.toPrimitives(),
      relationship: this.relationship.value,
      phone: this.phone.value,
    };
  }
  static fromPrimitives(primitives: Primitives<EmergencyContact>): EmergencyContact {
    return new EmergencyContact(
      ContactName.fromPrimitives(primitives.name),
      new ContactRelationship(primitives.relationship),
      new ContactPhone(primitives.phone)
    );
  }
}

export class ContactName {
  constructor(public firstName: StringValueObject, public lastName: StringValueObject) {}

  toPrimitives() {
    return {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    };
  }

  static fromPrimitives(primitives: Primitives<ContactName>): ContactName {
    return new ContactName(
      new StringValueObject(primitives.firstName),
      new StringValueObject(primitives.lastName)
    );
  }
}

export enum ContactRelationships {
  Father = 'Father',
  Mother = 'Mother',
  Brother = 'Brother',
  Sister = 'Sister',
  Grandfather = 'Grandfather',
  Grandmother = 'Grandmother',
  Uncle = 'Uncle',
  Aunt = 'Aunt',
  Cousin = 'Cousin',
  Other = 'Other',
}

export class ContactRelationship extends Enum<ContactRelationships> {
  constructor(value: ContactRelationships) {
    super(value, Object.values(ContactRelationships));
  }
}

export class ContactPhone extends StringValueObject {}
