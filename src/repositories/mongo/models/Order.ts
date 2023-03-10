import { MongoEntity } from '../types/types.d.ts';
import { db } from '../db/index.ts';
import { OrderEntity } from '../../../entities/Order.ts';

export const orders = db.collection<MongoEntity<OrderEntity>>('orders');
