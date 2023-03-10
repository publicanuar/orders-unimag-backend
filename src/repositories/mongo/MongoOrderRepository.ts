import { OrderEntity } from '../../entities/Order.ts';
import { MongoBaseRepository } from './MongoBaseRepository.ts';
import { MongoEntity } from './types/types.d.ts';
import { OrderRepository } from '../interfaces/OrderRepository.ts';
import { orders } from './models/Order.ts';

export class MongoOrderRepository extends MongoBaseRepository<OrderEntity>
  implements OrderRepository {
  constructor() {
    super(orders);
  }

  async getOrder(uuid: string): Promise<MongoEntity<OrderEntity> | null> {
    const order = await this.getCollection().aggregate<OrderEntity>([
      { $match: { uuid } },
      {
        '$addFields': {
          'productsOrdered': { '$ifNull': ['$productsOrdered', []] },
        },
      },
      {
        '$lookup': {
          'from': 'products',
          'localField': 'productsOrdered.productCode',
          'foreignField': 'code',
          'as': 'products',
        },
      },
      {
        '$addFields': {
          'productsOrdered': {
            '$map': {
              'input': '$productsOrdered',
              'in': {
                '$mergeObjects': [
                  '$$this',
                  {
                    'product': {
                      '$arrayElemAt': [
                        '$products',
                        {
                          '$indexOfArray': [
                            '$products.code',
                            '$$this.productCode',
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      { '$project': { 'products': 0 } },
      {
        '$lookup': {
          'from': 'users',
          'localField': 'user',
          'foreignField': 'uuid',
          'as': 'user',
        },
      },
      { $unwind: '$user' },
      {
        $unset: [
          '_id',
          'productsOrdered.productCode',
          'user._id',
          'user.password',
          'user.verified',
          'user.createdAt',
          'user.updatedAt',
        ],
      },
      // deno-lint-ignore no-explicit-any
    ]).toArray().then((data: OrderEntity[]) => data[0]);

    if (!order) return null;

    return order;
  }
}
