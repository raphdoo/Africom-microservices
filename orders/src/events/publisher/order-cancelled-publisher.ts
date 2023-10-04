import { Publisher, Subjects, OrderCancelledEvent } from '@shared-serve/shared';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
