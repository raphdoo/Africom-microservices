import { Publisher, Subjects, TicketUpdatedEvent } from '@shared-serve/shared';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
