import {
  createOrder,
  getOrder,
  getOrders,
} from '../controllers/order.controller.ts';
import { Router } from '../deps.ts';
import {
  isAuthMiddleware,
  isUserMiddleware,
} from '../middlewares/auth.middleware.ts';

const router = new Router();

router.get('/', isAuthMiddleware, getOrders);
router.get('/:uuid', isAuthMiddleware, getOrder);
router.post('/', isAuthMiddleware, isUserMiddleware, createOrder);

export { router };
