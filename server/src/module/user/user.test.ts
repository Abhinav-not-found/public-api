import createApp from '@/app.js';
import { afterEach, describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { clearCollection, setupTestDb } from '@/shared/utils/test/db.test.utils.js';
import User from './user.model.js';
// make utils for this testing (describe, test and expect)
// chatgpt: should i test other functions like sanitizeUser as well ?
// chatgpt: can i automate test cases writing like openapi too?

const app = createApp();
setupTestDb();
afterEach(async () => {
  await clearCollection(User);
});

describe('Testing api', () => {
  test('Should create new user', async () => {
    const response = await request(app).post('/api/user/').send({
      name: 'abc',
      email: 'abc@gmail.com',
      password: '123123',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'New user created');
    expect(response.body).toHaveProperty('data.name', 'abc');
    expect(response.body).toHaveProperty('data.email', 'abc@gmail.com');
  });
});
