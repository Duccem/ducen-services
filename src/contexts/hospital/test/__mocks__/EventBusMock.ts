import { DomainEvent, DomainEventSubscriber, EventBus } from '@ducen-services/shared';
export class EventBusMock implements EventBus {
  configure(subscribers: DomainEventSubscriber[]): void {
    throw new Error('Method not implemented.');
  }
  private publishSpy = jest.fn();

  async publish(events: DomainEvent[]) {
    this.publishSpy(events);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber>): void {}

  assertLastPublishedEventIs(expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls;

    expect(publishSpyCalls.length).toBeGreaterThan(0);

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
    const lastPublishedEvent = lastPublishSpyCall[0][0];

    const expected = expectedEvent.toPrimitive();
    const published = lastPublishedEvent.toPrimitive();

    expect(published).toEqual(expected);
  }

  private getDataFromDomainEvent(event: DomainEvent) {
    const { eventId, occurredOn, ...attributes } = event;

    return attributes;
  }
}
