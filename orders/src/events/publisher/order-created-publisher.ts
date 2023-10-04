import { Publisher, Subjects, OrderCreatedEvent } from '@shared-serve/shared';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
