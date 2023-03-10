import { ProductEntity } from '../../../entities/Product.ts';
import { db } from '../db/index.ts';
import { MongoEntity } from '../types/types.d.ts';

export const products = db.collection<MongoEntity<ProductEntity>>('products');
