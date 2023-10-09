import { Subjects, Publisher, PaymentCreatedEvent } from '@shared-serve/shared';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
