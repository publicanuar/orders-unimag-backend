import { ProductEntity } from './Product.ts';
import { UserEntity } from './User.ts';

export class OrderEntity {
  uuid?: string;
  numberOfOrder!: number;
  productsOrdered!:
    | Array<
      ProductEntity & {
        ordered: number;
      }
    >
    | Array<{
      productCode: number;
      ordered: number;
    }>;
  user!: UserEntity | string;
  createAt!: Date;
}
