import { Context } from '../deps.ts';
import { orderService } from '../services/order.service.ts';

export const getOrders = async ({ request, response }: Context) => {
  const page = request.url.searchParams.get('page');
  const limit = request.url.searchParams.get('limit');
  const currentPage = parseInt(page, 10);
  const resultsPerPage = parseInt(limit, 10);

  const orders = await orderService.getAll(resultsPerPage, currentPage);

  response.body = orders;
};

export const createOrder = async ({ response, request, state }: Context) => {
  const { productsOrdered } = await request.body().value;
  const user = state.userId;
  const orderId = await orderService.create({ productsOrdered, user });

  response.body = {
    message: 'order create successfully',
    id: orderId,
  };
  response.status = 201;
};

export const getOrder = async ({ response, params }: Context) => {
  const { uuid } = params;
  const order = await orderService.getOrder(uuid);

  response.body = order;
};
