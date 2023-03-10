import { OrderEntity } from '../../entities/Order.ts';
import { GeneralRepository } from './GeneralRepository.ts';

export interface OrderRepository extends GeneralRepository<OrderEntity> {
  getOrder: (uuid: string) => Promise<OrderEntity | null>;
}
