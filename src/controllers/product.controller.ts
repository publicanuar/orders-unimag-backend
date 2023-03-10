import { Context } from '../deps.ts';
import { ProductCreateDto } from '../dto/product-create.dto.ts';
import { productService } from '../services/product.service.ts';

export const getProducts = async ({ request, response }: Context) => {
  const page = request.url.searchParams.get('page');
  const limit = request.url.searchParams.get('limit');
  const currentPage = parseInt(page, 10);
  const resultsPerPage = parseInt(limit, 10);

  const products = await productService.getAll(resultsPerPage, currentPage);

  response.body = products;
};

export const createProduct = async ({ response, request }: Context) => {
  const { name, price }: ProductCreateDto = await request
    .body()
    .value;

  const productId = await productService.create({
    name,
    price,
  });

  response.body = {
    message: 'product create successfully',
    id: productId,
  };
  response.status = 201;
};

export const getProduct = async ({ response, params }: Context) => {
  const { code } = params;
  const product = await productService.getByCode(parseInt(code));

  response.body = product;
};
