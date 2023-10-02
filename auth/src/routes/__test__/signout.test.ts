import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signout', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234567',
    })
    .expect(201);

  const response = request(app).post('/api/users/signout').send({}).expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
