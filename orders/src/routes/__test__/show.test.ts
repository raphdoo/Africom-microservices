import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  });

  await ticket.save();

  return ticket;
};

it('fetches the particular order', async () => {
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
    .get(`/api/orders/${order.id}`)
    .set('Cookie', userOne)
    .send({})
    .expect(200);

  expect(response.body.id).toEqual(order.id);
});

it('retrurns a 401 if user is different', async () => {
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
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signup())
    .send({})
    .expect(401);
});
