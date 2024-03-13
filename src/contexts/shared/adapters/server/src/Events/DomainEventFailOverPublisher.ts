import { DomainEvent } from '@shared/core';
import { MongoConnection } from '../Persistence/Mongo/MongoConnection';
import { DomainEventDeserializer } from './DomainEventDeserializer';
import { DomainEventSerializer } from './DomainEventSerializer';

export class DomainEventFailOverPublisher {
  private deserializer?: DomainEventDeserializer;
  static collectionName = 'event';
  constructor(private connection: MongoConnection) {}

  private get collection() {
    return this.connection.getConnection()?.collection(DomainEventFailOverPublisher.collectionName);
  }

  setDeserializer(deserializer: DomainEventDeserializer) {
    this.deserializer = deserializer;
  }

  async publish(event: DomainEvent, published: boolean) {
    const eventSerialized = DomainEventSerializer.serialize(event);
    const options = { upsert: true };
    const update = { $set: { eventId: event.eventId, event: eventSerialized, published: published } };
    await this.collection?.updateOne({ eventId: event.eventId }, update, options);
  }

  async consume(): Promise<Array<DomainEvent>> {
    const results = await this.collection?.find().limit(200).toArray();
    const events = results?.map((document) => this.deserializer?.deserialize(document.event));
    return events?.filter(Boolean) as Array<DomainEvent>;
  }
}
