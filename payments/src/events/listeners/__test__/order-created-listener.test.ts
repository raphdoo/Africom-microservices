import { OrderCreatedEvent, OrderStatus } from '@shared-serve/shared';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListerner } from '../order-created-listener';
import mongoose from 'mongoose';
import { Order } from '../../../model/order';

const setup = async () => {
  const listener = new OrderCreatedListerner(natsWrapper.client);

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: 'sgdhdbdn',
    userId: 'dsffsg',
    status: OrderStatus.Created,
    ticket: {
      id: 'hdgdg',
      price: 20,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('replicates the order info', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
