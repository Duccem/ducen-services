import { DomainEvent } from '../../../../src/domain/DomainEvent';
import { DomainEventFailOverPublisher } from '../../../../src/infrastructure/Events/DomainEventFailOverPublisher';
import { MongoConnection } from '../../../../src/infrastructure/Persistence/Mongo/MongoConnection';

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
