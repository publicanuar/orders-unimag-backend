import { ProductCreateDto } from '../dto/product-create.dto.ts';
import {
  ProductCreateException,
  ProductNotFoundException,
} from '../exceptions/products/index.ts';
import { ProductRepository } from '../repositories/interfaces/ProductRepository.ts';
import { MongoProductRepository } from '../repositories/mongo/MongoProductRepository.ts';
import { RandomNumber } from '../utils/RandomNumber.ts';
import { Uuid } from '../utils/Uuid.ts';

export class ProductService {
  private readonly productRepository: ProductRepository;
  private readonly uuidUtil: Uuid;
  private readonly randomNumberUtil: RandomNumber;

  constructor(
    productRepository: ProductRepository,
    uuidUtil: Uuid,
    randomNumberUtil: RandomNumber,
  ) {
    this.uuidUtil = uuidUtil;
    this.productRepository = productRepository;
    this.randomNumberUtil = randomNumberUtil;
  }

  async create({ name, price }: ProductCreateDto): Promise<string> {
    const uuid = this.uuidUtil.generate();
    const code = this.randomNumberUtil.getRandomNumber();
    const createdAt = new Date();
    const updatedAt = createdAt;

    const productId = await this.productRepository.upsert(undefined, {
      uuid,
      code,
      name,
      price,
      createdAt,
      updatedAt,
    });

    if (!productId) throw new ProductCreateException();

    return productId;
  }

  async getAll(resultsPerPage: number, currentPage: number) {
    return await this.productRepository.getAll(resultsPerPage, currentPage);
  }

  async getByCode(code: number) {
    const product = await this.productRepository.getByCode(code);
    if (!product) throw new ProductNotFoundException();

    return product;
  }
}

const productRepository = new MongoProductRepository();
const uuidUtil = new Uuid();
const randomNumberUtil = new RandomNumber();

export const productService = new ProductService(
  productRepository,
  uuidUtil,
  randomNumberUtil,
);
