import { Publisher, Subjects, TicketCreatedEvent } from '@shared-serve/shared';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
