import mongoose from 'mongoose';
import env from './env.config.js';
import { colorText } from '@/shared/utils/color-text.utils.js';
import logger from './logger.config.js';
import { createSpinner } from '../utils/spinner.utils.js';

async function connectDb() {
  const spinner = createSpinner('Connecting to database...');

  const uri = process.env.NODE_ENV === 'test' ? env.MONGODB_TEST : env.MONGODB;

  try {
    const conn = await mongoose.connect(uri);

    spinner.success(
      colorText(`Database connected [name: ${conn.connection.name}]`, 'black', 'green'),
    );
  } catch (error) {
    spinner.error('Database connection failed');
    logger.error(`Error in database connection: ${error}`);
    throw error;
  }
}

export default connectDb;

export async function disconnectDb() {
  const spinner = createSpinner('Connecting to database...');

  const conn = await mongoose.disconnect();

  spinner.success(colorText(`Database disconnected`, 'black', 'green'));
}
