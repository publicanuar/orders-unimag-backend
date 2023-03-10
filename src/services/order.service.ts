import { OrderCreateDto } from '../dto/order-create-dto.ts';
import { OrderEntity } from '../entities/Order.ts';
import { UuidNotValidException } from '../exceptions/Exception.ts';
import {
  OrderCreateException,
  OrderNotFoundException,
} from '../exceptions/orders/index.ts';
import { OrderRepository } from '../repositories/interfaces/OrderRepository.ts';
import { MongoOrderRepository } from '../repositories/mongo/MongoOrderRepository.ts';
import { RandomNumber } from '../utils/RandomNumber.ts';
import { Uuid } from '../utils/Uuid.ts';

export class OrderService {
  private readonly orderRepository: OrderRepository;
  private readonly uuidUtil: Uuid;
  private readonly randomNumberUtil: RandomNumber;

  constructor(
    orderRepository: OrderRepository,
    uuidUtil: Uuid,
    randomNumberUtil: RandomNumber,
  ) {
    this.uuidUtil = uuidUtil;
    this.orderRepository = orderRepository;
    this.randomNumberUtil = randomNumberUtil;
  }

  async create({ productsOrdered, user }: OrderCreateDto): Promise<string> {
    const uuid = this.uuidUtil.generate();
    const createAt = new Date();
    const numberOfOrder = this.randomNumberUtil.getRandomNumber();

    const orderId = await this.orderRepository.upsert(undefined, {
      uuid,
      user,
      createAt,
      productsOrdered,
      numberOfOrder,
    });

    if (!orderId) throw new OrderCreateException();

    return orderId;
  }

  async getAll(resultsPerPage: number, currentPage: number) {
    return await this.orderRepository.getAll(resultsPerPage, currentPage);
  }

  async getOrder(uuid: string): Promise<OrderEntity> {
    const isValidUuid = this.uuidUtil.validate(uuid);
    if (isValidUuid) throw new UuidNotValidException();

    const order = await this.orderRepository.getOrder(uuid);
    if (!order) throw new OrderNotFoundException();

    return order;
  }
}

const orderRepository = new MongoOrderRepository();
const uuidService = new Uuid();
const randomNumberUtil = new RandomNumber();

export const orderService = new OrderService(
  orderRepository,
  uuidService,
  randomNumberUtil,
);
