import { DomainEvent } from "@shared/core";
import { DomainEventFailOverPublisher } from "../../../src/Events/DomainEventFailOverPublisher";
import { MongoConnection } from "../../../src/Persistence/Mongo/MongoConnection";


export class DomainEventFailoverPublisherDouble extends DomainEventFailOverPublisher {
  private publishMock: jest.Mock;
  constructor(client: MongoConnection) {
    super(client);
    this.publishMock = jest.fn();
  }

  async publish(event: DomainEvent): Promise<void> {
    this.publishMock(event);
  }

  assertEventHasBeenPublished(event: DomainEvent) {
    expect(this.publishMock).toHaveBeenCalledWith(event);
  }
}
