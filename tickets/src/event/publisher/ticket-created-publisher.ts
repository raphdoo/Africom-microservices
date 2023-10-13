import { Publisher, Subjects, TicketCreatedEvent } from '@shared-serve/shared';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
