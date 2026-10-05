import { afterAll, beforeAll } from '@jest/globals';
import connectDb, { disconnectDb } from '@/shared/config/db.config.js';

export const setupTestDb = () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });
};

export const clearCollection = async (
  model: { deleteMany: () => Promise<unknown> },
) => {
  await model.deleteMany();
};