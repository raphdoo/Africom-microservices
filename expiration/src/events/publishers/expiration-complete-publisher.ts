import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from '@shared-serve/shared';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
