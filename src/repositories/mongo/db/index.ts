import config from './config.ts';
import { MongoClient } from '../../../deps.ts';

const client = new MongoClient();

const {
  MONGO_DB,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
} = config;

const db = await client.connect(
  `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
);

export { db };
