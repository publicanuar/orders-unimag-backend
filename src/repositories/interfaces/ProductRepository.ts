import { ProductEntity } from '../../entities/Product.ts';
import { GeneralRepository } from './GeneralRepository.ts';

export interface ProductRepository extends GeneralRepository<ProductEntity> {
  getByCode: (code: number) => Promise<ProductEntity | null>;
}
