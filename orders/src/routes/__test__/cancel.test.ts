import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';
import { Order } from '../../models/orders';
import { OrderStatus } from '@shared-serve/shared';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';


const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });

  await ticket.save();

  return ticket;
};

it('expects order status to be cancelled', async () => {
  const ticket = await buildTicket();

  const userOne = global.signup();

  //Create order for userOne
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticket.id })
    .expect(201);

  //Make request to get orders for userTwo
  const response = await request(app)
    .patch(`/api/orders/${order.id}`)
    .set('Cookie', userOne)
    .send({})
    .expect(204);

  const CancelledOrder = await Order.findById(order.id);

  expect(CancelledOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits an event when an order is cancelled', async () => {
  const ticket = await buildTicket();

  const userOne = global.signup();

  //Create order for userOne
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticket.id })
    .expect(201);

  //Make request to get orders for userTwo
  const response = await request(app)
    .patch(`/api/orders/${order.id}`)
    .set('Cookie', userOne)
    .send({})
    .expect(204);

  const CancelledOrder = await Order.findById(order.id);

  expect(CancelledOrder!.status).toEqual(OrderStatus.Cancelled);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
