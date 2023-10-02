import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const createTickets = () => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'the man is here',
      price: 10,
    })
    .expect(201);
};

it('successfully fetches a list of Tickets', async () => {
  await createTickets();
  await createTickets();
  await createTickets();

  const response = await request(app).get('/api/tickets').send().expect(200);

  expect(response.body.length).toEqual(3);
});
