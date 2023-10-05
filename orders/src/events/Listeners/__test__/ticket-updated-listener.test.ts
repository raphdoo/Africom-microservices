import mongoose from 'mongoose';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketUpdatedEvent } from '@shared-serve/shared';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/tickets';
import { TicketUpdatedListener } from '../ticket-updated-listener';

const setup = async () => {
  // creates an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'the main',
    price: 20,
  });
  await ticket.save();

  // create a fake data event
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'main',
    price: 10,
    userId: 'hafsghs',
  };

  // create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, ticket, msg };
};

it('finds, updates and saves a ticket', async () => {
  const { listener, data, ticket, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure a ticket was created
  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(ticket.title);
  expect(updatedTicket!.price).toEqual(ticket.price);
  expect(updatedTicket!.version).toEqual(ticket.version);
});

it('acks the message', async () => {
  const { listener, data, ticket, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call back if the event has a skipped version nu', async () => {
  const { listener, data, ticket, msg } = await setup();

  data.version = 10;

  try {
    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);
  } catch (err) {
    return;
  }

  expect(msg.ack).not.toHaveBeenCalled();
});
