import { ProductEntity } from '../../entities/Product.ts';
import { ProductRepository } from '../interfaces/ProductRepository.ts';
import { MongoBaseRepository } from './MongoBaseRepository.ts';
import { products } from './models/Product.ts';

export class MongoProductRepository extends MongoBaseRepository<
  ProductEntity
> implements ProductRepository {
  constructor() {
    super(products);
  }

  async getByCode(code: number): Promise<ProductEntity | null> {
    const data = await this.getCollection().findOne({ code });
    if (!data) return null;

    return data;
  }
}
